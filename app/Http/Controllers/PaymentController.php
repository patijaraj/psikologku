<?php

namespace App\Http\Controllers;

use App\Models\PsychologistProfile;
use App\Models\Transaction;
use App\Services\MidtransSnap;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function __construct(private MidtransSnap $midtransSnap) {}

    public function show(Request $request): Response
    {
        $psychologist = $this->selectedPsychologist($request);
        $scheduleId = $request->integer('schedule_id');
        $appointmentDate = $request->input('date');
        $timesRaw = $request->input('times'); // comma-separated e.g. "13:00:00,14:00:00"
        $times = $timesRaw ? explode(',', $timesRaw) : [];

        $transaction = $this->pendingTransactionFor($request, $psychologist, $scheduleId, $appointmentDate, $times);

        if (! $transaction->snap_token) {
            $transaction->update([
                'snap_token' => $this->midtransSnap->createToken($transaction),
            ]);
        }

        return Inertia::render('payment', [
            'snapToken' => $transaction->snap_token,
            'orderId' => $transaction->order_id,
            'amount' => (float) $transaction->gross_amount,
            'therapist' => $psychologist ? $this->serializeTherapist($psychologist) : null,
        ]);
    }

    public function callback(Request $request): JsonResponse
    {
        $serverKey = config('midtrans.server_key');

        if (! is_string($serverKey) || $serverKey === '') {
            Log::error('Midtrans server key is not configured.');

            return response()->json(['message' => 'Midtrans server key is not configured'], 500);
        }

        $orderId = (string) $request->input('order_id');

        if (! $this->hasValidSignature($request, $serverKey)) {
            Log::warning('Signature Key Midtrans tidak valid.', [
                'order_id' => $orderId,
            ]);

            return response()->json(['message' => 'Invalid signature'], 403);
        }

        $transactionStatus = (string) $request->input('transaction_status');

        Log::info('Notifikasi Midtrans diterima.', [
            'order_id' => $orderId,
            'transaction_status' => $transactionStatus,
        ]);

        $this->handleTransactionStatus($orderId, $transactionStatus, $request->input('payment_type'));

        return response()->json(['message' => 'Notifikasi diproses']);
    }

    private function hasValidSignature(Request $request, string $serverKey): bool
    {
        $orderId = (string) $request->input('order_id');
        $statusCode = (string) $request->input('status_code');
        $grossAmount = (string) $request->input('gross_amount');
        $signatureKey = (string) $request->input('signature_key');
        $hashed = hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);

        return hash_equals($hashed, $signatureKey);
    }

    private function selectedPsychologist(Request $request): ?PsychologistProfile
    {
        $psychologistId = $request->integer('psychologist_id');

        if (! $psychologistId) {
            return null;
        }

        return PsychologistProfile::query()
            ->with('user:id,name,email')
            ->findOrFail($psychologistId);
    }

    private function pendingTransactionFor(Request $request, ?PsychologistProfile $psychologist, int $scheduleId = 0, ?string $appointmentDate = null, array $times = []): Transaction
    {
        $user = $request->user();
        
        $sessionCount = count($times) ?: 1;
        $totalPrice = ($psychologist?->price ?? 250000) * $sessionCount;

        $pendingTransaction = Transaction::query()
            ->whereBelongsTo($user)
            ->where('status', 'pending')
            ->when(
                $psychologist,
                fn ($query) => $query->where('psychologist_id', $psychologist->id),
                fn ($query) => $query->whereNull('psychologist_id'),
            )
            ->latest()
            ->first();

        if ($pendingTransaction && $pendingTransaction->created_at->diffInHours(now()) >= 23) {
            $pendingTransaction->update(['status' => 'expired']);
            \App\Models\Appointment::query()->where('transaction_id', $pendingTransaction->id)->delete();
            $pendingTransaction = null;
        }

        if (! $pendingTransaction) {
            $pendingTransaction = Transaction::query()->create([
                'user_id' => $user->id,
                'psychologist_id' => $psychologist?->id,
                'order_id' => 'PSI-'.now()->format('YmdHis').'-'.$user->id.'-'.Str::upper(Str::random(6)),
                'gross_amount' => $totalPrice,
                'status' => 'pending',
            ]);
        } else {
            // Update gross amount if it changed. A new amount requires a new order_id for Midtrans.
            if ($pendingTransaction->gross_amount != $totalPrice) {
                $pendingTransaction->update(['status' => 'cancelled']);
                \App\Models\Appointment::query()->where('transaction_id', $pendingTransaction->id)->delete();
                
                $pendingTransaction = Transaction::query()->create([
                    'user_id' => $user->id,
                    'psychologist_id' => $psychologist?->id,
                    'order_id' => 'PSI-'.now()->format('YmdHis').'-'.$user->id.'-'.Str::upper(Str::random(6)),
                    'gross_amount' => $totalPrice,
                    'status' => 'pending',
                ]);
            }
        }

        if ($psychologist && $scheduleId && $appointmentDate && !empty($times)) {
            // Delete old pending appointments for this transaction
            \App\Models\Appointment::query()
                ->where('transaction_id', $pendingTransaction->id)
                ->delete();

            // Create new appointments for each selected time
            foreach ($times as $time) {
                $startDateTime = \Carbon\Carbon::parse($time);
                $endDateTime = $startDateTime->copy()->addHour();

                \App\Models\Appointment::query()->create([
                    'user_id' => $user->id,
                    'transaction_id' => $pendingTransaction->id,
                    'psychologist_id' => $psychologist->id,
                    'schedule_id' => $scheduleId,
                    'appointment_date' => $appointmentDate,
                    'start_time' => $startDateTime->format('H:i:s'),
                    'end_time' => $endDateTime->format('H:i:s'),
                    'status' => 'upcoming',
                ]);
            }
        }

        return $pendingTransaction;
    }

    private function serializeTherapist(PsychologistProfile $profile): array
    {
        return [
            'id' => $profile->id,
            'name' => $profile->user?->name ?? 'Psikolog',
            'email' => $profile->user?->email,
            'str_number' => $profile->str_number,
            'specialization' => $profile->specialization,
            'price' => (float) $profile->price,
            'is_online' => (bool) $profile->is_online,
            'photo_url' => $profile->photo_url,
        ];
    }

    private function handleTransactionStatus(string $orderId, string $transactionStatus, mixed $paymentType): void
    {
        $transaction = Transaction::query()
            ->where('order_id', $orderId)
            ->first();

        if (! $transaction) {
            Log::warning('Transaksi Midtrans tidak ditemukan.', [
                'order_id' => $orderId,
            ]);

            return;
        }

        $status = $transaction->status;

        if (in_array($transactionStatus, ['capture', 'settlement'], true)) {
            $status = 'paid';
        } elseif (in_array($transactionStatus, ['cancel', 'deny', 'expire'], true)) {
            $status = 'failed';
        } elseif ($transactionStatus === 'pending') {
            $status = 'pending';
        }

        $transaction->update([
            'status' => $status,
            'payment_type' => is_string($paymentType) ? $paymentType : $transaction->payment_type,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

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
        $transaction = $this->pendingTransactionFor($request);

        if (! $transaction->snap_token) {
            $transaction->update([
                'snap_token' => $this->midtransSnap->createToken($transaction),
            ]);
        }

        return Inertia::render('payment', [
            'snapToken' => $transaction->snap_token,
            'orderId' => $transaction->order_id,
            'amount' => (float) $transaction->gross_amount,
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

    private function pendingTransactionFor(Request $request): Transaction
    {
        $user = $request->user();

        $pendingTransaction = Transaction::query()
            ->whereBelongsTo($user)
            ->where('status', 'pending')
            ->latest()
            ->first();

        if ($pendingTransaction) {
            return $pendingTransaction;
        }

        return Transaction::query()->create([
            'user_id' => $user->id,
            'order_id' => 'PSI-'.now()->format('YmdHis').'-'.$user->id.'-'.Str::upper(Str::random(6)),
            'gross_amount' => 250000,
            'status' => 'pending',
        ]);
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

<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SessionController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if ($user->isPsychologist()) {
            $profile = $user->psychologistProfile;

            if (! $profile) {
                return redirect()->route('psychologist.profile.edit');
            }

            $appointments = $profile->appointments()
                ->with(['transaction', 'user:id,name,email'])
                ->whereNotIn('status', ['cancelled', 'failed'])
                ->whereHas('transaction', fn ($query) => $query->where('status', 'paid'))
                ->latest('appointment_date')
                ->latest('start_time')
                ->get()
                ->map(fn (Appointment $appointment): ?array => $appointment->user
                    ? $this->serializeChatContact($appointment, $appointment->user, true)
                    : null)
                ->filter()
                ->values();

            return Inertia::render('sessions', [
                'chatContacts' => $appointments,
                'isPsychologist' => true,
            ]);
        }

        $appointments = $user->appointments()
            ->with(['transaction', 'psychologist.user:id,name,email'])
            ->whereNotIn('status', ['cancelled', 'failed'])
            ->whereHas('transaction', fn ($query) => $query->where('status', 'paid'))
            ->latest('appointment_date')
            ->latest('start_time')
            ->get()
            ->map(fn (Appointment $appointment): ?array => $appointment->psychologist?->user
                ? $this->serializeChatContact($appointment, $appointment->psychologist->user, false)
                : null)
            ->filter()
            ->values();

        return Inertia::render('sessions', [
            'chatContacts' => $appointments,
            'isPsychologist' => false,
        ]);
    }

    /**
     * @return array{
     *     id:int,
     *     appointment_id:int,
     *     user_id:int,
     *     name:string,
     *     email:?string,
     *     status:string,
     *     appointment_status:string,
     *     payment_status:string,
     *     date:?string,
     *     time:string,
     *     preview:string,
     *     online:bool,
     *     can_chat:bool,
     *     can_complete:bool
     * }
     */
    private function serializeChatContact(Appointment $appointment, User $counterpart, bool $isPsychologist): array
    {
        $time = $appointment->start_time && $appointment->end_time
            ? $appointment->start_time->format('H:i').' - '.$appointment->end_time->format('H:i').' WIB'
            : '--:-- WIB';
        $isCompleted = $appointment->status === 'completed';
        $displayStatus = $this->appointmentStatus($appointment);

        return [
            'id' => $appointment->id,
            'appointment_id' => $appointment->id,
            'user_id' => $counterpart->id,
            'name' => $counterpart->name ?? 'User',
            'email' => $counterpart->email,
            'status' => $displayStatus,
            'appointment_status' => $appointment->status,
            'payment_status' => $appointment->transaction?->status ?? 'unpaid',
            'date' => $appointment->appointment_date?->format('Y-m-d'),
            'time' => $time,
            'preview' => $isCompleted
                ? 'Sesi selesai, riwayat chat tetap tersedia.'
                : 'Klik untuk memulai obrolan.',
            'online' => true,
            'can_chat' => ! $isCompleted,
            'can_complete' => $isPsychologist && in_array($displayStatus, ['due', 'overdue'], true) && ! $isCompleted,
        ];
    }

    private function appointmentStatus(Appointment $appointment): string
    {
        if ($appointment->status === 'completed') {
            return 'completed';
        }

        if ($appointment->status !== 'upcoming') {
            return $appointment->status;
        }

        if (! $appointment->appointment_date || ! $appointment->start_time || ! $appointment->end_time) {
            return $appointment->status;
        }

        $appointmentStart = CarbonImmutable::parse(
            $appointment->appointment_date->format('Y-m-d').' '.$appointment->start_time->format('H:i:s'),
            'Asia/Jakarta',
        );
        $appointmentEnd = CarbonImmutable::parse(
            $appointment->appointment_date->format('Y-m-d').' '.$appointment->end_time->format('H:i:s'),
            'Asia/Jakarta',
        );
        $now = now('Asia/Jakarta');

        if ($appointmentEnd->isPast()) {
            return 'overdue';
        }

        if ($appointmentStart->lte($now) && $appointmentEnd->gte($now)) {
            return 'due';
        }

        return 'upcoming';
    }
}

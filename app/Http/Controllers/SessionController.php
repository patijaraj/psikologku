<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
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
     *     can_complete:bool
     * }
     */
    private function serializeChatContact(Appointment $appointment, User $counterpart, bool $isPsychologist): array
    {
        $time = $appointment->start_time && $appointment->end_time
            ? $appointment->start_time->format('H:i').' - '.$appointment->end_time->format('H:i').' WIB'
            : '--:-- WIB';

        return [
            'id' => $appointment->id,
            'appointment_id' => $appointment->id,
            'user_id' => $counterpart->id,
            'name' => $counterpart->name ?? 'User',
            'email' => $counterpart->email,
            'status' => $appointment->status,
            'appointment_status' => $appointment->status,
            'payment_status' => $appointment->transaction?->status ?? 'unpaid',
            'date' => $appointment->appointment_date?->format('Y-m-d'),
            'time' => $time,
            'preview' => $appointment->status === 'completed'
                ? 'Sesi selesai, chat tetap tersedia.'
                : 'Klik untuk memulai obrolan.',
            'online' => true,
            'can_complete' => $isPsychologist && $appointment->status !== 'completed',
        ];
    }
}

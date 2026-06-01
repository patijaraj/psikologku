<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\User;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
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
                ->with(['transaction', 'user:id,name,email,photo_url'])
                ->whereNotIn('status', ['cancelled', 'failed'])
                ->whereHas('transaction', fn ($query) => $query->where('status', 'paid'))
                ->orderBy('appointment_date')
                ->orderBy('start_time')
                ->get();

            $grouped = $appointments->groupBy('user_id');
            $chatContacts = $grouped->map(function ($userAppointments) {
                $activeAppt = $this->findClosestAppointment($userAppointments);

                return $activeAppt && $activeAppt->user
                    ? $this->serializeChatContact($activeAppt, $activeAppt->user, true)
                    : null;
            })->filter()->values();

            return Inertia::render('sessions', [
                'chatContacts' => $chatContacts,
                'isPsychologist' => true,
            ]);
        }

        $appointments = $user->appointments()
            ->with(['transaction', 'psychologist.user:id,name,email,photo_url'])
            ->whereNotIn('status', ['cancelled', 'failed'])
            ->whereHas('transaction', fn ($query) => $query->where('status', 'paid'))
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->get();

        $grouped = $appointments->groupBy('psychologist_id');
        $chatContacts = $grouped->map(function ($psyAppointments) {
            $activeAppt = $this->findClosestAppointment($psyAppointments);

            return $activeAppt && $activeAppt->psychologist?->user
                ? $this->serializeChatContact($activeAppt, $activeAppt->psychologist->user, false)
                : null;
        })->filter()->values();

        return Inertia::render('sessions', [
            'chatContacts' => $chatContacts,
            'isPsychologist' => false,
        ]);
    }

    private function findClosestAppointment(Collection $appointments)
    {
        $ongoing = $appointments->firstWhere('status', 'ongoing');
        if ($ongoing) {
            return $ongoing;
        }

        $due = $appointments->first(function ($appt) {
            $status = $this->appointmentStatus($appt);

            return in_array($status, ['due', 'overdue']) && $appt->status !== 'completed';
        });
        if ($due) {
            return $due;
        }

        $upcoming = $appointments->firstWhere('status', 'upcoming');
        if ($upcoming) {
            return $upcoming;
        }

        $completed = $appointments->where('status', 'completed')->sortByDesc(function ($appt) {
            return $appt->appointment_date.' '.$appt->start_time;
        })->first();
        if ($completed) {
            return $completed;
        }

        return $appointments->first();
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
     *     photo_url:?string,
     *     preview:string,
     *     online:bool,
     *     can_chat:bool,
     *     can_complete:bool,
     *     can_start_session:bool
     * }
     */
    private function serializeChatContact(Appointment $appointment, User $counterpart, bool $isPsychologist): array
    {
        $time = $appointment->start_time && $appointment->end_time
            ? $appointment->start_time->format('H:i').' - '.$appointment->end_time->format('H:i').' WIB'
            : '--:-- WIB';

        $isCompleted = $appointment->status === 'completed';
        $isOngoing = $appointment->status === 'ongoing';
        $displayStatus = $this->appointmentStatus($appointment);

        $dateStr = $appointment->appointment_date ? $appointment->appointment_date->translatedFormat('d M Y') : '';

        if ($isCompleted) {
            $preview = "Sesi pada $dateStr $time sudah selesai.";
        } else {
            $preview = "$dateStr $time";
        }

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
            'photo_url' => $isPsychologist
                ? $counterpart->photo_url  // patient's own photo_url from users table
                : $appointment->psychologist?->photo_url, // psychologist's photo from psychologist_profiles
            'preview' => $preview,
            'online' => true,
            'can_chat' => $isOngoing,
            'can_complete' => $isPsychologist && in_array($displayStatus, ['due', 'overdue', 'ongoing'], true) && ! $isCompleted,
            'can_start_session' => $isPsychologist && ! $isOngoing && ! $isCompleted,
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

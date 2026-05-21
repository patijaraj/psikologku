<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Carbon\CarbonImmutable;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PsychologistAppointmentController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $profile = $user->psychologistProfile;

        abort_unless($profile, 404);

        $appointments = $profile->appointments()
            ->with(['user:id,name,email', 'schedule', 'transaction'])
            ->whereHas('transaction', fn ($query) => $query->where('status', 'paid'))
            ->latest('appointment_date')
            ->get()
            ->map(function (Appointment $appointment): array {
                $status = $this->appointmentStatus($appointment);

                return [
                    'id' => $appointment->id,
                    'patient_name' => $appointment->user?->name ?? 'Pasien',
                    'patient_email' => $appointment->user?->email,
                    'date' => $appointment->appointment_date?->format('Y-m-d'),
                    'time' => $appointment->start_time && $appointment->end_time
                        ? $appointment->start_time->format('H:i').' - '.$appointment->end_time->format('H:i').' WIB'
                        : '--:-- WIB',
                    'status' => $status,
                    'payment_status' => $appointment->transaction?->status ?? 'unpaid',
                    'amount' => $appointment->transaction ? (float) $appointment->transaction->gross_amount : 0,
                    'can_complete' => $appointment->transaction?->status === 'paid'
                        && in_array($status, ['due', 'overdue'], true)
                        && $appointment->status !== 'completed',
                ];
            });

        return Inertia::render('psychologist-appointments', [
            'appointments' => $appointments,
        ]);
    }

    public function complete(Request $request, Appointment $appointment): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $profile = $user->psychologistProfile;

        abort_unless($profile && $appointment->psychologist_id === $profile->id, 403);

        $appointment->loadMissing('transaction');

        abort_if(in_array($appointment->status, ['cancelled', 'failed'], true), 422);
        abort_unless($appointment->transaction?->status === 'paid', 422);
        abort_unless(in_array($this->appointmentStatus($appointment), ['due', 'overdue', 'ongoing'], true), 422);

        $appointment->update([
            'status' => 'completed',
        ]);

        return back();
    }

    public function start(Request $request, Appointment $appointment): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $profile = $user->psychologistProfile;

        abort_unless($profile && $appointment->psychologist_id === $profile->id, 403);

        $appointment->loadMissing('transaction');

        abort_if(in_array($appointment->status, ['cancelled', 'failed', 'completed'], true), 422);
        abort_unless($appointment->transaction?->status === 'paid', 422);
        abort_unless(in_array($this->appointmentStatus($appointment), ['due', 'overdue', 'upcoming'], true), 422);

        $appointment->update([
            'status' => 'ongoing',
        ]);

        return back();
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

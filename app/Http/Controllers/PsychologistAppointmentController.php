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
                $isOverdue = $this->isOverdue($appointment);

                return [
                    'id' => $appointment->id,
                    'patient_name' => $appointment->user?->name ?? 'Pasien',
                    'patient_email' => $appointment->user?->email,
                    'date' => $appointment->appointment_date?->format('Y-m-d'),
                    'time' => $appointment->start_time && $appointment->end_time
                        ? $appointment->start_time->format('H:i').' - '.$appointment->end_time->format('H:i').' WIB'
                        : '--:-- WIB',
                    'status' => $appointment->status === 'completed'
                        ? 'completed'
                        : ($isOverdue ? 'overdue' : $appointment->status),
                    'payment_status' => $appointment->transaction?->status ?? 'unpaid',
                    'amount' => $appointment->transaction ? (float) $appointment->transaction->gross_amount : 0,
                    'can_complete' => $appointment->transaction?->status === 'paid'
                        && $isOverdue
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
        abort_unless($this->isOverdue($appointment), 422);

        $appointment->update([
            'status' => 'completed',
        ]);

        return back();
    }

    private function isOverdue(Appointment $appointment): bool
    {
        if (! $appointment->appointment_date || ! $appointment->end_time) {
            return false;
        }

        $appointmentEnd = CarbonImmutable::parse(
            $appointment->appointment_date->format('Y-m-d').' '.$appointment->end_time->format('H:i:s'),
            'Asia/Jakarta',
        );

        return $appointmentEnd->isPast() && $appointment->status === 'upcoming';
    }
}

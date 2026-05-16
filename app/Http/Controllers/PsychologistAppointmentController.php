<?php

namespace App\Http\Controllers;

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
            ->latest('appointment_date')
            ->get()
            ->map(fn ($appointment) => [
                'id' => $appointment->id,
                'patient_name' => $appointment->user?->name ?? 'Pasien',
                'patient_email' => $appointment->user?->email,
                'date' => $appointment->appointment_date?->format('Y-m-d'),
                'time' => $appointment->start_time && $appointment->end_time 
                    ? $appointment->start_time->format('H:i') . ' - ' . $appointment->end_time->format('H:i') . ' WIB'
                    : '--:-- WIB',
                'status' => $appointment->status,
                'payment_status' => $appointment->transaction?->status ?? 'unpaid',
                'amount' => $appointment->transaction ? (float) $appointment->transaction->gross_amount : 0,
            ]);

        return Inertia::render('psychologist-appointments', [
            'appointments' => $appointments,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PsychologistRecordController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $profile = $user->psychologistProfile;

        abort_unless($profile, 404);

        $appointments = $profile->appointments()
            ->with(['user:id,name,email'])
            ->where('status', 'completed')
            ->latest('appointment_date')
            ->get()
            ->map(function (Appointment $appointment) {
                return [
                    'id' => $appointment->id,
                    'patient_name' => $appointment->user?->name ?? 'Pasien',
                    'patient_email' => $appointment->user?->email,
                    'session_date' => $appointment->appointment_date?->format('Y-m-d') ?? '-',
                    'record_summary' => $appointment->record_summary,
                    'record_recommendation' => $appointment->record_recommendation,
                    'rating' => $appointment->rating,
                    'review' => $appointment->review,
                    'status' => $appointment->record_summary ? 'Selesai' : 'Pending',
                ];
            })
            ->values();

        return Inertia::render('psychologist-records', [
            'records' => $appointments,
        ]);
    }
}

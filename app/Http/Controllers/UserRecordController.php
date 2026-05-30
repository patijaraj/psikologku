<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserRecordController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $appointments = $user->appointments()
            ->with(['psychologist.user:id,name', 'psychologist:id,user_id,specialization,photo_url'])
            ->where('status', 'completed')
            ->whereNotNull('record_summary')
            ->where('record_summary', '!=', '')
            ->latest('appointment_date')
            ->get()
            ->map(function (Appointment $appointment) {
                return [
                    'id' => $appointment->id,
                    'psychologist_name' => $appointment->psychologist->user?->name ?? 'Psikolog',
                    'psychologist_photo_url' => $appointment->psychologist->photo_url,
                    'specialization' => $appointment->psychologist->specialization ?? ['Psikologi'],
                    'session_date' => $appointment->appointment_date?->format('Y-m-d') ?? '-',
                    'record_summary' => $appointment->record_summary,
                    'rating' => $appointment->rating,
                    'review' => $appointment->review,
                ];
            })
            ->values();

        return Inertia::render('records', [
            'records' => $appointments,
        ]);
    }

    public function show(Request $request, Appointment $appointment): Response
    {
        $user = $request->user();

        abort_unless($appointment->user_id === $user->id, 403);
        abort_unless($appointment->status === 'completed', 404);
        abort_unless($appointment->record_summary !== null, 404);

        $appointment->load(['psychologist.user:id,name', 'psychologist:id,user_id,specialization,photo_url']);

        return Inertia::render('record-detail', [
            'record' => [
                'id' => $appointment->id,
                'psychologist_name' => $appointment->psychologist->user?->name ?? 'Psikolog',
                'psychologist_photo_url' => $appointment->psychologist->photo_url,
                'specialization' => $appointment->psychologist->specialization ?? ['Psikologi'],
                'session_date' => $appointment->appointment_date?->format('M d, Y') ?? '-',
                'session_duration' => '50 Minutes', // Usually standard
                'record_summary' => $appointment->record_summary,
                'patient_state' => $appointment->patient_state ?? [],
                'diagnostic_focus' => $appointment->diagnostic_focus,
                'structured_recommendations' => $appointment->structured_recommendations ?? [],
                'rating' => $appointment->rating,
                'review' => $appointment->review,
            ],
        ]);
    }

    public function updateReview(Request $request, Appointment $appointment): RedirectResponse
    {
        $user = $request->user();

        abort_unless($appointment->user_id === $user->id, 403);
        abort_unless($appointment->status === 'completed', 404);

        $validated = $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'review' => ['nullable', 'string', 'max:1000'],
        ]);

        $appointment->update([
            'rating' => $validated['rating'],
            'review' => $validated['review'],
        ]);

        return back();
    }

    public function downloadPdf(Request $request, Appointment $appointment)
    {
        $user = $request->user();

        // Allow either the patient or the psychologist to download the PDF
        abort_unless(
            $appointment->user_id === $user->id || 
            ($user->psychologistProfile && $appointment->psychologist_profile_id === $user->psychologistProfile->id), 
            403
        );
        
        abort_unless($appointment->status === 'completed', 404);
        abort_unless($appointment->record_summary !== null, 404);

        $appointment->load(['psychologist.user:id,name', 'user:id,name']);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.record', compact('appointment'));

        return $pdf->download('Rekam-Medis-' . $appointment->appointment_date?->format('Y-m-d') . '.pdf');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserRecordController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $appointments = $user->appointments()
            ->with(['psychologist.user:id,name', 'psychologist:id,user_id,specialization'])
            ->where('status', 'completed')
            ->whereNotNull('record_summary')
            ->where('record_summary', '!=', '')
            ->latest('appointment_date')
            ->get()
            ->map(function (Appointment $appointment) {
                return [
                    'id' => $appointment->id,
                    'psychologist_name' => $appointment->psychologist->user?->name ?? 'Psikolog',
                    'specialization' => $appointment->psychologist->specialization ?? 'Psikologi',
                    'session_date' => $appointment->appointment_date?->format('Y-m-d') ?? '-',
                    'record_summary' => $appointment->record_summary,
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

        $appointment->load(['psychologist.user:id,name', 'psychologist:id,user_id,specialization']);

        return Inertia::render('record-detail', [
            'record' => [
                'id' => $appointment->id,
                'psychologist_name' => $appointment->psychologist->user?->name ?? 'Psikolog',
                'specialization' => $appointment->psychologist->specialization ?? 'Psikologi',
                'session_date' => $appointment->appointment_date?->format('M d, Y') ?? '-',
                'session_duration' => '60 Minutes', // Assuming standard duration
                'record_summary' => $appointment->record_summary,
                'record_recommendation' => $appointment->record_recommendation,
            ],
        ]);
    }
}

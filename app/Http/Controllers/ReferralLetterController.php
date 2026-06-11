<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\ReferralLetter;
use Illuminate\Http\Request;

class ReferralLetterController extends Controller
{
    public function show(Appointment $appointment)
    {
        // Pastikan user punya akses ke appointment ini (sebagai psikolog atau pasien)
        if (auth()->id() !== $appointment->psychologist?->user_id && auth()->id() !== $appointment->user_id) {
            abort(403);
        }

        return response()->json($appointment->referralLetter);
    }

    public function store(Request $request, Appointment $appointment)
    {
        // Hanya psikolog yang bisa membuat
        if (auth()->id() !== $appointment->psychologist?->user_id) {
            abort(403);
        }

        $validated = $request->validate([
            'addressed_to' => 'required|string|max:255',
            'reason' => 'nullable|string',
        ]);

        $referralLetter = $appointment->referralLetter()->updateOrCreate(
            ['appointment_id' => $appointment->id],
            $validated
        );

        return back()->with('success', 'Surat rujukan berhasil disimpan.');
    }

    public function downloadPdf(Appointment $appointment)
    {
        // Pastikan user punya akses ke appointment ini
        if (auth()->id() !== $appointment->psychologist?->user_id && auth()->id() !== $appointment->user_id) {
            abort(403);
        }

        $referralLetter = $appointment->referralLetter;

        if (!$referralLetter) {
            abort(404, 'Surat rujukan tidak ditemukan.');
        }

        $appointment->load(['psychologist.user:id,name', 'user']);

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.referral', compact('appointment', 'referralLetter'));
        
        // Custom paper size or defaults to A4
        $pdf->setPaper('A4', 'portrait');

        return $pdf->download('Surat-Rujukan-' . $appointment->user->name . '-' . $appointment->appointment_date?->format('Y-m-d') . '.pdf');
    }
}

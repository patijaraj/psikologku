<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PsychologistScheduleController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $profile = $user->psychologistProfile;
        
        abort_unless($profile, 404);

        $schedules = $profile->schedules()
            ->orderByRaw("
                CASE day_of_week 
                    WHEN 'Senin' THEN 1 
                    WHEN 'Selasa' THEN 2 
                    WHEN 'Rabu' THEN 3 
                    WHEN 'Kamis' THEN 4 
                    WHEN 'Jumat' THEN 5 
                    WHEN 'Sabtu' THEN 6 
                    WHEN 'Minggu' THEN 7 
                    ELSE 8 
                END
            ")
            ->orderBy('start_time')
            ->get()
            ->map(fn ($schedule) => [
                'id' => $schedule->id,
                'day_of_week' => $schedule->day_of_week,
                'start_time' => substr($schedule->start_time, 0, 5),
                'end_time' => substr($schedule->end_time, 0, 5),
                'is_active' => (bool) $schedule->is_active,
            ]);

        return Inertia::render('psychologist-schedules', [
            'schedules' => $schedules,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $profile = $user->psychologistProfile;
        
        abort_unless($profile, 404);

        $validated = $request->validate([
            'day_of_week' => ['required', 'string', 'in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
        ]);

        $profile->schedules()->create([
            'day_of_week' => $validated['day_of_week'],
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'is_active' => true,
        ]);

        return back()->with('success', 'Jadwal berhasil ditambahkan.');
    }

    public function update(Request $request, Schedule $schedule): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);
        
        $profile = $user->psychologistProfile;
        abort_unless($profile && $schedule->psychologist_id === $profile->id, 403);

        $validated = $request->validate([
            'is_active' => ['required', 'boolean'],
        ]);

        $schedule->update([
            'is_active' => $validated['is_active'],
        ]);

        return back()->with('success', 'Status jadwal berhasil diperbarui.');
    }

    public function destroy(Request $request, Schedule $schedule): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);
        
        $profile = $user->psychologistProfile;
        abort_unless($profile && $schedule->psychologist_id === $profile->id, 403);

        $schedule->delete();

        return back()->with('success', 'Jadwal berhasil dihapus.');
    }
}

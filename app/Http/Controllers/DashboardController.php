<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\PsychologistProfile;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if ($user->isPsychologist()) {
            $localNow = now()->timezone('Asia/Jakarta');
            $localToday = $localNow->toDateString();
            $localMonthStart = $localNow->copy()->startOfMonth();
            $localMonthEnd = $localNow->copy()->endOfMonth();

            $profile = $user->psychologistProfile()
                ->with([
                    'appointments' => fn ($query) => $query
                        ->with(['user:id,name,email', 'transaction'])
                        ->whereNotIn('status', ['cancelled', 'failed'])
                        ->whereHas('transaction', fn ($query) => $query->where('status', 'paid'))
                        ->where(function ($q) use ($localToday) {
                            $q->whereDate('appointment_date', $localToday)
                                ->orWhere(function ($q2) use ($localToday) {
                                    $q2->whereDate('appointment_date', '<', $localToday)
                                        ->where('status', 'upcoming');
                                });
                        })
                        ->orderBy('appointment_date', 'asc')
                        ->orderBy('start_time', 'asc'),
                    'transactions' => fn ($query) => $query
                        ->whereBetween('created_at', [$localMonthStart, $localMonthEnd]),
                ])
                ->first();

            if (! $profile) {
                return redirect()->route('psychologist.profile.edit');
            }

            return Inertia::render('psychologist-dashboard', [
                'profile' => [
                    'id' => $profile->id,
                    'str_number' => $profile->str_number,
                    'specialization' => $profile->specialization,
                    'price' => (float) $profile->price,
                    'is_online' => (bool) $profile->is_online,
                    'photo_url' => $profile->photo_url,
                ],
                'todaySessions' => $profile->appointments->map(function ($appointment) {
                    $appointmentDateTimeStr = $appointment->appointment_date->format('Y-m-d').' '.$appointment->end_time->format('H:i:s');
                    $appointmentDateTime = Carbon::parse($appointmentDateTimeStr, 'Asia/Jakarta');
                    $isOverdue = $appointmentDateTime->isPast() && $appointment->status === 'upcoming';

                    return [
                        'id' => $appointment->id,
                        'patient_name' => $appointment->user?->name ?? 'Pasien',
                        'patient_email' => $appointment->user?->email,
                        'status' => $isOverdue ? 'overdue' : $appointment->status,
                        'amount' => $appointment->transaction ? ((float) $appointment->transaction->gross_amount) : 0,
                        'time' => $appointment->start_time->format('H:i').' - '.$appointment->end_time->format('H:i'),
                        'date' => $appointment->appointment_date->format('d M Y'),
                    ];
                })->values(),
                'summary' => [
                    'today_sessions' => $profile->appointments->count(),
                    'paid_sessions' => $profile->appointments->count(),
                    'pending_sessions' => 0,
                    'monthly_revenue' => (float) ($profile->transactions
                        ->where('status', 'paid')
                        ->sum('gross_amount') ?? 0),
                ],
            ]);
        }

        if (! $user->isPsychologist()) {
            $localToday = now()->timezone('Asia/Jakarta')->toDateString();
            $appointments = Appointment::query()
                ->with(['psychologist.user'])
                ->where('user_id', $user->id)
                ->whereNotIn('status', ['cancelled', 'failed'])
                ->whereHas('transaction', fn ($query) => $query->where('status', 'paid'))
                ->where(function ($q) use ($localToday) {
                    $q->whereDate('appointment_date', '>=', $localToday)
                        ->orWhere(function ($q2) use ($localToday) {
                            $q2->whereDate('appointment_date', '<', $localToday)
                                ->where('status', 'upcoming');
                        });
                })
                ->orderBy('appointment_date', 'asc')
                ->orderBy('start_time', 'asc')
                ->get()
                ->map(function ($appointment) {
                    $appointmentDateTimeStr = $appointment->appointment_date->format('Y-m-d').' '.$appointment->end_time->format('H:i:s');
                    $appointmentDateTime = Carbon::parse($appointmentDateTimeStr, 'Asia/Jakarta');
                    $isOverdue = $appointmentDateTime->isPast() && $appointment->status === 'upcoming';

                    return [
                        'id' => $appointment->id,
                        'psychologist_name' => $appointment->psychologist->user->name ?? 'Psikolog',
                        'specialization' => $appointment->psychologist->specialization ?? ['Umum'],
                        'appointment_date' => $appointment->appointment_date->format('Y-m-d'),
                        'start_time' => $appointment->start_time->format('H:i'),
                        'end_time' => $appointment->end_time->format('H:i'),
                        'status' => $isOverdue ? 'overdue' : $appointment->status,
                        'meeting_link' => $appointment->meeting_link,
                    ];
                });

            $topPsychologists = PsychologistProfile::query()
                ->with('user:id,name')
                ->withAvg('appointments as average_rating', 'rating')
                ->withCount(['appointments as review_count' => function ($query) {
                    $query->whereNotNull('rating');
                }])
                ->get()
                ->sortByDesc('average_rating')
                ->take(2) // Get top 2 to fit side-by-side well in the main column
                ->map(function ($profile) {
                    return [
                        'id' => $profile->id,
                        'name' => $profile->user?->name ?? 'Psikolog',
                        'specialization' => $profile->specialization,
                        'photo_url' => $profile->photo_url,
                        'average_rating' => $profile->average_rating ? round((float) $profile->average_rating, 1) : null,
                        'review_count' => $profile->review_count,
                        'price' => (float) $profile->price,
                    ];
                })
                ->values();

            return Inertia::render('dashboard', [
                'appointments' => $appointments,
                'topPsychologists' => $topPsychologists,
            ]);
        }

        return Inertia::render('dashboard');
    }

    public function editPsychologistProfile(Request $request): Response
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $profile = $user->psychologistProfile;

        return Inertia::render('psychologist-profile-setup', [
            'profile' => $profile ? [
                'str_number' => $profile->str_number,
                'specialization' => $profile->specialization,
                'price' => (float) $profile->price,
                'is_online' => (bool) $profile->is_online,
                'photo_url' => $profile->photo_url,
            ] : null,
        ]);
    }

    public function storePsychologistProfile(Request $request): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $validated = $request->validate([
            'str_number' => ['nullable', 'string', 'max:100'],
            'specialization' => ['required', 'array', 'min:1'],
            'specialization.*' => ['string', Rule::in([
                'Stress', 'Gangguan Kecemasan', 'Depresi', 'Keluarga dan Hubungan',
                'Trauma', 'Gangguan Mood', 'Pekerjaan dan Karir', 'Kecanduan',
                'Pengembangan Diri', 'Parenting dan Anak', 'Gangguan Kepribadian', 'Identitas Seksual',
            ])],
            'price' => ['required', 'numeric', 'min:0', 'max:9999999999'],
            'photo_url' => ['nullable', 'string'],
        ]);

        PsychologistProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'str_number' => $validated['str_number'] ?? null,
                'specialization' => $validated['specialization'],
                'price' => $validated['price'],
                'is_online' => $user->psychologistProfile?->is_online ?? false,
                'photo_url' => $validated['photo_url'] ?? null,
            ],
        );

        return redirect()->route('dashboard');
    }

    public function updateAvailability(Request $request): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $validated = $request->validate([
            'is_online' => ['required', 'boolean'],
        ]);

        $profile = $user->psychologistProfile;

        abort_unless($profile, 404);

        $profile->update([
            'is_online' => $validated['is_online'],
        ]);

        return back();
    }
}

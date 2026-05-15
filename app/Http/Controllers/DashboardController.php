<?php

namespace App\Http\Controllers;

use App\Models\PsychologistProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function show(Request $request): Response|RedirectResponse
    {
        $user = $request->user();

        if ($user->isPsychologist()) {
            $profile = $user->psychologistProfile()
                ->with([
                    'transactions' => fn ($query) => $query
                        ->with('user:id,name,email')
                        ->whereDate('created_at', today())
                        ->latest(),
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
                ],
                'todaySessions' => $profile->transactions->map(fn ($transaction): array => [
                    'id' => $transaction->id,
                    'patient_name' => $transaction->user?->name ?? 'Pasien',
                    'patient_email' => $transaction->user?->email,
                    'status' => $transaction->status,
                    'amount' => (float) $transaction->gross_amount,
                    'time' => $transaction->created_at?->timezone(config('app.timezone'))->format('H:i'),
                ])->values(),
                'summary' => [
                    'today_sessions' => $profile->transactions->count(),
                    'paid_sessions' => $profile->transactions->where('status', 'paid')->count(),
                    'pending_sessions' => $profile->transactions->where('status', 'pending')->count(),
                    'today_revenue' => (float) ($profile->transactions
                        ->where('status', 'paid')
                        ->sum('gross_amount') ?? 0),
                ],
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
            ] : null,
        ]);
    }

    public function storePsychologistProfile(Request $request): RedirectResponse
    {
        $user = $request->user();

        abort_unless($user->isPsychologist(), 403);

        $validated = $request->validate([
            'str_number' => ['nullable', 'string', 'max:100'],
            'specialization' => ['required', 'string', 'max:120'],
            'price' => ['required', 'numeric', 'min:0', 'max:9999999999'],
        ]);

        PsychologistProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'str_number' => $validated['str_number'] ?? null,
                'specialization' => $validated['specialization'],
                'price' => $validated['price'],
                'is_online' => $user->psychologistProfile?->is_online ?? false,
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

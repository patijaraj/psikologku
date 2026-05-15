<?php

namespace App\Http\Controllers;

use App\Models\PsychologistProfile;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class TherapistController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('therapists', [
            'therapists' => $this->therapists(),
            'selectedTherapist' => null,
        ]);
    }

    public function show(PsychologistProfile $psychologistProfile): Response
    {
        $psychologistProfile->load('user:id,name,email');

        return Inertia::render('therapists', [
            'therapists' => $this->therapists(),
            'selectedTherapist' => $this->serializeTherapist($psychologistProfile),
        ]);
    }

    private function therapists(): Collection
    {
        return PsychologistProfile::query()
            ->with('user:id,name,email')
            ->latest()
            ->get()
            ->map(fn (PsychologistProfile $profile): array => $this->serializeTherapist($profile));
    }

    private function serializeTherapist(PsychologistProfile $profile): array
    {
        return [
            'id' => $profile->id,
            'name' => $profile->user?->name ?? 'Psikolog',
            'email' => $profile->user?->email,
            'str_number' => $profile->str_number,
            'specialization' => $profile->specialization,
            'price' => (float) $profile->price,
            'is_online' => (bool) $profile->is_online,
        ];
    }
}

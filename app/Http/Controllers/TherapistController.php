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
        $psychologistProfile->load(['user:id,name,email', 'schedules' => function ($query) {
            $query->where('is_active', true);
        }]);

        $bookedAppointments = \App\Models\Appointment::query()
            ->where('psychologist_id', $psychologistProfile->id)
            ->whereDate('appointment_date', '>=', now()->toDateString())
            ->whereNotIn('status', ['cancelled', 'failed'])
            ->get(['schedule_id', 'appointment_date', 'start_time', 'end_time']);

        $serializedTherapist = $this->serializeTherapist($psychologistProfile);
        $serializedTherapist['booked_appointments'] = $bookedAppointments->toArray();

        return Inertia::render('therapists', [
            'therapists' => $this->therapists(),
            'selectedTherapist' => $serializedTherapist,
        ]);
    }

    private function therapists(): Collection
    {
        return PsychologistProfile::query()
            ->with(['user:id,name,email', 'schedules' => function ($query) {
                $query->where('is_active', true);
            }])
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
            'schedules' => $profile->relationLoaded('schedules') ? $profile->schedules->map(fn ($schedule) => [
                'id' => $schedule->id,
                'day_of_week' => $schedule->day_of_week,
                'start_time' => $schedule->start_time,
                'end_time' => $schedule->end_time,
            ])->toArray() : [],
        ];
    }
}

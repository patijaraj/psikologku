<?php

use App\Models\Appointment;
use App\Models\PsychologistProfile;
use App\Models\Schedule;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia;
use Spatie\Permission\Models\Role;

uses(RefreshDatabase::class);

function createSessionChatAppointment(
    User $patient,
    User $psychologist,
    string $paymentStatus = 'paid',
    string $appointmentStatus = 'upcoming',
    bool $overdue = false,
): Appointment {
    Role::findOrCreate('psychologist');
    $psychologist->assignRole('psychologist');

    $profile = PsychologistProfile::query()->firstOrCreate(
        ['user_id' => $psychologist->id],
        [
            'str_number' => 'STR-'.Str::upper(Str::random(6)),
            'specialization' => 'Klinis',
            'price' => 250000,
            'is_online' => true,
        ],
    );

    $schedule = Schedule::query()->create([
        'psychologist_id' => $profile->id,
        'day_of_week' => 'Senin',
        'start_time' => '09:00:00',
        'end_time' => '10:00:00',
        'is_active' => true,
    ]);

    $transaction = Transaction::query()->create([
        'user_id' => $patient->id,
        'psychologist_id' => $profile->id,
        'order_id' => 'ORDER-'.Str::uuid(),
        'gross_amount' => 250000,
        'status' => $paymentStatus,
    ]);

    return Appointment::query()->create([
        'user_id' => $patient->id,
        'psychologist_id' => $profile->id,
        'schedule_id' => $schedule->id,
        'transaction_id' => $transaction->id,
        'appointment_date' => $overdue ? now()->subDay()->toDateString() : now()->addDay()->toDateString(),
        'start_time' => '09:00:00',
        'end_time' => '10:00:00',
        'status' => $appointmentStatus,
    ]);
}

test('patients only see paid booked psychologists in chat', function () {
    $patient = User::factory()->create();
    $bookedPsychologist = User::factory()->create(['name' => 'Dr Booked']);
    $pendingPsychologist = User::factory()->create(['name' => 'Dr Pending']);

    createSessionChatAppointment($patient, $bookedPsychologist);
    createSessionChatAppointment($patient, $pendingPsychologist, paymentStatus: 'pending');

    $this->actingAs($patient)
        ->get(route('sessions'))
        ->assertSuccessful()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('sessions')
            ->where('isPsychologist', false)
            ->has('chatContacts', 1)
            ->where('chatContacts.0.user_id', $bookedPsychologist->id)
            ->where('chatContacts.0.name', 'Dr Booked')
            ->where('chatContacts.0.can_chat', true));
});

test('psychologists only see paid patients who booked them in chat', function () {
    $patient = User::factory()->create(['name' => 'Pasien Booked']);
    $otherPatient = User::factory()->create(['name' => 'Pasien Pending']);
    $psychologist = User::factory()->create();

    createSessionChatAppointment($patient, $psychologist, overdue: true);
    createSessionChatAppointment($otherPatient, $psychologist, paymentStatus: 'pending');

    $this->actingAs($psychologist)
        ->get(route('sessions'))
        ->assertSuccessful()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('sessions')
            ->where('isPsychologist', true)
            ->has('chatContacts', 1)
            ->where('chatContacts.0.user_id', $patient->id)
            ->where('chatContacts.0.name', 'Pasien Booked')
            ->where('chatContacts.0.status', 'overdue')
            ->where('chatContacts.0.can_chat', true)
            ->where('chatContacts.0.can_complete', true));
});

test('psychologists can complete their own paid appointments', function () {
    $patient = User::factory()->create();
    $psychologist = User::factory()->create();
    $appointment = createSessionChatAppointment($patient, $psychologist, overdue: true);

    $this->actingAs($psychologist)
        ->from(route('sessions'))
        ->patch(route('psychologist.appointments.complete', $appointment))
        ->assertRedirect(route('sessions'));

    expect($appointment->refresh()->status)->toBe('completed');
});

test('completed appointments remain visible but cannot be chatted', function () {
    $patient = User::factory()->create();
    $psychologist = User::factory()->create();

    createSessionChatAppointment($patient, $psychologist, appointmentStatus: 'completed', overdue: true);

    $this->actingAs($patient)
        ->get(route('sessions'))
        ->assertSuccessful()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('sessions')
            ->has('chatContacts', 1)
            ->where('chatContacts.0.status', 'completed')
            ->where('chatContacts.0.can_chat', false)
            ->where('chatContacts.0.can_complete', false));
});

test('psychologists cannot complete appointments owned by another psychologist', function () {
    $patient = User::factory()->create();
    $psychologist = User::factory()->create();
    $otherPsychologist = User::factory()->create();
    $appointment = createSessionChatAppointment($patient, $psychologist);

    createSessionChatAppointment(User::factory()->create(), $otherPsychologist);

    $this->actingAs($otherPsychologist)
        ->patch(route('psychologist.appointments.complete', $appointment))
        ->assertForbidden();

    expect($appointment->refresh()->status)->toBe('upcoming');
});

<?php

use App\Http\Controllers\Auth\CompleteProfileController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PsychologistAppointmentController;
use App\Http\Controllers\PsychologistScheduleController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TherapistController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/auth/google', [SocialiteController::class, 'redirect'])->name('google.redirect');

Route::get('/auth/google/callback', [SocialiteController::class, 'callback'])->name('google.callback');

Route::post('/midtrans-callback', [PaymentController::class, 'callback'])->name('midtrans.callback');

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('complete-profile', [CompleteProfileController::class, 'edit'])
        ->name('complete-profile.edit');
    Route::put('complete-profile', [CompleteProfileController::class, 'update'])
        ->name('complete-profile.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'show'])->name('dashboard');
    Route::get('psychologist-profile', [DashboardController::class, 'editPsychologistProfile'])
        ->name('psychologist.profile.edit');
    Route::post('psychologist-profile', [DashboardController::class, 'storePsychologistProfile'])
        ->name('psychologist.profile.store');
    Route::get('psychologist/appointments', [PsychologistAppointmentController::class, 'index'])
        ->name('psychologist.appointments');
    Route::patch('psychologist/appointments/{appointment}/complete', [PsychologistAppointmentController::class, 'complete'])
        ->name('psychologist.appointments.complete');
    Route::patch('psychologist/appointments/{appointment}/start', [PsychologistAppointmentController::class, 'start'])
        ->name('psychologist.appointments.start');

    // Psychologist Schedules
    Route::get('psychologist/schedules', [PsychologistScheduleController::class, 'index'])
        ->name('psychologist.schedules.index');
    Route::post('psychologist/schedules', [PsychologistScheduleController::class, 'store'])
        ->name('psychologist.schedules.store');
    Route::patch('psychologist/schedules/{schedule}', [PsychologistScheduleController::class, 'update'])
        ->name('psychologist.schedules.update');
    Route::delete('psychologist/schedules/{schedule}', [PsychologistScheduleController::class, 'destroy'])
        ->name('psychologist.schedules.destroy');

    Route::patch('psychologist/availability', [DashboardController::class, 'updateAvailability'])
        ->name('psychologist.availability');
    Route::get('therapists', [TherapistController::class, 'index'])->name('therapists');
    Route::get('therapists/{psychologistProfile}', [TherapistController::class, 'show'])->name('therapists.show');
    Route::get('sessions', [SessionController::class, 'index'])->name('sessions');
    Route::get('payment', [PaymentController::class, 'show'])->name('payment');
});

require __DIR__.'/settings.php';

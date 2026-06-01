<?php

use App\Http\Controllers\Auth\CompleteProfileController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PsychologistAppointmentController;
use App\Http\Controllers\PsychologistRecordController;
use App\Http\Controllers\PsychologistScheduleController;
use App\Http\Controllers\ReferralLetterController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TherapistController;
use App\Http\Controllers\UserRecordController;
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

    Route::patch('psychologist/appointments/{appointment}/record', [PsychologistAppointmentController::class, 'updateRecord'])
        ->name('psychologist.appointments.record.update');

    // Psychologist Records
    Route::get('psychologist/records', [PsychologistRecordController::class, 'index'])
        ->name('psychologist.records.index');
    Route::post('records/{appointment}/referral-letter', [ReferralLetterController::class, 'store'])
        ->name('records.referral-letter.store');
    Route::get('records/{appointment}/referral-letter', [ReferralLetterController::class, 'show'])
        ->name('records.referral-letter.show');
    Route::get('records/{appointment}/referral-letter/pdf', [ReferralLetterController::class, 'downloadPdf'])
        ->name('records.referral-letter.pdf');

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
    Route::get('payment/{transaction}/resume', [PaymentController::class, 'resume'])->name('payment.resume');

    Route::get('notifications', [NotificationController::class, 'index'])->name('notifications.index');
    Route::patch('notifications/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::patch('notifications/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-as-read');

    // User Records
    Route::get('records', [UserRecordController::class, 'index'])->name('user.records.index');
    Route::get('records/{appointment}', [UserRecordController::class, 'show'])->name('user.records.show');
    Route::patch('records/{appointment}/review', [UserRecordController::class, 'updateReview'])->name('user.records.review.update');
    Route::get('records/{appointment}/pdf', [UserRecordController::class, 'downloadPdf'])->name('records.pdf');

    // Customer Service (Reports)
    Route::get('customer-service', [ReportController::class, 'index'])->name('reports.index');
    Route::get('customer-service/create', [ReportController::class, 'create'])->name('reports.create');
    Route::post('customer-service', [ReportController::class, 'store'])->name('reports.store');
    Route::get('customer-service/{report}', [ReportController::class, 'show'])->name('reports.show');
});

require __DIR__.'/settings.php';

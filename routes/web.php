<?php

use App\Http\Controllers\Auth\CompleteProfileController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\PaymentController;
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
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('therapists', 'therapists')->name('therapists');
    Route::inertia('sessions', 'sessions')->name('sessions');
    Route::get('payment', [PaymentController::class, 'show'])->name('payment');
});

require __DIR__.'/settings.php';

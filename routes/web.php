<?php

use App\Http\Controllers\Auth\SocialiteController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/auth/google', [SocialiteController::class, 'redirect'])->name('google.redirect');

Route::get('/auth/google/callback', [SocialiteController::class, 'callback'])->name('google.callback');

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('therapists', 'therapists')->name('therapists');
    Route::inertia('payment', 'payment')->name('payment');
});

require __DIR__.'/settings.php';

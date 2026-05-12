<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    // Mengarahkan user ke halaman login Google
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    // Menangkap data setelah user berhasil login di Google
    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Cek apakah user sudah ada, kalau belum otomatis buat baru
            $user = User::updateOrCreate([
                'email' => $googleUser->getEmail(),
            ], [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                // Password dibiarkan kosong karena login via Google
            ]);

            // Opsional: Kalau kamu pakai Spatie, bisa langsung kasih role di sini
            // if (!$user->hasRole('pasien')) {
            //     $user->assignRole('pasien');
            // }

            // Loginkan user ke dalam aplikasi
            Auth::login($user);

            // Arahkan ke halaman dashboard Inertia kamu
            return redirect()->route('dashboard');

        } catch (\Exception $e) {
            return redirect()->route('login')->withErrors([
                'email' => 'Gagal login menggunakan Google. Silakan coba lagi.'
            ]);
        }
    }
}
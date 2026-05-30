<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompleteProfileController extends Controller
{
    public function edit(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        if ($user->phone && $user->birthdate && $user->gender && $user->birthplace && $user->address) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('auth/complete-profile');
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'phone' => ['required', 'string', 'max:25'],
            'birthdate' => ['required', 'date', 'before_or_equal:today'],
            'gender' => ['required', 'string', 'max:50'],
            'birthplace' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
        ]);

        $request->user()->forceFill($validated)->save();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}

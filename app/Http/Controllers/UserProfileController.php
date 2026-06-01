<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('profile/edit', [
            'user' => $request->user(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'birthdate' => ['required', 'date'],
            'gender' => ['required', 'string', 'max:255'],
            'birthplace' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'photo_url' => ['nullable', 'string', 'max:2048'],
        ]);

        $user = $request->user();

        $updateData = [
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'birthdate' => $validated['birthdate'],
            'gender' => $validated['gender'],
            'birthplace' => $validated['birthplace'],
            'address' => $validated['address'],
        ];

        // Only update photo_url when a new Supabase URL is provided
        $photoUrl = $validated['photo_url'] ?? null;
        if (! empty($photoUrl) && str_starts_with($photoUrl, 'http')) {
            $updateData['photo_url'] = $photoUrl;
        }

        $user->forceFill($updateData)->save();

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }
}

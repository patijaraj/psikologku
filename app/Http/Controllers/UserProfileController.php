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
            'photo_url' => ['nullable', 'string', 'url'],
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

        // Only update photo_url when a new URL is provided from Supabase
        if (! empty($validated['photo_url'])) {
            $updateData['photo_url'] = $validated['photo_url'];
        }

        $user->forceFill($updateData)->save();

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }
}

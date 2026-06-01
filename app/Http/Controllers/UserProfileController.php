<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UserProfileController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('profile/edit', [
            'user' => $request->user(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'birthdate' => ['required', 'date'],
            'gender' => ['required', 'string', 'max:255'],
            'birthplace' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string'],
            'photo' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ]);

        $user = $request->user();

        if ($request->hasFile('photo')) {
            if ($user->photo_url && Storage::disk('public')->exists($user->photo_url)) {
                Storage::disk('public')->delete($user->photo_url);
            }
            $path = $request->file('photo')->store('profile-photos', 'public');
            $user->photo_url = '/storage/' . $path;
        }

        $user->forceFill([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'birthdate' => $validated['birthdate'],
            'gender' => $validated['gender'],
            'birthplace' => $validated['birthplace'],
            'address' => $validated['address'],
        ])->save();

        return redirect()->back()->with('success', 'Profil berhasil diperbarui!');
    }
}

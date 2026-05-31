<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function create()
    {
        return inertia('customer-service');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'photo' => 'nullable|image|max:2048',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('reports', 'public');
        }

        $request->user()->reports()->create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'photo_path' => $photoPath,
            'status' => 'pending',
        ]);

        return redirect()->back()->with('success', 'Laporan berhasil dikirim, tim kami akan segera menindaklanjutinya.');
    }
}

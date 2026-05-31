<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\ReportSubmittedNotification;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
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

        $report = $request->user()->reports()->create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'photo_path' => $photoPath,
            'status' => 'pending',
        ]);

        $isPsychologist = $request->user()->isPsychologist();
        $roleName = $isPsychologist ? 'Psikolog' : 'Pasien';

        $admins = User::role('admin')->get();

        foreach ($admins as $admin) {
            Notification::make()
                ->title('Laporan Baru dari '.$roleName)
                ->body('Laporan "'.$report->title.'" telah dikirim oleh '.$request->user()->name.'.')
                ->info()
                ->actions([
                    Action::make('Lihat')
                        ->url('/admin/reports/'.$report->id.'/edit')
                        ->button(),
                ])
                ->sendToDatabase($admin);
        }

        $request->user()->notify(new ReportSubmittedNotification);

        return redirect()->back()->with('success', 'Laporan berhasil dikirim, tim kami akan segera menindaklanjutinya.');
    }
}

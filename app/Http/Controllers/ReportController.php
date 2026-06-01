<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use App\Notifications\ReportSubmittedNotification;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $reports = $request->user()->reports()->latest()->get();

        return inertia('customer-service/index', ['reports' => $reports]);
    }

    public function create()
    {
        return inertia('customer-service/create');
    }

    public function show(Request $request, Report $report)
    {
        abort_unless($report->user_id === $request->user()->id, 403);

        return inertia('customer-service/show', ['report' => $report]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|string|max:2048',
        ]);

        $report = $request->user()->reports()->create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'image_url' => ! empty($validated['image_url']) && str_starts_with($validated['image_url'], 'http')
                ? $validated['image_url']
                : null,
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

        return redirect()->route('reports.index')->with('success', 'Laporan berhasil dikirim, tim kami akan segera menindaklanjutinya.');
    }
}

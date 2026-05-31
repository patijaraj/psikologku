<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NotificationController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('notifications', [
            'notifications' => $request->user()->notifications()
                ->where('type', '!=', 'Filament\Notifications\DatabaseNotification')
                ->get(),
        ]);
    }

    public function markAsRead(Request $request, string $id): RedirectResponse
    {
        $notification = $request->user()->notifications()->where('id', $id)->first();
        if ($notification) {
            $notification->markAsRead();
        }

        return back();
    }

    public function markAllAsRead(Request $request): RedirectResponse
    {
        $request->user()->unreadNotifications()
            ->where('type', '!=', 'Filament\Notifications\DatabaseNotification')
            ->get()
            ->markAsRead();

        return back();
    }
}

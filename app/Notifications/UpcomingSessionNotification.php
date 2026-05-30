<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class UpcomingSessionNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Appointment $appointment,
        public bool $isPatient = false
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $time = Carbon::parse($this->appointment->start_time)->format('H:i');
        
        if ($this->isPatient) {
            $psychologistName = $this->appointment->psychologist->user->name ?? 'Psikolog';
            $message = "Sesi konsultasi Anda dengan {$psychologistName} akan dimulai dalam 15 menit ({$time}). Bersiaplah untuk masuk ke ruang obrolan.";
            $actionUrl = '/sessions';
        } else {
            $patientName = $this->appointment->user->name ?? 'Pasien';
            $message = "Sesi Anda dengan pasien {$patientName} akan dimulai dalam 15 menit ({$time}). Silakan bersiap untuk memulai sesi.";
            $actionUrl = '/psychologist/appointments';
        }

        return [
            'appointment_id' => $this->appointment->id,
            'title' => 'Sesi Segera Dimulai',
            'message' => $message,
            'action_url' => $actionUrl,
            'icon' => 'info',
        ];
    }
}

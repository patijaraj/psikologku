<?php

namespace App\Notifications;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class NewAppointmentNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Transaction $transaction,
        public $appointments
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toArray(object $notifiable): array
    {
        $patientName = $this->transaction->user->name ?? 'Pasien';
        $appointmentDate = $this->appointments->first()->appointment_date;
        $dateFormatted = Carbon::parse($appointmentDate)->translatedFormat('d F Y');
        
        $times = $this->appointments->map(function ($app) {
            return Carbon::parse($app->start_time)->format('H:i');
        })->join(', ');

        return [
            'transaction_id' => $this->transaction->id,
            'title' => 'Pesanan Sesi Baru',
            'message' => "{$patientName} telah berhasil memesan sesi dengan Anda pada tanggal {$dateFormatted} jam {$times}.",
            'action_url' => '/psychologist/appointments',
            'icon' => 'success',
        ];
    }
}

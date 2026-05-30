<?php

namespace App\Notifications;

use App\Models\Transaction;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class PaymentStatusNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Transaction $transaction
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $status = $this->transaction->status;
        
        $title = 'Status Pembayaran';
        $message = '';
        $actionUrl = null;
        $icon = 'info';

        switch ($status) {
            case 'paid':
                $title = 'Pembayaran Berhasil';
                $message = 'Pembayaran untuk pesanan ' . $this->transaction->order_id . ' telah berhasil. Jadwal konsultasi Anda telah dikonfirmasi.';
                $icon = 'success';
                break;
            case 'pending':
                $title = 'Menunggu Pembayaran';
                $message = 'Mohon segera selesaikan pembayaran untuk pesanan ' . $this->transaction->order_id . ' agar jadwal Anda dapat dikonfirmasi.';
                $actionUrl = '/payment/' . $this->transaction->id . '/resume';
                $icon = 'warning';
                break;
            case 'failed':
            case 'expired':
            case 'cancelled':
                $title = 'Pembayaran ' . ucfirst($status);
                $message = 'Pembayaran untuk pesanan ' . $this->transaction->order_id . ' telah gagal atau kadaluarsa. Silakan buat janji temu kembali.';
                $icon = 'error';
                break;
        }

        return [
            'transaction_id' => $this->transaction->id,
            'title' => $title,
            'message' => $message,
            'action_url' => $actionUrl,
            'icon' => $icon,
            'status' => $status,
        ];
    }
}

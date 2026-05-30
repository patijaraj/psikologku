<?php

namespace App\Console\Commands;

use App\Models\Appointment;
use App\Notifications\UpcomingSessionNotification;
use Illuminate\Console\Command;
use Carbon\Carbon;

class SendUpcomingSessionNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-upcoming-session-notifications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Kirim notifikasi 15 menit sebelum sesi dimulai kepada pasien dan psikolog';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Cari sesi yang akan dimulai dalam 15 menit. 
        // Menggunakan whereTime agar cocok dengan jam dan menit tanpa memperdulikan detik
        $targetTime = now()->addMinutes(15)->format('H:i');
        
        $appointments = Appointment::with(['user', 'psychologist.user'])
            ->where('status', 'upcoming')
            ->where('appointment_date', now()->toDateString())
            ->whereTime('start_time', 'like', $targetTime . '%')
            ->get();

        foreach ($appointments as $appointment) {
            if ($appointment->psychologist && $appointment->psychologist->user) {
                $appointment->psychologist->user->notify(new UpcomingSessionNotification($appointment, false));
            }
            if ($appointment->user) {
                $appointment->user->notify(new UpcomingSessionNotification($appointment, true));
            }
        }

        $this->info("Berhasil mengirim " . ($appointments->count() * 2) . " notifikasi untuk jadwal jam {$targetTime}.");
    }
}

<?php

namespace App\Observers;

use App\Models\Transaction;
use App\Models\Appointment;

class TransactionObserver
{
    /**
     * Handle the Transaction "created" event.
     */
    public function created(Transaction $transaction): void
    {
        //
    }

    /**
     * Handle the Transaction "updated" event.
     */
    public function updated(Transaction $transaction): void
    {
        // Jika status transaksi berubah menjadi 'paid'
        if ($transaction->status === 'paid') {
            
            // Cari data janji temu yang terikat dengan ID transaksi ini
            $appointment = Appointment::where('transaction_id', $transaction->id)->first();
            
            if ($appointment) {
                $appointment->update([
                    'status' => 'upcoming', // Membuka kunci sesi pertemuan dan izin chat
                ]);
            }
        }
        
        // Jika status transaksi berubah menjadi 'expired'
        if ($transaction->status === 'expired') {
            $appointment = Appointment::where('transaction_id', $transaction->id)->first();
            
            if ($appointment) {
                $appointment->update([
                    'status' => 'cancelled', // Batalkan sesi secara otomatis
                ]);
            }
        }
    }

    /**
     * Handle the Transaction "deleted" event.
     */
    public function deleted(Transaction $transaction): void
    {
        //
    }

    /**
     * Handle the Transaction "restored" event.
     */
    public function restored(Transaction $transaction): void
    {
        //
    }

    /**
     * Handle the Transaction "force deleted" event.
     */
    public function forceDeleted(Transaction $transaction): void
    {
        //
    }
}

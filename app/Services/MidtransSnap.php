<?php

namespace App\Services;

use App\Models\Transaction;
use Midtrans\Config;
use Midtrans\Snap;
use RuntimeException;

class MidtransSnap
{
    public function createToken(Transaction $transaction): string
    {
        $serverKey = config('midtrans.server_key');

        if (! is_string($serverKey) || $serverKey === '') {
            throw new RuntimeException('Midtrans server key is not configured.');
        }

        Config::$serverKey = $serverKey;
        Config::$isProduction = (bool) config('midtrans.is_production');
        Config::$isSanitized = true;
        Config::$is3ds = true;

        return Snap::getSnapToken([
            'transaction_details' => [
                'order_id' => $transaction->order_id,
                'gross_amount' => (int) $transaction->gross_amount,
            ],
            'customer_details' => [
                'first_name' => $transaction->user->name,
                'email' => $transaction->user->email,
            ],
        ]);
    }
}

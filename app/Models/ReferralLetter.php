<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReferralLetter extends Model
{
    protected $fillable = [
        'appointment_id',
        'addressed_to',
        'reason',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }
}

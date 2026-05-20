<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PsychologistProfile extends Model
{
    protected $fillable = [
        'user_id',
        'str_number',
        'specialization',
        'price',
        'is_online',
        'photo_url',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'psychologist_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'psychologist_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'psychologist_id');
    }
}

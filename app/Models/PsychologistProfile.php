<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PsychologistProfile extends Model
{
    protected $fillable = ['user_id',
        'str_number',
        'specialization',
        'price',
        'is_online'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'psychologist_id');
    }
}

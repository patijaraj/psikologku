<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'content',
        'photo_path',
        'status',
        'admin_reply',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

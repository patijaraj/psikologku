<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOneThrough;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'psychologist_id', // <-- Ini yang baru ditambahkan
        'order_id',
        'gross_amount',
        'status',
        'payment_type',
        'snap_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'gross_amount' => 'decimal:2',
        ];
    }

    // Relasi balik ke User (Pasien yang membayar)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Profil Psikolog (Pihak yang menerima pembayaran)
    public function psychologistProfile(): BelongsTo
    {
        // Parameter kedua ('psychologist_id') memastikan Laravel mencari di kolom yang tepat
        return $this->belongsTo(PsychologistProfile::class, 'psychologist_id');
    }

    public function psychologistUser(): HasOneThrough
    {
        return $this->hasOneThrough(
            User::class,                  // Target akhir (kita ingin mengambil data dari tabel users)
            PsychologistProfile::class,   // Model perantara (tabel psychologist_profiles)
            'id',                         // Foreign key di tabel perantara (psychologist_profiles.id)
            'id',                         // Foreign key di tabel target (users.id)
            'psychologist_id',            // Local key di tabel transactions
            'user_id'                     // Local key di tabel perantara (psychologist_profiles.user_id)
        );
    }
}
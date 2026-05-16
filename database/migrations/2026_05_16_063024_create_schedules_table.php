<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
    {
    Schema::create('schedules', function (Blueprint $table) {
        $table->id();
        // Relasi ke tabel profil psikolog
        $table->foreignId('psychologist_id')->constrained('psychologist_profiles')->cascadeOnDelete();
        
        $table->string('day_of_week'); // Contoh: 'Senin', 'Selasa', 'Rabu'
        $table->time('start_time'); // Contoh: '09:00:00'
        $table->time('end_time'); // Contoh: '12:00:00'
        
        // Sakelar untuk mematikan jadwal spesifik ini sementara
        $table->boolean('is_active')->default(true); 
        
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules');
    }
};

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
    Schema::create('appointments', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Pasien
        $table->foreignId('psychologist_id')->constrained('psychologist_profiles')->cascadeOnDelete(); // Psikolognya
        $table->foreignId('schedule_id')->constrained('schedules')->cascadeOnDelete(); // Slot waktu yang dipilih
        
        // Boleh kosong dulu saat baru mau bayar, nanti diisi kalau transaksi sukses
        $table->foreignId('transaction_id')->nullable()->constrained('transactions')->nullOnDelete();
        
        $table->date('appointment_date'); // Tanggal janjian, misal: '2026-05-20'
        $table->string('status')->default('upcoming'); // upcoming, completed, cancelled
        
        $table->string('meeting_link')->nullable(); // Link gmeet/zoom
        $table->text('notes')->nullable(); // Catatan rahasia psikolog setelah sesi
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};

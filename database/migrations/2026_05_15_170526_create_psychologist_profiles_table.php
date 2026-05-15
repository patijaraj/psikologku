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
    Schema::create('psychologist_profiles', function (Blueprint $table) {
        $table->id();
        // Relasi ke tabel users
        $table->foreignId('user_id')->constrained()->cascadeOnDelete();
        
        $table->string('str_number')->nullable();
        $table->string('specialization');
        $table->decimal('price', 12, 2); // Tarif konsultasi
        
        // Sakelar status online ala Halodoc
        $table->boolean('is_online')->default(false);
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('psychologist_profiles');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Cek dan tambah kolom phone jika belum ada
        if (! Schema::hasColumn('users', 'phone')) {
            Schema::table('users', function (Blueprint $table) {
                $table->string('phone', 25)->nullable();
            });
        }

        // Cek dan tambah kolom birthdate jika belum ada
        if (! Schema::hasColumn('users', 'birthdate')) {
            Schema::table('users', function (Blueprint $table) {
                $table->date('birthdate')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'birthdate']);
        });
    }
};

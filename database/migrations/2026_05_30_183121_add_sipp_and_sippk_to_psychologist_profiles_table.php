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
        Schema::table('psychologist_profiles', function (Blueprint $table) {
            $table->string('sipp')->nullable();
            $table->string('sippk')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('psychologist_profiles', function (Blueprint $table) {
            $table->dropColumn(['sipp', 'sippk']);
        });
    }
};

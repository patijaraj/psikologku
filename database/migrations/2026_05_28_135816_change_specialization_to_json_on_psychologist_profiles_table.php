<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First convert existing strings to a single element json array if they aren't already json arrays
        DB::table('psychologist_profiles')->get()->each(function ($profile) {
            $spec = $profile->specialization;
            if ($spec && ! str_starts_with($spec, '[')) {
                DB::table('psychologist_profiles')
                    ->where('id', $profile->id)
                    ->update(['specialization' => json_encode([$spec])]);
            }
        });

        Schema::table('psychologist_profiles', function (Blueprint $table) {
            $table->json('specialization')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('psychologist_profiles', function (Blueprint $table) {
            $table->string('specialization')->change();
        });

        // Convert json array back to string
        DB::table('psychologist_profiles')->get()->each(function ($profile) {
            $spec = $profile->specialization;
            if ($spec && str_starts_with($spec, '[')) {
                $decoded = json_decode($spec, true);
                if (is_array($decoded) && count($decoded) > 0) {
                    DB::table('psychologist_profiles')
                        ->where('id', $profile->id)
                        ->update(['specialization' => $decoded[0]]);
                }
            }
        });
    }
};

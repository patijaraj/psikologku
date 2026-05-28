<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

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

        DB::statement('ALTER TABLE psychologist_profiles ALTER COLUMN specialization TYPE json USING specialization::json');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE psychologist_profiles ALTER COLUMN specialization TYPE varchar USING specialization::text');

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

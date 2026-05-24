<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = App\Models\User::find(3);
$appointments = $user->appointments()
    ->with(['psychologist.user:id,name', 'psychologist:id,user_id,specialization'])
    ->where('status', 'completed')
    ->whereNotNull('record_summary')
    ->where('record_summary', '!=', '')
    ->latest('appointment_date')
    ->get();
    
echo "Found: " . $appointments->count() . "\n";

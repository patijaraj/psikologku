
<?php

return [
    'server_key' => trim((string) env('MIDTRANS_SERVER_KEY', ''), '"\''),
    'client_key' => trim((string) env('MIDTRANS_CLIENT_KEY', ''), '"\''),
    'is_production' => in_array(strtolower(trim((string) env('MIDTRANS_IS_PRODUCTION', 'false'), '"\'')), ['true', '1', 'yes', 'on'], true),
];

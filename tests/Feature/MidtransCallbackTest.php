<?php

use App\Models\Transaction;
use App\Models\User;
use App\Services\MidtransSnap;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;

uses(RefreshDatabase::class);

function midtransSignature(
    string $orderId,
    string $statusCode,
    string $grossAmount,
    string $serverKey,
): string {
    return hash('sha512', $orderId.$statusCode.$grossAmount.$serverKey);
}

test('payment page creates a transaction and returns snap token', function () {
    $user = User::factory()->create([
        'phone' => '081234567890',
        'birthdate' => '1995-05-15',
    ]);

    $this->app->bind(MidtransSnap::class, fn () => new class extends MidtransSnap
    {
        public function createToken(Transaction $transaction): string
        {
            return 'snap-test-token';
        }
    });

    $response = $this->actingAs($user)->get(route('payment'));
    $transaction = Transaction::query()->firstOrFail();

    $response
        ->assertSuccessful()
        ->assertInertia(fn (AssertableInertia $page) => $page
            ->component('payment')
            ->where('snapToken', 'snap-test-token')
            ->where('orderId', $transaction->order_id)
            ->where('amount', 150000.0));

    expect($transaction)
        ->user_id->toBe($user->id)
        ->status->toBe('pending')
        ->gross_amount->toBe('150000.00')
        ->snap_token->toBe('snap-test-token');
});

test('midtrans callback accepts valid signatures', function () {
    config(['midtrans.server_key' => 'server-key']);

    $user = User::factory()->create();
    $transaction = Transaction::query()->create([
        'user_id' => $user->id,
        'order_id' => 'ORDER-123',
        'gross_amount' => 150000,
        'status' => 'pending',
    ]);

    $payload = [
        'order_id' => 'ORDER-123',
        'status_code' => '200',
        'gross_amount' => '150000.00',
        'transaction_status' => 'settlement',
        'payment_type' => 'gopay',
        'signature_key' => midtransSignature('ORDER-123', '200', '150000.00', 'server-key'),
    ];

    $response = $this->postJson(route('midtrans.callback'), $payload);

    $response
        ->assertSuccessful()
        ->assertJson(['message' => 'Notifikasi diproses']);

    expect($transaction->refresh())
        ->status->toBe('paid')
        ->payment_type->toBe('gopay');
});

test('midtrans callback rejects invalid signatures', function () {
    config(['midtrans.server_key' => 'server-key']);

    $user = User::factory()->create();
    $transaction = Transaction::query()->create([
        'user_id' => $user->id,
        'order_id' => 'ORDER-123',
        'gross_amount' => 150000,
        'status' => 'pending',
    ]);

    $payload = [
        'order_id' => 'ORDER-123',
        'status_code' => '200',
        'gross_amount' => '150000.00',
        'transaction_status' => 'settlement',
        'signature_key' => 'invalid-signature',
    ];

    $response = $this->postJson(route('midtrans.callback'), $payload);

    $response
        ->assertForbidden()
        ->assertJson(['message' => 'Invalid signature']);

    expect($transaction->refresh()->status)->toBe('pending');
});

test('midtrans callback fails when server key is missing', function () {
    config(['midtrans.server_key' => null]);

    $response = $this->postJson(route('midtrans.callback'), [
        'order_id' => 'ORDER-123',
        'status_code' => '200',
        'gross_amount' => '150000.00',
        'transaction_status' => 'settlement',
        'signature_key' => 'signature',
    ]);

    $response
        ->assertServerError()
        ->assertJson(['message' => 'Midtrans server key is not configured']);
});

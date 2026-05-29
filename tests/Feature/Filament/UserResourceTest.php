<?php

use App\Filament\Resources\Users\Pages\EditUser;
use App\Models\PsychologistProfile;
use App\Models\User;
use Livewire\Livewire;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\assertDatabaseMissing;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\actingAs;

beforeEach(function () {
    // Pastikan role psychologist dan admin sudah ada
    Role::firstOrCreate(['name' => 'psychologist']);
    Role::firstOrCreate(['name' => 'admin']);
    Role::firstOrCreate(['name' => 'user']);
});

it('deletes psychologist profile when psychologist role is revoked', function () {
    $admin = User::factory()->create();
    $admin->assignRole('admin');

    $psychologist = User::factory()->create();
    $psychologist->assignRole('psychologist');

    // Buat profile untuk psikolog
    $profile = PsychologistProfile::create([
        'user_id' => $psychologist->id,
        'str_number' => '12345678',
        'specialization' => ['Clinical'],
        'price' => 100000,
        'is_online' => true,
    ]);

    // Verifikasi profile sudah ada
    assertDatabaseHas('psychologist_profiles', ['user_id' => $psychologist->id]);

    actingAs($admin);

    // Ambil role ID untuk 'user' dan cabut 'psychologist'
    $userRoleId = Role::where('name', 'user')->first()->id;

    // Simulasikan action edit di panel Filament
    Livewire::test(EditUser::class, ['record' => $psychologist->getRouteKey()])
        ->fillForm([
            'name' => $psychologist->name,
            'email' => $psychologist->email,
            'roles' => [$userRoleId], // Hanya memberikan role user, mencabut psychologist
        ])
        ->call('save')
        ->assertHasNoFormErrors();

    // Pastikan profile terhapus
    assertDatabaseMissing('psychologist_profiles', ['user_id' => $psychologist->id]);
});

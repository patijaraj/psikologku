<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use App\Models\User;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use Spatie\Permission\PermissionRegistrar;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        /** @var User $user */
        $user = $this->record;

        // Refresh model dan hilangkan cache roles/permissions Spatie
        // untuk memastikan kita mendapat role terbaru dari database.
        app()->make(PermissionRegistrar::class)->forgetCachedPermissions();
        $user->refresh();

        // Jika setelah di-save user tersebut sudah tidak memiliki role psychologist,
        // maka kita hapus data psychologist profile-nya (jika ada).
        if (! $user->isPsychologist()) {
            $user->psychologistProfile()->delete();
        }
    }
}

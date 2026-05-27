<?php

namespace App\Filament\Resources\PsychologistProfiles\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class PsychologistProfileForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('str_number'),
                TextInput::make('specialization')
                    ->required(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                Toggle::make('is_online')
                    ->required(),
                TextInput::make('photo_url')
                    ->url(),
            ]);
    }
}

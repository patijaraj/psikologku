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
                \Filament\Forms\Components\Select::make('profession')
                    ->options([
                        'Psikolog Klinis' => 'Psikolog Klinis',
                        'Psikiater' => 'Psikiater',
                    ])
                    ->required()
                    ->default('Psikolog Klinis'),
                TextInput::make('str_number'),
                TextInput::make('sipp'),
                TextInput::make('sippk'),
                \Filament\Forms\Components\FileUpload::make('signature_path')
                    ->image()
                    ->directory('signatures'),
                TextInput::make('specialization')
                    ->required(),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rp'),
                Toggle::make('is_online')
                    ->required(),
                TextInput::make('photo_url')
                    ->url(),
            ]);
    }
}

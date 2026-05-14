<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                // DateTimePicker::make('email_verified_at'),
                // Textarea::make('two_factor_secret')
                //     ->columnSpanFull(),
                // Textarea::make('two_factor_recovery_codes')
                //     ->columnSpanFull(),
                // DateTimePicker::make('two_factor_confirmed_at'),
                Select::make('roles')
                    ->relationship('roles', 'name')
                    ->preload()
                    ->searchable()
                    ->required(),
                // TextInput::make('google_id'),
                TextInput::make('phone')
                    ->tel(),
                DatePicker::make('birthdate'),
            ]);
    }
}

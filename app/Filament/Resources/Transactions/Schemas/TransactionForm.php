<?php

namespace App\Filament\Resources\Transactions\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class TransactionForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required(),
                TextInput::make('order_id')
                    ->required(),
                TextInput::make('gross_amount')
                    ->required()
                    ->numeric(),
                TextInput::make('status')
                    ->required()
                    ->default('pending'),
                TextInput::make('payment_type'),
                TextInput::make('psychologist_id')
                    ->numeric(),
            ]);
    }
}

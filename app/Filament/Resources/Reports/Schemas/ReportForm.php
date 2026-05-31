<?php

namespace App\Filament\Resources\Reports\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ReportForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('user_id')
                    ->relationship('user', 'name')
                    ->required()
                    ->disabled()
                    ->label('User'),
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->disabled()
                    ->label('Judul Laporan'),
                Textarea::make('content')
                    ->required()
                    ->columnSpanFull()
                    ->disabled()
                    ->label('Isi Laporan'),
                FileUpload::make('photo_path')
                    ->image()
                    ->directory('reports')
                    ->disk('public')
                    ->disabled()
                    ->label('Foto Pendukung (Opsional)'),
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'in_progress' => 'Diproses',
                        'resolved' => 'Selesai',
                    ])
                    ->required()
                    ->default('pending')
                    ->label('Status'),
            ]);
    }
}

<?php

namespace App\Filament\Resources\Reports\Schemas;

use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Illuminate\Support\HtmlString;

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
                Placeholder::make('foto')
                    ->label('Foto Pendukung')
                    ->content(function ($record) {
                        if (! $record) {
                            return '-';
                        }
                        if ($record->image_url) {
                            return new HtmlString('<img src="'.$record->image_url.'" style="max-height: 300px; border-radius: 8px;" />');
                        }
                        if ($record->photo_path) {
                            return new HtmlString('<img src="/storage/'.$record->photo_path.'" style="max-height: 300px; border-radius: 8px;" />');
                        }

                        return '-';
                    }),
                Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'in_progress' => 'Diproses',
                        'resolved' => 'Selesai',
                    ])
                    ->required()
                    ->default('pending')
                    ->label('Status'),
                Textarea::make('admin_reply')
                    ->columnSpanFull()
                    ->label('Balasan Admin')
                    ->placeholder('Ketik balasan Anda di sini...'),
            ]);
    }
}

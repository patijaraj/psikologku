<?php

namespace App\Filament\Resources\PsychologistProfiles\Pages;

use App\Filament\Resources\PsychologistProfiles\PsychologistProfileResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPsychologistProfiles extends ListRecords
{
    protected static string $resource = PsychologistProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }

    protected function getTableQuery(): \Illuminate\Database\Eloquent\Builder
    {
        // Memaksa Filament untuk mengambil data user dan schedules sekaligus dalam 1 query awal
        return parent::getTableQuery()->with(['user', 'schedules']);
    }
}

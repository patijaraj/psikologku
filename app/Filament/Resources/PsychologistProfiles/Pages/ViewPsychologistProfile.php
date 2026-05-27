<?php

namespace App\Filament\Resources\PsychologistProfiles\Pages;

use App\Filament\Resources\PsychologistProfiles\PsychologistProfileResource;
use App\Filament\Resources\PsychologistProfiles\Widgets\PsychologistIncomeChart;
use Filament\Resources\Pages\ViewRecord;

class ViewPsychologistProfile extends ViewRecord
{
    protected static string $resource = PsychologistProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            // Menyediakan tombol edit di pojok kanan atas halaman detail jika admin ingin beralih ke mode edit
            \Filament\Actions\EditAction::make(), 
        ];
    }

    // 🟢 PINDAHKAN ATAU TAMBAHKAN WIDGET GRAFIK DI SINI
    protected function getHeaderWidgets(): array
    {
        return [
            PsychologistIncomeChart::make([
                'psychologistId' => $this->getRecord()->id, 
            ]),
        ];
    }
}
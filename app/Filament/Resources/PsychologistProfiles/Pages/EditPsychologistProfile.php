<?php

namespace App\Filament\Resources\PsychologistProfiles\Pages;

use App\Filament\Resources\PsychologistProfiles\PsychologistProfileResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;
use App\Filament\Resources\PsychologistProfiles\Widgets\PsychologistIncomeChart;

class EditPsychologistProfile extends EditRecord
{
    protected static string $resource = PsychologistProfileResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}

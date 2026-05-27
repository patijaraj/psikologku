<?php

namespace App\Filament\Resources\PsychologistProfiles;

use App\Filament\Resources\PsychologistProfiles\Pages\CreatePsychologistProfile;
use App\Filament\Resources\PsychologistProfiles\Pages\EditPsychologistProfile;
use App\Filament\Resources\PsychologistProfiles\Pages\ListPsychologistProfiles;
use App\Filament\Resources\PsychologistProfiles\Pages\ViewPsychologistProfile;
use App\Filament\Resources\PsychologistProfiles\Schemas\PsychologistProfileForm;
use App\Filament\Resources\PsychologistProfiles\Tables\PsychologistProfilesTable;
use App\Models\PsychologistProfile;
use BackedEnum;
use Filament\Schemas\Schema;
use Filament\Schemas\Components as LayoutComponents;
use Filament\Forms\Components as FormComponents;
use Filament\Support\Icons\Heroicon;
use Filament\Forms;
use Filament\Resources\Resource;
use Filament\Tables\Table;
use Filament\Tables;

class PsychologistProfileResource extends Resource
{
    protected static ?string $model = PsychologistProfile::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Psychologist';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                // 🟢 Menggunakan LayoutComponents untuk Section
                LayoutComponents\Section::make('Status Keaktifan')
                    ->description('Atur apakah psikolog sedang aktif melayani pasien atau tidak.')
                    ->schema([
                        // 🟢 Menggunakan FormComponents untuk field input Toggle
                        FormComponents\Toggle::make('is_online')
                            ->label('Status Online')
                            ->onColor('success')
                            ->offColor('danger'),
                    ]),

                LayoutComponents\Section::make('Jadwal Praktik')
                    ->description('Kelola hari dan jam praktik psikolog ini.')
                    ->schema([
                        // 🟢 Menggunakan FormComponents untuk Repeater dan input di dalamnya
                        FormComponents\Repeater::make('schedules')
                            ->relationship('schedules')
                            ->schema([
                                FormComponents\Select::make('day_of_week')
                                    ->label('Hari')
                                    ->options([
                                        'Senin'   => 'Senin',
                                        'Selasa'  => 'Selasa',
                                        'Rabu'    => 'Rabu',
                                        'Kamis'   => 'Kamis',
                                        'Jumat'   => 'Jumat',
                                        'Sabtu'   => 'Sabtu',
                                        'Minggu'  => 'Minggu',
                                    ])
                                    ->required(),
                                FormComponents\TimePicker::make('start_time')
                                    ->label('Jam Mulai')
                                    ->required(),
                                FormComponents\TimePicker::make('end_time')
                                    ->label('Jam Selesai')
                                    ->required(),
                                FormComponents\Toggle::make('is_active')
                                    ->label('Aktif')
                                    ->default(true),
                            ])
                            ->columns(4)
                            ->grid(1)
                            ->createItemButtonLabel('Tambah Jadwal Baru'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        // 🟢 Tambahkan backslash '\' di depan Tables untuk memastikan PHP mencari ke core Filament, bukan lokal folder
        return $table
            ->columns([
                \Filament\Tables\Columns\TextColumn::make('user.name')
                    ->label('Nama Psikolog')
                    ->searchable()
                    ->sortable(),

                \Filament\Tables\Columns\TextColumn::make('specialization')
                    ->label('Spesialisasi')
                    ->badge(),

                \Filament\Tables\Columns\ToggleColumn::make('is_online')
                    ->label('Status Online')
                    ->alignCenter(),

                \Filament\Tables\Columns\TextColumn::make('total_pendapatan')
                    ->label('Total Pendapatan')
                    ->money('IDR', locale: 'id')
                    ->getStateUsing(function (PsychologistProfile $record) {
                        return \App\Models\Transaction::where('psychologist_id', $record->id)
                            ->where('status', 'paid')
                            ->sum('gross_amount');
                    }),

                \Filament\Tables\Columns\TextColumn::make('monitoring_pasien')
                    ->label('Sesi Pasien (Selesai / Total)')
                    ->getStateUsing(function (PsychologistProfile $record) {
                        $total = $record->appointments()->count();
                        $selesai = $record->appointments()->whereIn('status', ['completed', 'selesai'])->count();
                        return "{$selesai} / {$total} Sesi";
                    })
                    ->badge()
                    ->color('info'),
            ])
            ->filters([
                \Filament\Tables\Filters\SelectFilter::make('is_online')
                    ->label('Filter Status')
                    ->options([
                        '1' => 'Online',
                        '0' => 'Offline',
                    ]),
            ])
            ->actions([
                \Filament\Actions\ViewAction::make()
                    ->label('Lihat Detail')
                    ->color('info'), // Warna biru info

                \Filament\Actions\EditAction::make()
                    ->label('Edit')
                    ->color('warning'), // Warna kuning/oranye peringatan
            ])
            ->bulkActions([
                \Filament\Actions\BulkActionGroup::make([
                    // 🟢 UBAH KE SINI: Bulk action juga ditarik dari rumpun komponen dasar v4
                    \Filament\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListPsychologistProfiles::route('/'),
            'create' => CreatePsychologistProfile::route('/create'),
            'view' => ViewPsychologistProfile::route('/{record}'),
            'edit' => EditPsychologistProfile::route('/{record}/edit'),
        ];
    }
}

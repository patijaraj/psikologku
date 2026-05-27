<?php

namespace App\Filament\Resources\Transactions;

use App\Filament\Resources\Transactions\Pages\CreateTransaction;
use App\Filament\Resources\Transactions\Pages\EditTransaction;
use App\Filament\Resources\Transactions\Pages\ListTransactions;
use App\Filament\Resources\Transactions\Schemas\TransactionForm;
use App\Filament\Resources\Transactions\Tables\TransactionsTable;
use App\Models\Transaction;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Actions\EditAction;

class TransactionResource extends Resource
{
    protected static ?string $model = Transaction::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    protected static ?string $recordTitleAttribute = 'Transaction';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Schemas\Components\Section::make('Informasi Transaksi (Read-Only)')
                    ->description('Data bawaan transaksi dari sistem.')
                    ->schema([
                        \Filament\Forms\Components\TextInput::make('order_id')
                            ->label('ID Order')
                            ->disabled(), // Mengunci input agar tidak bisa diedit

                        \Filament\Forms\Components\TextInput::make('gross_amount')
                            ->label('Total Nominal')
                            ->numeric()
                            ->disabled(),
                    ])->columns(2),

                \Filament\Schemas\Components\Section::make('Kontrol Pembayaran Manual')
                    ->description('Gunakan fitur ini untuk memaksa status menjadi Paid jika payment gateway bermasalah.')
                    ->schema([
                        \Filament\Forms\Components\Select::make('status')
                            ->label('Status Pembayaran')
                            ->options([
                                'pending' => 'Pending (Menunggu Pembayaran)',
                                'paid' => 'Paid (Sudah Dibayar/Lunas)',
                                'expired' => 'Expired (Kedaluwarsa/Gagal)',
                            ])
                            ->required()
                            ->native(false), // Mengubah tampilan dropdown jadi lebih modern standar Filament
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('order_id')
                    ->label('ID Order')
                    ->searchable()
                    ->copyable() // Admin bisa langsung copy ID order jika dibutuhkan untuk cek ke dashboard Midtrans
                    ->sortable(),

                TextColumn::make('user.name')
                    ->label('Nama Pasien')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('psychologistUser.name')
                    ->label('Psikolog Tujuan')
                    ->searchable(),

                TextColumn::make('gross_amount')
                    ->label('Total Bayar')
                    ->money('IDR', locale: 'id')
                    ->sortable(),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'paid' => 'success',
                        'pending' => 'warning',
                        'expired' => 'danger',
                        default => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->label('Tanggal Transaksi')
                    ->dateTime('d M Y H:i')
                    ->sortable(),
            ])
            ->filters([
                // Filter cepat berdasarkan status transaksi
                SelectFilter::make('status')
                    ->label('Filter Status')
                    ->options([
                        'paid' => 'Paid',
                        'pending' => 'Pending',
                        'expired' => 'Expired',
                    ]),
            ])
            ->actions([
                EditAction::make()
                    ->label('Ubah Status'),
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
            'index' => ListTransactions::route('/'),
            'create' => CreateTransaction::route('/create'),
            'edit' => EditTransaction::route('/{record}/edit'),
        ];
    }
}

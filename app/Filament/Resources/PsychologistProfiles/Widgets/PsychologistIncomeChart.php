<?php

namespace App\Filament\Resources\PsychologistProfiles\Widgets;

use Filament\Widgets\ChartWidget;
use App\Models\Transaction;
use Livewire\Attributes\Locked;

class PsychologistIncomeChart extends ChartWidget
{
    protected ?string $heading = 'Grafik Pendapatan Bulanan';
    
    // 🟢 Ganti nama properti dari $record menjadi $psychologistId dengan tipe int
    #[Locked]
    public ?int $psychologistId = null; 

    protected function getData(): array
    {
        // 🟢 Cek ketersediaan ID
        if (!$this->psychologistId) {
            return [
                'datasets' => [],
                'labels' => [],
            ];
        }

        $monthlyData = array_fill(1, 12, 0);

        // 🟢 Query langsung menggunakan $this->psychologistId
        $transactions = Transaction::where('psychologist_id', $this->psychologistId)
            ->where('status', 'paid')
            ->whereYear('created_at', now()->year)
            ->selectRaw('EXTRACT(MONTH FROM created_at) as month, SUM(gross_amount) as total')
            ->groupBy('month')
            ->get();

        foreach ($transactions as $transaction) {
            $monthlyData[(int)$transaction->month] = (float)$transaction->total;
        }

        return [
            'datasets' => [
                [
                    'label' => 'Pendapatan (Rp)',
                    'data' => array_values($monthlyData),
                    'borderColor' => '#10b981',
                    'backgroundColor' => 'rgba(16, 185, 129, 0.1)',
                    'fill' => 'start',
                ],
            ],
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
        ];
    }

    protected function getType(): string
    {
        return 'line'; 
    }
}
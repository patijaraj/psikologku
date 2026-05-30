<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Sesi / Rekam Medis</title>
    <style>
        body { font-family: Helvetica, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 10px; font-size: 14px; }
        .header { text-align: center; border-bottom: 2px solid #1464BC; padding-bottom: 10px; margin-bottom: 20px; }
        .title { font-size: 22px; font-weight: bold; color: #1464BC; margin: 0; }
        .subtitle { font-size: 13px; color: #666; margin-top: 5px; }
        .section { margin-bottom: 20px; }
        .section-title { font-size: 15px; font-weight: bold; background: #f2f4f6; padding: 6px 10px; margin-bottom: 10px; border-left: 4px solid #1464BC; }
        .info-grid { display: table; width: 100%; margin-bottom: 5px; }
        .info-row { display: table-row; }
        .info-label { display: table-cell; width: 25%; font-weight: bold; padding: 4px 0; color: #555; }
        .info-value { display: table-cell; width: 75%; padding: 4px 0; }
        .content-box { border: 1px solid #e2e4e6; padding: 12px; border-radius: 4px; background: #fff; margin-bottom: 10px; }
        .footer { text-align: center; font-size: 11px; color: #999; margin-top: 40px; border-top: 1px solid #eee; padding-top: 10px; }
        ul { margin-top: 0; padding-left: 20px; margin-bottom: 0; }
        h4 { margin-top: 0; margin-bottom: 5px; font-size: 13px; color: #444; }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="title">Psikologku</h1>
        <p class="subtitle">Laporan Hasil Sesi / Rekam Medis</p>
    </div>

    <div class="section">
        <div class="section-title">Informasi Sesi</div>
        <div class="info-grid">
            <div class="info-row">
                <div class="info-label">ID Sesi</div>
                <div class="info-value">#{{ $appointment->id }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Tanggal Sesi</div>
                <div class="info-value">{{ $appointment->appointment_date ? $appointment->appointment_date->format('d F Y') : '-' }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Psikolog</div>
                <div class="info-value">{{ $appointment->psychologist->user->name ?? '-' }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Pasien</div>
                <div class="info-value">{{ $appointment->user->name ?? '-' }}</div>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Hasil Analisis & Catatan</div>
        
        <h4>Kondisi Pasien (Patient State)</h4>
        <div class="content-box">
            @if(is_array($appointment->patient_state) && count($appointment->patient_state) > 0)
                <ul>
                    @foreach($appointment->patient_state as $state)
                        <li>{{ $state }}</li>
                    @endforeach
                </ul>
            @else
                <p style="margin:0;">-</p>
            @endif
        </div>

        <h4>Fokus Diagnostik</h4>
        <div class="content-box">
            {{ $appointment->diagnostic_focus ?: '-' }}
        </div>

        <h4>Ringkasan Sesi</h4>
        <div class="content-box">
            {!! nl2br(e($appointment->record_summary)) !!}
        </div>

        <h4>Rekomendasi Terstruktur</h4>
        <div class="content-box">
            @if(is_array($appointment->structured_recommendations) && count($appointment->structured_recommendations) > 0)
                <ul>
                    @foreach($appointment->structured_recommendations as $rec)
                        <li>{{ $rec['title'] ?? $rec }}</li>
                    @endforeach
                </ul>
            @else
                <p style="margin:0;">-</p>
            @endif
        </div>
    </div>

    <div class="footer">
        Dokumen ini dibuat secara otomatis oleh sistem Psikologku pada {{ now()->format('d F Y H:i') }} WIB.
        <br>
        Bersifat rahasia dan hanya untuk keperluan rekam medis yang bersangkutan.
    </div>
</body>
</html>

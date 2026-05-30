<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Surat Rujukan</title>
    <style>
        body { font-family: 'Times New Roman', Times, serif; line-height: 1.6; color: #000; margin: 0; padding: 20px 40px; font-size: 11pt; }
        
        .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; display: table; width: 100%; }
        
        .logo-container { display: table-cell; width: 30%; vertical-align: middle; }
        
        .logo-box {
            display: inline-block;
            background-color: #1464BC;
            color: #fff;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            text-align: center;
            line-height: 32px;
            margin-right: 10px;
            vertical-align: middle;
        }
        
        .logo-text {
            display: inline-block;
            font-size: 16pt;
            font-weight: bold;
            color: #1464BC;
            font-family: Arial, sans-serif;
            vertical-align: middle;
        }

        .header-text { display: table-cell; width: 70%; text-align: center; vertical-align: middle; }
        
        .clinic-name { font-size: 14pt; font-weight: bold; margin: 0; text-transform: uppercase; font-family: Arial, sans-serif; }
        .clinic-sub { font-size: 10pt; margin: 0; font-family: Arial, sans-serif; }
        .clinic-address { font-size: 9pt; margin: 0; font-family: Arial, sans-serif; }
        
        .title { text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0 40px 0; text-decoration: underline; }
        
        .rahasia-box { float: right; border: 2px solid #000; padding: 5px 15px; font-weight: bold; font-size: 12pt; font-family: Arial, sans-serif; margin-top: -60px;}
        
        .content { clear: both; }
        
        .addressed { margin-bottom: 30px; line-height: 1.4; }
        
        .intro-text { margin-bottom: 20px; }
        
        .patient-info { display: table; width: 100%; margin-bottom: 20px; line-height: 1.4; }
        .info-row { display: table-row; }
        .info-label { display: table-cell; width: 30%; padding: 2px 0; }
        .info-colon { display: table-cell; width: 2%; padding: 2px 0; }
        .info-value { display: table-cell; width: 68%; padding: 2px 0; }
        
        .results-intro { margin-bottom: 15px; }
        .results-text { text-align: justify; margin-bottom: 30px; text-indent: 40px; }
        .closing { margin-bottom: 50px; text-indent: 40px; }
        
        .signature-area { width: 100%; text-align: right; margin-top: 50px; }
        .signature-box { display: inline-block; text-align: center; width: 300px; }
        .date-text { margin-bottom: 20px; }
        .signer-title { margin-bottom: 5px; }
        .signer-name { font-weight: bold; text-decoration: underline; margin-bottom: 5px; }
        .signer-license { margin: 0; font-size: 11pt; }
        
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-container">
            <div class="logo-box">
                <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiPjwvY2lyY2xlPjxwYXRoIGQ9Ik04IDE0czEuNSAyIDQgMiA0LTIgNC0yIj48L3BhdGg+PGxpbmUgeDE9IjkiIHgyPSI5LjAxIiB5MT0iOSIgeTI9IjkiPjwvbGluZT48bGluZSB4MT0iMTUiIHgyPSIxNS4wMSIgeTE9IjkiIHkyPSI5Ij48L2xpbmU+PC9zdmc+" style="width: 20px; height: 20px; vertical-align: middle; margin-top: 6px;">
            </div>
            <div class="logo-text">Psikologku</div>
        </div>
        <div class="header-text">
            <p class="clinic-name">Klinik Psikologi Psikologku</p>
            <p class="clinic-sub">Tes Psikologi – Asesmen & Rekrutmen – Konseling & Terapi</p>
            <p class="clinic-address">Website: www.psikologku.com | Email: admin@psikologku.com</p>
        </div>
    </div>



    <h1 class="title">SURAT RUJUKAN</h1>

    <div class="content">
        <div class="addressed">
            Kepada<br>
            Yth. {{ $referralLetter->addressed_to }}<br>
            Di tempat
        </div>

        <div class="intro-text">
            Mohon dilakukan pemeriksaan dan pengobatan lebih lanjut kepada pasien:
        </div>

        <div class="patient-info">
            <div class="info-row">
                <div class="info-label">Nama</div>
                <div class="info-colon">:</div>
                <div class="info-value">{{ $appointment->user->name }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Jenis Kelamin</div>
                <div class="info-colon">:</div>
                <div class="info-value">{{ $appointment->user->gender ?? '-' }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Tempat, Tanggal Lahir</div>
                <div class="info-colon">:</div>
                <div class="info-value">{{ $appointment->user->birthplace ?? '-' }}, {{ $appointment->user->birthdate ? \Carbon\Carbon::parse($appointment->user->birthdate)->format('d F Y') : '-' }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Alamat</div>
                <div class="info-colon">:</div>
                <div class="info-value">{{ $appointment->user->address ?? '-' }}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Yang datang diperiksa pada</div>
                <div class="info-colon">:</div>
                <div class="info-value">{{ $appointment->appointment_date ? $appointment->appointment_date->format('d F Y') : '-' }}</div>
            </div>
        </div>

        <div class="results-intro">
            Dengan hasil pemeriksaan psikologis sebagai berikut :
        </div>

        <div class="results-text">
            {!! nl2br(e($referralLetter->reason)) !!}
        </div>

        <div class="closing">
            Demikian agar mendapatkan pemeriksaan lanjutan dan pengobatan yang diperlukan, atas perhatian dan bantuannya, diucapkan terima kasih.
        </div>

        <div class="signature-area">
            <div class="signature-box">
                <div class="date-text">Jakarta, {{ now()->format('d F Y') }}</div>
                <div class="signer-title">Mengetahui,</div>
                
                @if($appointment->psychologist->signature_path)
                    <div style="margin: 10px 0;">
                        <img src="{{ str_starts_with($appointment->psychologist->signature_path, 'http') ? $appointment->psychologist->signature_path : public_path('storage/' . $appointment->psychologist->signature_path) }}" style="max-height: 80px; max-width: 200px;">
                    </div>
                @else
                    <div style="height: 80px; margin: 10px 0;"></div>
                @endif
                
                @if(($appointment->psychologist->profession ?? 'Psikolog Klinis') == 'Psikiater')
                    <div class="signer-name">({{ $appointment->psychologist->user->name }}, Sp.KJ)</div>
                    <div class="signer-license">STR : {{ $appointment->psychologist->str_number ?? '-' }}</div>
                    <div class="signer-license">SIP : {{ $appointment->psychologist->sipp ?? '-' }}</div>
                @else
                    <div class="signer-name">({{ $appointment->psychologist->user->name }}, M.Psi., Psikolog)</div>
                    <div class="signer-license">STRPK : {{ $appointment->psychologist->str_number ?? '-' }}</div>
                    <div class="signer-license">SIPPK : {{ $appointment->psychologist->sippk ?? '-' }}</div>
                @endif
            </div>
        </div>
    </div>
</body>
</html>

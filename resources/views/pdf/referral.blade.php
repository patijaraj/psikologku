<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Surat Rujukan</title>
    <style>
        body { font-family: 'Times New Roman', Times, serif; line-height: 1.6; color: #000; margin: 0; padding: 20px 40px; font-size: 14pt; }
        
        .header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 30px; display: table; width: 100%; }
        
        .logo-container { display: table-cell; width: 30%; vertical-align: middle; }
        
        .logo-box {
            display: inline-block;
            background-color: #1464BC;
            color: #fff;
            width: 40px;
            height: 40px;
            border-radius: 8px;
            text-align: center;
            line-height: 40px;
            font-size: 24px;
            font-family: sans-serif;
            font-weight: bold;
            margin-right: 10px;
            vertical-align: middle;
        }
        
        .logo-text {
            display: inline-block;
            font-size: 24pt;
            font-weight: bold;
            color: #1464BC;
            font-family: Arial, sans-serif;
            vertical-align: middle;
        }

        .header-text { display: table-cell; width: 70%; text-align: center; vertical-align: middle; }
        
        .clinic-name { font-size: 18pt; font-weight: bold; margin: 0; text-transform: uppercase; font-family: Arial, sans-serif; }
        .clinic-sub { font-size: 11pt; margin: 0; font-family: Arial, sans-serif; }
        .clinic-address { font-size: 10pt; margin: 0; font-family: Arial, sans-serif; }
        
        .title { text-align: center; font-size: 16pt; font-weight: bold; margin: 20px 0 40px 0; text-decoration: underline; }
        
        .rahasia-box { float: right; border: 2px solid #000; padding: 5px 15px; font-weight: bold; font-size: 14pt; font-family: Arial, sans-serif; margin-top: -60px;}
        
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
        .signature-box { display: inline-block; text-align: left; width: 300px; }
        .date-text { margin-bottom: 20px; text-align: left; }
        .signer-title { margin-bottom: 70px; text-align: center; }
        .signer-name { font-weight: bold; text-decoration: underline; margin-bottom: 5px; text-align: center; }
        .signer-license { margin: 0; font-size: 11pt; text-align: left; }
        
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-container">
            <div class="logo-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-top: 8px;"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" x2="9.01" y1="9" y2="9"></line><line x1="15" x2="15.01" y1="9" y2="9"></line></svg>
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
                <div class="signer-title">Psikolog,</div>
                <div class="signer-name">{{ $appointment->psychologist->user->name }}</div>
                <div class="signer-license">SIPP : {{ $appointment->psychologist->sipp ?? '..........................' }}</div>
                <div class="signer-license">SIPPK : {{ $appointment->psychologist->sippk ?? '..........................' }}</div>
            </div>
        </div>
    </div>
</body>
</html>

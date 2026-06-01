# SYSTEM.md — Dokumentasi Sistem Psikologku

> **Terakhir diperbarui:** 2026-06-01  
> File ini menjelaskan arsitektur dan struktur kode sistem, serta mencatat semua perubahan signifikan yang dilakukan selama development.

---

## 1. Gambaran Umum

**Psikologku** adalah platform konsultasi psikologi online yang menghubungkan pasien dengan psikolog profesional. Sistem ini mencakup:

- Autentikasi pengguna (email, Google OAuth)
- Manajemen profil pengguna dan psikolog
- Pencarian dan pemilihan psikolog
- Penjadwalan sesi konsultasi
- Pembayaran via Midtrans (Snap)
- Sesi chat real-time
- Rekam medis dan surat rujukan
- Sistem notifikasi
- Customer Service (laporan pengguna)
- Panel administrasi (Filament)

---

## 2. Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Backend Framework | Laravel | v13 |
| Frontend SPA | React + Inertia.js | React v19, Inertia v3 |
| CSS | Tailwind CSS | v4 |
| Admin Panel | Filament | v5 |
| Database | PostgreSQL | — |
| File Storage | Supabase Storage | — |
| Payment Gateway | Midtrans (Snap) | — |
| Auth Backend | Laravel Fortify | v1 |
| OAuth | Laravel Socialite | v5 |
| Route Typing | Laravel Wayfinder | v0 |
| Deployment | Railway | — |
| Testing | Pest PHP | v4 |

---

## 3. Struktur Direktori

```
psikologku/
├── app/
│   ├── Filament/              # Panel admin (Resources, Widgets, dll)
│   ├── Http/
│   │   ├── Controllers/       # Semua controller API & web
│   │   │   ├── Auth/          # SocialiteController, CompleteProfileController
│   │   │   ├── Settings/      # Password, Profile (Fortify settings)
│   │   │   ├── DashboardController.php
│   │   │   ├── PsychologistAppointmentController.php
│   │   │   ├── PsychologistRecordController.php
│   │   │   ├── PsychologistScheduleController.php
│   │   │   ├── ReferralLetterController.php
│   │   │   ├── ReportController.php
│   │   │   ├── SessionController.php
│   │   │   ├── TherapistController.php
│   │   │   ├── UserProfileController.php
│   │   │   ├── UserRecordController.php
│   │   │   ├── PaymentController.php
│   │   │   └── NotificationController.php
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php   # Shared props (auth, flash, dll)
│   ├── Models/
│   │   ├── User.php
│   │   ├── PsychologistProfile.php
│   │   ├── Appointment.php
│   │   ├── Schedule.php
│   │   ├── Transaction.php
│   │   ├── ReferralLetter.php
│   │   └── Report.php
│   ├── Notifications/         # Laravel Notifications (email/database)
│   └── Actions/Fortify/       # CreateNewUser, UpdateUserProfileInformation
│
├── database/
│   └── migrations/            # 28 migration files
│
├── resources/
│   └── js/
│       ├── app.tsx             # Entry point Inertia, default layout resolver
│       ├── pages/              # Semua halaman Inertia React
│       │   ├── welcome.tsx     # Landing page
│       │   ├── dashboard.tsx   # Dashboard user biasa
│       │   ├── therapists.tsx  # Daftar & detail psikolog
│       │   ├── sessions.tsx    # Chat session (shared user & psikolog)
│       │   ├── records.tsx     # Daftar rekam medis (user)
│       │   ├── record-detail.tsx
│       │   ├── payment.tsx
│       │   ├── notifications.tsx
│       │   ├── profile/
│       │   │   └── edit.tsx    # Edit profil user
│       │   ├── psychologist-dashboard.tsx
│       │   ├── psychologist-profile-setup.tsx
│       │   ├── psychologist-appointments.tsx
│       │   ├── psychologist-schedules.tsx
│       │   ├── psychologist-records.tsx
│       │   ├── customer-service/   # CS index, create, show
│       │   ├── auth/           # Login, register, dll (Fortify views)
│       │   └── settings/       # Password, 2FA settings
│       ├── components/
│       │   ├── initials-avatar.tsx       # Avatar dengan foto / inisial
│       │   ├── notification-dropdown.tsx # Dropdown notifikasi navbar
│       │   ├── record-form-modal.tsx     # Modal isi rekam medis
│       │   ├── referral-letter-modal.tsx # Modal surat rujukan
│       │   ├── mini-footer.tsx           # Footer mini dashboard
│       │   └── ui/                       # Spinner, dll
│       ├── layouts/            # AppLayout (dengan sidebar — Settings pages)
│       ├── lib/
│       │   └── supabase.ts     # Supabase client (Storage)
│       ├── routes/             # Wayfinder generated route functions
│       └── actions/            # Wayfinder generated action functions
│
├── routes/
│   ├── web.php                 # Semua route utama
│   └── settings.php            # Route Fortify settings
│
└── SYSTEM.md                   # File ini
```

---

## 4. Arsitektur Data (Database Schema)

### Tabel Utama

#### `users`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint | PK |
| name | string | Nama lengkap |
| email | string | Email (tidak bisa diubah user) |
| password | hashed | — |
| phone | string | Nomor telepon |
| birthdate | date | Tanggal lahir |
| birthplace | string | Tempat lahir |
| gender | string | Jenis kelamin |
| address | text | Alamat |
| photo_url | string | URL foto (Supabase) |
| google_id | string | OAuth Google ID |
| role | via Spatie | `user` / `psychologist` / `admin` |

#### `psychologist_profiles`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | bigint | PK |
| user_id | FK | Relasi ke users |
| profession | string | "Psikolog Klinis" / "Psikiater" |
| specialization | json | Array spesialisasi |
| price | decimal | Tarif per sesi |
| is_online | boolean | Status tersedia |
| photo_url | string | URL foto (Supabase) |
| str_number | string | Nomor STR/STRPK |
| sipp | string | Nomor SIPP |
| sippk | string | Nomor SIPPK |
| signature_path | string | URL tanda tangan (Supabase) |

#### `schedules`
| Kolom | Keterangan |
|---|---|
| psychologist_id | FK ke psychologist_profiles |
| day_of_week | Senin–Minggu |
| start_time / end_time | Jam praktek |
| is_active | Status aktif |

#### `appointments`
| Kolom | Keterangan |
|---|---|
| user_id | FK pasien |
| psychologist_id | FK psychologist_profiles |
| schedule_id | FK jadwal |
| appointment_date | Tanggal sesi |
| start_time / end_time | Waktu |
| status | upcoming / ongoing / completed / cancelled |
| record_summary | Catatan psikolog |
| diagnostic_focus | Diagnosis |
| patient_state | json array |
| structured_recommendations | json |
| rating / review | Ulasan pasien |

#### `transactions`
| Kolom | Keterangan |
|---|---|
| appointment_id | FK |
| order_id | Midtrans order ID |
| gross_amount | Nominal |
| status | pending / paid / failed |
| snap_token | Midtrans Snap token |

#### `reports`
| Kolom | Keterangan |
|---|---|
| user_id | FK pelapor |
| title | Judul laporan |
| description | Isi laporan |
| image_url | Bukti foto |
| status | open / resolved |
| admin_reply | Balasan admin |

---

## 5. Alur Bisnis Utama

### Alur Konsultasi
```
User pilih psikolog (therapists)
  → Pilih jadwal & tanggal
  → Bayar via Midtrans
  → Appointment terbuat (status: upcoming)
  → Psikolog mulai sesi (status: ongoing)
  → Sesi berakhir, psikolog selesaikan (status: completed)
  → Psikolog isi rekam medis
  → User beri ulasan & unduh rekam medis PDF
```

### Alur Upload Foto
```
User/Psikolog pilih foto di browser
  → Upload langsung ke Supabase Storage (bucket: avatars)
  → Dapat public URL
  → Kirim URL ke backend Laravel
  → Backend simpan URL ke database
```

---

## 6. Konvensi Layout Halaman

Halaman dibagi dua kategori berdasarkan layout system:

| Kategori | Layout | Cara |
|---|---|---|
| Halaman `auth/` dan `settings/` | AppLayout (sidebar) | Default dari `app.tsx` |
| Semua halaman user & psikolog utama | **Custom navbar fullscreen** | `PageName.layout = {}` menonaktifkan AppLayout |

Halaman dengan custom navbar sendiri (via `layout = {}`):
- `dashboard.tsx`, `therapists.tsx`, `sessions.tsx`, `records.tsx`, `record-detail.tsx`
- `psychologist-dashboard.tsx`, `psychologist-appointments.tsx`, `psychologist-schedules.tsx`, `psychologist-records.tsx`
- `psychologist-profile-setup.tsx`, `profile/edit.tsx`
- `welcome.tsx`, `payment.tsx`, `notifications.tsx`, `customer-service/*`

---

## 7. Shared Inertia Props (`HandleInertiaRequests.php`)

Props yang tersedia di semua halaman via `usePage().props`:

```ts
auth: {
  user: {
    // Semua kolom users (kecuali password)
    photo_url: string | null,  // Supabase URL (user) atau psychologistProfile.photo_url (psikolog)
    notifications: Notification[]  // 5 unread terbaru (bukan Filament)
  }
}
flash: { success, error, message }
sidebarOpen: boolean
```

---

## 8. Environment Variables Penting

| Key | Keterangan |
|---|---|
| `APP_URL` | URL aplikasi |
| `DB_*` | PostgreSQL connection |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `MIDTRANS_SERVER_KEY` | Midtrans server key |
| `MIDTRANS_CLIENT_KEY` | Midtrans client key |
| `MIDTRANS_IS_PRODUCTION` | `true` / `false` |
| `GOOGLE_CLIENT_ID` | OAuth Google |
| `GOOGLE_CLIENT_SECRET` | OAuth Google |

---

## 9. Changelog

Semua perubahan dicatat di sini dengan format `[YYYY-MM-DD] Jenis: Deskripsi`.

---

### [2026-06-01] — Fix Photo URL & Customer Service Storage

#### fix: Profile picture user tidak tampil setelah diubah
- **File berubah:** `app/Http/Controllers/UserProfileController.php`
- **Masalah:** Validasi `'url'` di Laravel menolak URL Supabase dalam beberapa kasus. Selain itu, jika user tidak upload foto baru, path lokal lama (`/storage/...`) dikirim sebagai `photo_url` dan gagal validasi, menyebabkan `photo_url` tidak tersimpan sama sekali.
- **Solusi:** Ganti validasi `'url'` ke `'string'`. Tambahkan pengecekan `str_starts_with($photoUrl, 'http')` — hanya update `photo_url` jika URL baru adalah Supabase URL, bukan path lokal.

#### fix: Foto laporan Customer Service disimpan ke Supabase (bukan local disk)
- **File berubah:** `resources/js/pages/customer-service/create.tsx`, `app/Http/Controllers/ReportController.php`, `app/Models/Report.php`, `resources/js/pages/customer-service/show.tsx`
- **Migrasi baru:** `add_image_url_to_reports_table` — tambah kolom `image_url` nullable ke tabel `reports`
- **Masalah:** Foto bukti laporan CS disimpan ke disk lokal Railway (ephemeral) — hilang saat restart/redeploy.
- **Solusi:** Upload foto dari browser langsung ke Supabase Storage (bucket `avatars`, folder `reports/`). Backend terima URL string di kolom `image_url`. Backward-compatible: halaman show mendukung `image_url` (baru) dengan fallback ke `photo_path` (lama).
- **UX tambahan:** Spinner saat upload, tombol kirim disabled selama upload berlangsung.

---

### [2026-06-01] — Sesi Development Terdahulu


#### fix: Upload foto user ke Supabase (bukan local disk)
- **File berubah:** `resources/js/pages/profile/edit.tsx`, `app/Http/Controllers/UserProfileController.php`
- **Masalah:** Foto user disimpan ke local disk Railway yang bersifat ephemeral — hilang setiap restart/redeploy.
- **Solusi:** Upload dari browser langsung ke Supabase Storage (bucket `avatars`), backend hanya menyimpan URL string.
- **Detail:** Tambah spinner saat upload berlangsung, disable input foto saat proses upload.

#### fix: Tampilkan foto pasien di halaman psikolog (Appointments, Sessions, Records)
- **File berubah:** `PsychologistAppointmentController.php`, `PsychologistRecordController.php`, `SessionController.php`, `psychologist-appointments.tsx`, `psychologist-records.tsx`
- **Masalah:** Query `with(['user:id,name,email'])` tidak menyertakan `photo_url`, sehingga avatar pasien selalu placeholder.
- **Solusi:** Tambah `photo_url` ke semua eager load, expose sebagai `patient_photo_url` di response, dan pass ke `<InitialsAvatar photoUrl=...>`.

#### fix: Tampilkan foto user biasa di navbar avatar
- **File berubah:** `app/Http/Middleware/HandleInertiaRequests.php`
- **Masalah:** `photo_url` di shared props selalu `null` untuk user non-psikolog.
- **Solusi:** Ganti logika ternary — untuk psikolog ambil dari `psychologistProfile.photo_url`, untuk user biasa ambil dari `users.photo_url`.

#### fix: Ganti Bell hardcoded dengan NotificationDropdown di psychologist-records
- **File berubah:** `resources/js/pages/psychologist-records.tsx`
- **Masalah:** Notifikasi bell di halaman records psikolog adalah komponen statis, tidak fungsional.
- **Solusi:** Ganti dengan `<NotificationDropdown />` yang konsisten dengan halaman lain.

#### feat: Redesign halaman edit profil user (layout = {} + custom navbar)
- **File berubah:** `resources/js/pages/profile/edit.tsx`
- **Masalah:** Halaman edit profil user menggunakan AppLayout (sidebar), tidak konsisten dengan tampilan psikolog.
- **Solusi:** Tambahkan `EditProfile.layout = {}` untuk menonaktifkan AppLayout, tambahkan custom navbar fullscreen identik dengan psikolog.

#### fix: Hapus header ganda di halaman edit profil user
- **File berubah:** `resources/js/pages/profile/edit.tsx`
- **Masalah:** Terdapat dua navbar yang tampil sekaligus karena custom `<nav>` ditambahkan sementara AppLayout masih aktif.
- **Solusi:** Hapus komponen `<nav>` manual (sebelum `layout = {}` diterapkan).

#### feat: Implementasi fitur edit profil user (upload foto + data diri)
- **File berubah:** `resources/js/pages/profile/edit.tsx`, `app/Http/Controllers/UserProfileController.php`, `routes/web.php`
- **Fitur baru:** User dapat mengubah nama, telepon, tanggal lahir, tempat lahir, jenis kelamin, alamat, dan foto profil. Email tidak bisa diubah.
- **Rute:** `GET/POST /user-profile` → `UserProfileController`.

---

### [2026-05-31] — Customer Service & Notifikasi

#### feat: Sistem Customer Service (Laporan Pengguna)
- **File baru:** `app/Models/Report.php`, `app/Http/Controllers/ReportController.php`, `resources/js/pages/customer-service/`
- **Fitur:** User bisa membuat laporan ke admin, admin bisa membalas via Filament panel.
- **Notifikasi:** Laporan baru → notifikasi ke admin. Admin balas → notifikasi ke user.

#### feat: Admin bisa membalas laporan di panel Filament
- **File berubah:** `app/Filament/Resources/Reports/`
- **Migrasi baru:** `add_admin_reply_to_reports_table`

---

### [2026-05-30] — Rekam Medis & Surat Rujukan

#### feat: Sistem rekam medis terstruktur
- **File baru:** `components/record-form-modal.tsx`
- **Fitur:** Psikolog mengisi rekam medis dengan struktur: ringkasan, diagnostic focus, kondisi pasien (tags), rekomendasi terstruktur.
- **Migrasi:** `add_detailed_record_fields_to_appointments_table`

#### feat: Surat rujukan dengan tanda tangan digital
- **File baru:** `app/Http/Controllers/ReferralLetterController.php`, `resources/js/components/referral-letter-modal.tsx`
- **Fitur:** Generate surat rujukan PDF dengan tanda tangan psikolog (dari Supabase).
- **Migrasi:** `create_referral_letters_table`, `add_sipp_and_sippk_to_psychologist_profiles_table`

#### feat: Download rekam medis sebagai PDF
- **File berubah:** `app/Http/Controllers/UserRecordController.php`
- **Fitur:** User bisa download rekam medisnya sebagai PDF.

---

### [2026-05-29] — Manajemen Role & Profil Psikolog

#### feat: Auto-hapus PsychologistProfile saat role diubah dari psikolog ke user
- **File berubah:** `app/Filament/Resources/` (lifecycle hooks atau observer)
- **Fitur:** Mencegah orphaned psychologist_profiles saat admin mencabut role psikolog.

---

### [2026-05-28] — Spesialisasi & Penilaian

#### feat: Spesialisasi psikolog diubah dari string ke array (multi-select)
- **File berubah:** `app/Models/PsychologistProfile.php`, `psychologist-profile-setup.tsx`, `therapists.tsx`
- **Migrasi:** `change_specialization_to_json_on_psychologist_profiles_table`
- **Sekarang:** Checkbox multi-select dari 12 kategori spesialisasi.

#### feat: Rating dan ulasan pasien setelah sesi
- **Migrasi:** `add_rating_and_review_to_appointments_table`

---

### [2026-05-24] — Rekam Medis Awal & PDF

#### feat: Rekam medis dasar (ringkasan + rekomendasi)
- **Migrasi:** `add_record_fields_to_appointments_table`

---

### [2026-05-20] — Foto Psikolog

#### feat: Upload foto profil psikolog ke Supabase
- **File berubah:** `psychologist-profile-setup.tsx`, `DashboardController.php`
- **Migrasi:** `add_photo_url_to_psychologist_profiles_table`

---

### [2026-05-16] — Core Booking & Session

#### feat: Sistem penjadwalan dan booking konsultasi
- **Migrasi:** `create_schedules_table`, `create_appointments_table`, `add_start_and_end_time_to_appointments_table`
- **File baru:** `PsychologistScheduleController.php`, `PsychologistAppointmentController.php`, `SessionController.php`
- **Fitur:** Psikolog buat jadwal, user booking, sesi chat real-time dengan Supabase.

---

### [2026-05-15] — Pembayaran & Profil Psikolog

#### feat: Integrasi Midtrans Snap
- **File baru:** `PaymentController.php`
- **Migrasi:** `create_transactions_table`

#### feat: Profil psikolog dasar
- **Migrasi:** `create_psychologist_profiles_table`

---

### [2026-05-11] — Data Profil User Dasar

#### feat: Tambah phone, birthdate ke users
- **Migrasi:** `add_phone_and_birthdate_to_users_table`

---

### [2026-05-07] — Google OAuth

#### feat: Login dengan Google
- **File baru:** `app/Http/Controllers/Auth/SocialiteController.php`
- **Migrasi:** `add_google_id_to_users_table`

---

## 10. Panduan Menambah Perubahan ke Changelog

Setiap kali melakukan perubahan signifikan, tambahkan entri di bagian **Changelog** dengan format:

```markdown
#### [jenis]: [deskripsi singkat]
- **File berubah:** `path/ke/file.php`, `path/ke/file.tsx`
- **Masalah:** Apa yang salah atau apa yang ingin ditambahkan
- **Solusi:** Bagaimana masalah diselesaikan
- **Detail tambahan (opsional)**
```

**Jenis perubahan:**
- `feat` — Fitur baru
- `fix` — Perbaikan bug
- `ui` — Perubahan tampilan
- `refactor` — Refaktor kode tanpa perubahan fungsionalitas
- `perf` — Optimasi performa
- `docs` — Perubahan dokumentasi

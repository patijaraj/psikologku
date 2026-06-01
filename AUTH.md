# Authentication Features Checklist (AUTH.md)

Dokumen ini berisi daftar fitur autentikasi yang telah diimplementasikan di platform Psikologku. Sistem autentikasi ini menggunakan **Laravel Fortify** (Headless Auth), **Laravel Socialite** (OAuth), dan **Inertia.js** (React) untuk *frontend*.

## 1. Login & Registration
- [x] **Email & Password Login**: Autentikasi reguler menggunakan kombinasi email dan password (`login.tsx`).
- [x] **User Registration**: Pendaftaran akun baru bagi *user* reguler maupun *psikolog* (`register.tsx`).
- [x] **Google Social Login (OAuth)**: Login / Register cepat menggunakan akun Google (via Laravel Socialite - `SocialiteController.php`).
- [x] **Profile Completion Flow**: Penangkapan data lanjutan setelah registrasi awal (`complete-profile.tsx`), krusial bagi Psikolog untuk mengisi data spesialisasi, tarif, dan STR.
- [x] **Logout**: Mengakhiri sesi pengguna dari segala halaman dengan aman.

## 2. Password Management
- [x] **Forgot Password**: Pengguna dapat meminta link reset password yang dikirimkan ke email (`forgot-password.tsx`).
- [x] **Reset Password**: Form validasi dan pengaturan ulang kata sandi (`reset-password.tsx`).
- [x] **Confirm Password**: Form konfirmasi ulang kata sandi sebelum pengguna bisa mengakses halaman atau melakukan aksi yang bersifat sensitif (`confirm-password.tsx`).
- [x] **Update Password**: Pengguna dapat memperbarui kata sandi lama menjadi yang baru dari dalam halaman *Settings* (bawaan Fortify).

## 3. Account Security & Verification
- [x] **Email Verification**: Mewajibkan pengguna melakukan konfirmasi kepemilikan email sebelum mengakses rute ber-middleware `verified` (`verify-email.tsx`).
- [x] **Two-Factor Authentication (2FA)**:
  - [x] Autentikasi Dua Langkah (TOTP) menggunakan aplikasi *Authenticator* (seperti Google Authenticator).
  - [x] Tantangan login kode 2FA / Recovery Code setelah sukses memvalidasi password (`two-factor-challenge.tsx`).
- [x] **CSRF Protection**: Token validasi sesi form (*Cross-Site Request Forgery*) aktif pada tiap request mutasi data.

## 4. Frontend & UX Status
- [x] Form Validasi *Client-Side* & *Server-Side* yang menangkap *errors bag* Laravel dan menampilkannya di *UI* React.
- [x] Routing *SPA* dengan Inertia.js yang berjalan halus tanpa ada `page reload` penuh saat berpindah navigasi *auth*.
- [x] Redireksi mulus: jika user belum verifikasi email / melengkapi profil, maka selalu di-*redirect* secara paksa ke halaman yang berwenang.

---
**Catatan:**  
Sistem `fortify` dapat dimodifikasi fitur-fitur aktifnya kapan saja melalui file konfigurasi `config/fortify.php`.

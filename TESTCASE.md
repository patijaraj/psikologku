# Laporan Test Case PsikologKu

Dokumen ini berisi hasil pengujian (testing) dari berbagai modul pada platform PsikologKu, serta tambahan test case untuk fitur-fitur lain yang belum tercakup sebelumnya.

## 1. Modul Registrasi (Registration)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 1 | TC_REG_001 | Registrasi berhasil dengan data valid | Nama: Kamil, Email: kamil@gmail.com, HP: 0899876543210, Password: Kamil1234, Konfirmasi: Kamil1234, Tgl Lahir: 2001-01-01 | Sistem mengirim OTP ke email dan menampilkan halaman verifikasi. | Tidak terdapat OTP namun berhasil masuk ke dashboard | Fail | Tidak ada OTP |
| 2 | TC_REG_002 | Registrasi gagal jika email sudah terdaftar dan terverifikasi | Email: kamil@gmail.com (sudah terdaftar) | Tampil pesan error: 'Email sudah digunakan.' | The email has already been taken | Pass | |
| 3 | TC_REG_003 | Registrasi gagal jika password tidak memenuhi syarat | Password: far123 | Tampil pesan error: 'Password minimal 8 karakter'. | Use at least 8 characters | Pass | |
| 4 | TC_REG_004 | Registrasi gagal jika password tidak mengandung huruf besar | Password: farhan123 | Tampil pesan error: 'Password harus mengandung huruf besar'. | Bisa masuk ke halaman dashboard | Fail | Pesan tidak tampil |
| 5 | TC_REG_005 | Registrasi gagal jika password dan konfirmasi tidak cocok | Password: Bud1234, Konfirmasi: Budi1235 | Tampil pesan error: 'Password dan konfirmasi password tidak cocok'. | The email has already been taken | Fail | Tidak terdapat konfirmasi |
| 6 | TC_REG_006 | Registrasi gagal jika nomor HP sudah digunakan | HP: 089876543210 (sudah terdaftar) | Tampil pesan error: 'Nomor HP sudah digunakan'. | Bisa masuk ke halaman dashboars | Fail | Pesan tidak tampil |
| 7 | TC_REG_008 | Menguji validasi input karakter khusus dan angka pada field Nama | Nama: 1&2abc, Email: abc@gmail.com, Password: Abcde123 | Tampil pesan error validasi: "Nama hanya boleh berisi huruf". | Bisa masuk ke dashboard | Fail | Pesan tidak tampil |
| 8 | TC_REG_009 | Menguji batas maksimal karakter pada field Password | Password: (300 karakter huruf 'A') | Tampil pesan error validasi: "Password terlalu panjang maksimal 255 karakter". | - | - | - |
| 9 | TC_REG_010 | Menguji format penulisan email yang tidak lengkap | Email: kamilgmail.com | Tampil pesan error: "Format email tidak valid". | Enter an email address | Pass | |

## 2. Modul Login (Authentication)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 10 | TC_LOGIN_001 | Login berhasil dengan kredensial valid | Email: kamil@gmail.com, Password: Kamil1234 | Login berhasil, token JWT dikembalikan dan pengguna diarahkan ke dashboard. | Berhasil masuk ke dashboard | Pass | |
| 11 | TC_LOGIN_002 | Login gagal dengan password salah | Email: budi@gmail.com, Password: SalahPass1 | Tampil pesan error: 'Email atau password salah'. | The email has already been taken | Fail | Pesan tidak tampil |
| 12 | TC_LOGIN_003 | Login gagal akun belum terverifikasi | Email: baru@gmail.com (belum verifikasi) | Tampil pesan: 'Akun belum diverifikasi. Cek email Anda.' beserta flag needsVerification. | These credentials do not match our records | Pass | |
| 13 | TC_LOGIN_004 | Login gagal akun dinonaktifkan | Email: nonaktif@gmail.com | Tampil pesan: 'Akun Anda telah dinonaktifkan. Hubungi admin'. | - | Fail | Pesan tidak tampil |
| 14 | TC_LOGIN_005 | Login terkunci setelah 10 percobaan gagal | IP yang sama, password salah berulang | Tampil pesan: 'Terlalu banyak percobaan login. Coba lagi dalam N menit'. | These credentials do not match our records | Fail | Pesan tidak tampil |
| 15 | TC_LOGIN_006 | Menguji case-insensitivity (huruf besar/kecil) pada field Email | Email: KAMIL@GMAIL.COM, Password: Kamil1234 | Login tetap berhasil karena email seharusnya tidak sensitif terhadap huruf besar/kecil. | Berhasil masuk ke dashboard | Pass | |
| 16 | TC_LOGIN_007 | Menguji keamanan form login terhadap SQL Injection | Email: ' OR 1=1 --, Password: Sembarang | Tampil pesan error "Email atau password salah". Sistem tidak boleh memproses query. | Enter an email address | Pass | |
| 17 | TC_LOGIN_008 | Menguji batasan limit percobaan login(Rate Limiting) | Email: budi@gmail.com, Password: SalahPass | Setelah 10 percobaan, sistem memblokir IP dan menampilkan "Terlalu banyak percobaan". | These credentials do not match our records | Fail | |

## 3. Modul Manajemen User & Role (User & Role Management)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 18 | TC_USER_001 | Menguji pembuatan user baru dengan data valid | Nama: Budi Santoso, Email: budi@mail.com | Sistem menampilkan pesan "User Berhasil Dibuat" dan nama muncul di daftar. | The email has already been taken | Pass | |
| 19 | TC_USER_002 | Menguji pembuatan user dengan nama kosong | Nama: (Kosong), Email: budi@mail.com | Sistem menampilkan error "Nama user tidak boleh kosong". | Fill out this field | Pass | |
| 20 | TC_ROLE_001 | Menguji penetapan role (Assign Role) ke user | Role: Administrator / Editor | Role user berhasil diperbarui dan tersimpan di database. | Role berubah | Pass | |
| 21 | TC_ROLE_002 | Menguji perubahan role dari Admin ke User | Role Baru: User | Hak akses user berubah secara otomatis sesuai role baru. | Role berhasil berubah | Pass | |
| 22 | TC_MGMT_001 | Menguji penghapusan user dari sistem | User ID: 001 | User terhapus dari daftar dan tidak bisa login kembali. | These credentials do not match our records | Pass | |

## 4. Modul Booking & Jadwal (Booking & Schedule)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 23 | TC_BOOK_001 | Booking berhasil dengan jadwal tersedia | Psikolog: Dr. Andi, Tgl: 2026-05-20, Jam: 10:00 | Sistem membuat record booking dengan status 'pending' dan mengarahkan ke pembayaran. | Bisa tearahkan ke pembayaran | Pass | |
| 24 | TC_BOOK_002 | Gagal booking pada jadwal yang sudah terisi | Tgl: 2026-05-20, Jam: 10:00 (Terisi) | Tampil pesan error: "Jadwal sudah tidak tersedia". | Jadwal tidak bisa diklik | Pass | |
| 25 | TC_BOOK_003 | Validasi role saat booking | User Role: Psychologist | Sistem menolak akses karena psikolog tidak bisa membooking sesi. | - | Pass | |
| 26 | TC_SCH_001 | Mengatur jadwal praktik | Hari: Senin, Jam: 09:00 - 12:00 | Jadwal muncul di sisi pasien saat akan melakukan booking. | - | Pass | |
| 27 | TC_SCH_002 | Menghapus jadwal yang sudah dibooking | Status: Booked | Sistem memberikan peringatan: "Jadwal tidak bisa dihapus karena sudah ada janji temu". | - | Fail | |

## 5. Modul Chat & Sesi Konsultasi (Chat)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 28 | TC_CHAT_001 | Mengirim pesan berhasil | Pesan: "Halo Dokter" | Pesan muncul di layar secara real-time dan tersimpan di tabel chats. | Pesan terkirim | Pass | |
| 29 | TC_CHAT_002 | Keamanan akses chat (RLS) | Booking ID: 99 (Milik orang lain) | Sistem menampilkan error 403 atau "Unauthorized". | - | Pass | |
| 30 | TC_CHAT_003 | Indikator pesan masuk | Pesan: "Silakan ceritakan keluhannya" | User menerima notifikasi/update layar tanpa perlu refresh halaman. | - | Pass | |

## 6. Modul Rekam Medis (Medical Records)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 31 | TC_MED_001 | Psikolog membuat laporan konsultasi | Diagnosa: Kecemasan Ringan, Catatan: Perlu meditasi | Laporan tersimpan dan terhubung ke medical_records pasien. | - | Pass | |
| 32 | TC_MED_002 | User melihat riwayat medis | User ID: 001 | Sistem menampilkan daftar catatan medis yang hanya milik user tersebut. | - | Pass | |
| 33 | TC_MED_003 | Hak akses edit laporan | Role: Admin | Sistem melarang pengeditan karena hanya Psikolog yang boleh mengisi data medis. | - | Pass | |

## 7. Modul Pembayaran (Payment)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 34 | TC_PAY_001 | Pembayaran berhasil via Gateway | Metode: Virtual Account / E-Wallet | Status booking berubah otomatis menjadi 'confirmed'. | - | Pass | |
| 35 | TC_PAY_002 | Pembayaran kadaluwarsa (Expired) | Waktu: > 24 Jam | Status pembayaran berubah menjadi 'expired' dan jadwal booking otomatis dilepas (tersedia kembali). | - | Pass | |
| 36 | TC_PAY_003 | Verifikasi jumlah bayar | Amount: Rp 50.000 (Seharusnya 150rb) | Sistem menolak verifikasi otomatis dan status tetap 'pending'. | - | Pass | |

## 8. Modul Rujukan (Referral)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 37 | TC_REF_001 | Membuat surat rujukan | Tujuan: Rumah Sakit Jiwa / Spesialis Saraf | Sistem membuat file PDF rujukan yang bisa diunduh oleh pasien. | - | Pass | |
| 38 | TC_REF_002 | Keamanan akses rujukan | Referral ID: 005 | Tampil pesan error "Access Denied" atau 403. | - | Pass | |

## 9. Modul Notifikasi & Sistem (System & Notification)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 39 | TC_SYS_001 | Notifikasi email/WA | Event: Payment Success | Sistem otomatis mengirimkan email konfirmasi janji temu kepada User dan Psikolog. | Fail belum direalisasikan sekarang | Fail | |

<br><br>

---

# TAMBAHAN TEST CASE (Fitur yang Tidak Ada Pada Daftar Sebelumnya)

Berdasarkan fitur dan arsitektur sistem PsikologKu, berikut adalah test case tambahan yang direkomendasikan untuk menutupi *edge-cases* dan modul yang belum ter-cover pada daftar di atas:

## 10. Modul Customer Service / Pelaporan (CS & Reporting)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 40 | TC_CS_001 | Pasien membuat laporan/keluhan ke CS | Judul: "Error Pembayaran", Deskripsi: "Saldo terpotong tapi pending" | Laporan tersimpan di database dan notifikasi spesifik dikirimkan hanya kepada Admin. | - | Belum Ditest | Sesuai implementasi notifikasi CS |
| 41 | TC_CS_002 | Admin membalas laporan CS | Pesan Balasan: "Sedang kami periksa..." | Status laporan berubah (misal menjadi In Progress/Resolved) dan user terkait bisa melihat balasan tersebut di UI mereka. | - | Belum Ditest | - |

## 11. Modul Manajemen Profil Psikolog (Psychologist Profile)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 42 | TC_PROF_001 | Psikolog memperbarui data spesialisasi | Spesialisasi Baru: Depresi, Trauma, Parenting | Data profil ter-update dengan aman dan spesialisasi baru langsung muncul di halaman Landing Page/Pencarian. | - | Belum Ditest | Menguji relasi tabel profile |
| 43 | TC_PROF_002 | User umum mencoba mengakses URL edit profil psikolog | User Role: Patient, Action: Akses `/psychologist/profile/edit` | Sistem menolak akses dengan error 403 (Unauthorized) atau re-direct ke home. | - | Belum Ditest | Menguji middleware otorisasi |

## 12. Modul Lupa Password (Password Reset)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 44 | TC_PWD_001 | Mengirim link reset password ke email terdaftar | Email: kamil@gmail.com | Sistem mengirimkan email berisi tautan reset berbatas waktu (signed URL). | - | Belum Ditest | - |
| 45 | TC_PWD_002 | Reset password menggunakan token kedaluwarsa/invalid | Token: `xyz123Expired` | Tampil pesan error validasi: "Token tidak valid atau sudah kedaluwarsa". | - | Belum Ditest | Keamanan otentikasi |

## 13. Modul Pencarian & Filter (Search & Filter)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 46 | TC_SRC_001 | Pencarian psikolog berdasarkan keyword/nama | Keyword: "Andi" | Menampilkan hanya daftar psikolog yang namanya mengandung unsur "Andi". | - | Belum Ditest | - |
| 47 | TC_SRC_002 | Memfilter psikolog berdasarkan Kategori/Spesialisasi | Filter Category: "Stress" | Menampilkan hanya daftar psikolog yang memiliki spesialisasi Stress. | - | Belum Ditest | - |

## 14. Modul Ulasan & Rating (Review)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 48 | TC_REV_001 | Pasien memberikan ulasan pada sesi yang telah selesai (Completed) | Bintang: 5, Komentar: "Sangat membantu" | Ulasan berhasil disimpan dan rata-rata rating psikolog ter-update secara otomatis. | - | Belum Ditest | - |
| 49 | TC_REV_002 | Validasi percobaan ulasan pada sesi yang belum selesai (Pending) | Action: Submit Ulasan pada Booking ID berstatus Pending | Sistem menolak dan tidak menampilkan form ulasan (tombol ulasan disembunyikan/disabled). | - | Belum Ditest | Mencegah ulasan spam |

## 15. Keamanan Dokumen (PDF Generation)
| No | Test Case | Deskripsi | Input | Output yang Diharapkan | Actual Output | Status | Catatan |
|---|---|---|---|---|---|---|---|
| 50 | TC_DOC_001 | Menguji ketersediaan field Lisensi Profesi (STR/SIP) pada PDF Rujukan | Action: Generate PDF Rujukan | PDF sukses di-generate lengkap dengan nama Psikolog beserta gelar dan nomor izin praktik yang relevan. | - | Belum Ditest | Validasi standar medis |
| 51 | TC_DOC_002 | Menguji render digital signature pada PDF Rujukan | Image file format: Base64/PNG (Signature) | Signature sukses ter-render dan tidak pecah (layout stabil) pada dokumen final. | - | Belum Ditest | - |

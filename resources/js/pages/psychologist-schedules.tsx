import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Calendar,
    Clock,
    LogOut,
    Menu,
    MessageSquare,
    Plus,
    Settings,
    Smile,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';

type Schedule = {
    id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
};

type PsychologistSchedulesProps = {
    schedules: Schedule[];
    flash?: {
        success?: string;
    };
    errors?: any;
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Schedules', path: '/psychologist/schedules', active: true },
    {
        label: 'Appointments',
        path: '/psychologist/appointments',
        active: false,
    },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Records', path: '#', active: false },
];

const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

export default function PsychologistSchedules({
    schedules = [],
    flash,
    errors,
}: PsychologistSchedulesProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState({
        day_of_week: 'Senin',
        start_time: '09:00',
        end_time: '17:00',
    });

    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Psikolog';
    const userEmail = auth.user?.email ?? 'psikolog@example.com';

    const handleLogout = () => {
        router.flushAll();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/psychologist/schedules', form, {
            preserveScroll: true,
            onSuccess: () => {
                setIsAdding(false);
                setForm({
                    day_of_week: 'Senin',
                    start_time: '09:00',
                    end_time: '17:00',
                });
            },
        });
    };

    const toggleActive = (schedule: Schedule) => {
        router.patch(
            `/psychologist/schedules/${schedule.id}`,
            {
                is_active: !schedule.is_active,
            },
            { preserveScroll: true },
        );
    };

    const deleteSchedule = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
            router.delete(`/psychologist/schedules/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Manajemen Jadwal Psikolog" />

            <nav className="sticky top-0 z-50 border-b border-[#e2e4e6] bg-white">
                <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-8 lg:gap-16">
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-2 no-underline"
                        >
                            <div className="flex size-8 items-center justify-center rounded-xl bg-[#1464BC] text-white shadow-sm shadow-blue-900/20">
                                <Smile className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-[#1464BC]">
                                Psikologku
                            </span>
                        </Link>

                        <div className="hidden items-center gap-8 md:flex">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.path}
                                    className={`relative text-[15px] font-semibold transition-colors ${
                                        item.active
                                            ? 'text-[#1464BC]'
                                            : 'text-[#717783] hover:text-[#191c1e]'
                                    }`}
                                >
                                    {item.label}
                                    {item.active && (
                                        <span className="absolute right-0 -bottom-[25px] left-0 h-[3px] rounded-t-full bg-[#1464BC]" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="relative">
                            <button
                                type="button"
                                aria-label="Profil"
                                aria-expanded={isUserMenuOpen}
                                className={`flex shrink-0 cursor-pointer items-center rounded-full border-none bg-transparent p-1 transition-all ${
                                    isUserMenuOpen
                                        ? 'ring-2 ring-[#1464BC]/20'
                                        : 'hover:ring-2 hover:ring-[#e2e4e6]'
                                }`}
                                onClick={() => {
                                    setIsUserMenuOpen(!isUserMenuOpen);
                                    setIsMobileMenuOpen(false);
                                }}
                            >
                                <InitialsAvatar
                                    name={userName}
                                    photoUrl={(auth.user as any)?.photo_url}
                                    className="size-9"
                                />
                            </button>

                            {isUserMenuOpen && (
                                <>
                                    <button
                                        type="button"
                                        aria-label="Tutup menu profil"
                                        className="fixed inset-0 z-40 cursor-default border-none bg-transparent"
                                        onClick={() => setIsUserMenuOpen(false)}
                                    />
                                    <div className="absolute top-[52px] right-0 z-50 w-[260px] overflow-hidden rounded-3xl border border-[#e2e4e6] bg-white p-2 shadow-[0px_20px_48px_-18px_rgba(25,28,30,0.35)]">
                                        <div className="flex items-center gap-3 rounded-2xl bg-[#f7f9fb] p-3">
                                            <InitialsAvatar
                                                name={userName}
                                                photoUrl={(auth.user as any)?.photo_url}
                                                className="size-11 text-base"
                                            />
                                            <div className="min-w-0">
                                                <p className="m-0 truncate text-sm font-bold text-[#191c1e]">
                                                    {userName}
                                                </p>
                                                <p className="m-0 mt-0.5 truncate text-xs font-medium text-[#717783]">
                                                    {userEmail}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="my-2 h-px bg-[#f2f4f6]" />

                                        <Link
                                            href="/psychologist-profile"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#f7f9fb]"
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                                                <Settings className="h-5 w-5" />
                                            </span>
                                            Profile
                                        </Link>

                                        <Link
                                            href={logout()}
                                            as="button"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#b02a2a] transition-colors hover:bg-[#feecec]"
                                            onClick={handleLogout}
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#feecec] text-[#b02a2a]">
                                                <LogOut className="h-5 w-5" />
                                            </span>
                                            Log out
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                        <button
                            type="button"
                            aria-label="Buka menu"
                            className="cursor-pointer border-none bg-transparent p-1 text-[#717783] md:hidden"
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="absolute top-[72px] right-0 left-0 flex flex-col gap-2 border-b border-[#e2e4e6] bg-white p-4 shadow-lg md:hidden">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.path}
                                className={`rounded-xl p-3 text-[15px] font-semibold ${
                                    item.active
                                        ? 'bg-[#f0f6fc] text-[#1464BC]'
                                        : 'text-[#717783] hover:bg-[#f7f9fb]'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>

            <main className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 sm:px-8 md:py-12">
                {flash?.success && (
                    <div className="rounded-xl bg-[#dcfce7] p-4 text-sm font-medium text-[#166534]">
                        {flash.success}
                    </div>
                )}

                <section className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
                    <div>
                        <p className="m-0 mb-2 text-sm font-bold tracking-widest text-[#1464BC] uppercase">
                            Manajemen Praktik
                        </p>
                        <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight text-[#191c1e] md:text-[44px]">
                            Jadwal Anda.
                        </h1>
                        <p className="m-0 mt-3 max-w-[660px] text-base leading-relaxed font-medium text-[#717783]">
                            Atur hari dan jam ketersediaan Anda agar pasien
                            dapat memilih waktu konsultasi.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex h-12 items-center justify-center gap-2 rounded-xl border-none bg-[#1464BC] px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1053A0]"
                    >
                        <Plus className="h-4 w-4" />
                        Tambah Jadwal
                    </button>
                </section>

                {isAdding && (
                    <section className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="m-0 text-xl font-black text-[#191c1e]">
                                Tambah Jadwal Baru
                            </h2>
                            <button
                                type="button"
                                onClick={() => setIsAdding(false)}
                                className="cursor-pointer border-none bg-transparent text-[#717783] hover:text-[#191c1e]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form
                            onSubmit={submit}
                            className="grid grid-cols-1 gap-6 md:grid-cols-4"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-bold text-[#414751]">
                                    Hari
                                </label>
                                <select
                                    value={form.day_of_week}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            day_of_week: e.target.value,
                                        })
                                    }
                                    className="h-11 w-full rounded-xl border border-[#d8dde5] bg-[#f7f9fb] px-4 text-sm font-medium text-[#191c1e] outline-none focus:border-[#1464BC]"
                                >
                                    {days.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                                {errors?.day_of_week && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.day_of_week}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-[#414751]">
                                    Jam Mulai
                                </label>
                                <input
                                    type="time"
                                    value={form.start_time}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            start_time: e.target.value,
                                        })
                                    }
                                    className="h-11 w-full rounded-xl border border-[#d8dde5] bg-[#f7f9fb] px-4 text-sm font-medium text-[#191c1e] outline-none focus:border-[#1464BC]"
                                />
                                {errors?.start_time && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.start_time}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-bold text-[#414751]">
                                    Jam Selesai
                                </label>
                                <input
                                    type="time"
                                    value={form.end_time}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            end_time: e.target.value,
                                        })
                                    }
                                    className="h-11 w-full rounded-xl border border-[#d8dde5] bg-[#f7f9fb] px-4 text-sm font-medium text-[#191c1e] outline-none focus:border-[#1464BC]"
                                />
                                {errors?.end_time && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.end_time}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="h-11 w-full rounded-xl border-none bg-[#1464BC] text-sm font-bold text-white transition-colors hover:bg-[#1053A0]"
                                >
                                    Simpan Jadwal
                                </button>
                            </div>
                        </form>
                    </section>
                )}

                <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-6 flex items-end justify-between">
                        <div>
                            <h2 className="m-0 text-2xl font-black text-[#191c1e]">
                                Daftar Jadwal
                            </h2>
                        </div>
                    </div>

                    {schedules.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {schedules.map((schedule) => (
                                <article
                                    key={schedule.id}
                                    className="flex flex-col gap-4 rounded-2xl border border-[#f2f4f6] bg-[#f7f9fb] p-5 transition-all hover:border-[#1464BC]/20"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-10 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                                                <Calendar className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="m-0 text-lg font-black text-[#191c1e]">
                                                    {schedule.day_of_week}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-sm font-medium text-[#717783]">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {schedule.start_time} -{' '}
                                                    {schedule.end_time} WIB
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-2 flex items-center justify-between border-t border-[#e2e4e6] pt-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleActive(schedule)
                                            }
                                            className={`flex cursor-pointer items-center gap-2 rounded-full border-none px-3 py-1.5 text-xs font-bold transition-colors ${
                                                schedule.is_active
                                                    ? 'bg-[#dcfce7] text-[#166534] hover:bg-[#bbf7d0]'
                                                    : 'bg-[#f2f4f6] text-[#717783] hover:bg-[#e2e4e6]'
                                            }`}
                                        >
                                            <span
                                                className={`size-2 rounded-full ${schedule.is_active ? 'bg-[#16a34a]' : 'bg-[#a0a5b1]'}`}
                                            />
                                            {schedule.is_active
                                                ? 'Aktif'
                                                : 'Nonaktif'}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteSchedule(schedule.id)
                                            }
                                            className="cursor-pointer rounded-lg border-none bg-transparent p-2 text-[#717783] hover:bg-[#feecec] hover:text-[#b02a2a]"
                                            aria-label="Hapus jadwal"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dde5] bg-[#f7f9fb] p-8 text-center">
                            <Clock className="mb-4 h-10 w-10 text-[#a0a5b1]" />
                            <h3 className="m-0 text-lg font-black text-[#191c1e]">
                                Belum ada jadwal
                            </h3>
                            <p className="m-0 mt-2 max-w-[420px] text-sm font-medium text-[#717783]">
                                Silakan tambahkan jadwal praktik Anda agar
                                pasien bisa memesan sesi terapi.
                            </p>
                            <button
                                type="button"
                                onClick={() => setIsAdding(true)}
                                className="mt-6 flex h-10 items-center justify-center gap-2 rounded-xl border border-[#d8dde5] bg-white px-4 text-sm font-bold text-[#414751] hover:bg-[#f2f4f6]"
                            >
                                <Plus className="h-4 w-4" />
                                Tambah Jadwal Sekarang
                            </button>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

PsychologistSchedules.layout = {};

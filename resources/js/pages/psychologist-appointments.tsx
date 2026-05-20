import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    Smile,
    UserRound,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { complete } from '@/actions/App/Http/Controllers/PsychologistAppointmentController';
import { logout } from '@/routes';

type Appointment = {
    id: number;
    patient_name: string;
    patient_email?: string | null;
    date: string;
    time: string;
    status: string;
    payment_status: string;
    amount: number;
    can_complete: boolean;
};

type PsychologistAppointmentsProps = {
    appointments: Appointment[];
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Schedules', path: '/psychologist/schedules', active: false },
    { label: 'Appointments', path: '/psychologist/appointments', active: true },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Records', path: '#', active: false },
];

function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(amount);
}

function statusText(status: string) {
    if (status === 'completed') {
        return 'Selesai';
    }

    if (status === 'due') {
        return 'Sedang berjalan';
    }

    if (status === 'overdue') {
        return 'Overdue';
    }

    return 'Upcoming';
}

export default function PsychologistAppointments({
    appointments = [],
}: PsychologistAppointmentsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Psikolog';
    const userEmail = auth.user?.email ?? 'psikolog@example.com';
    const runningAppointments = appointments.filter((appointment) =>
        ['due', 'overdue'].includes(appointment.status),
    );
    const upcomingAppointments = appointments.filter(
        (appointment) => appointment.status === 'upcoming',
    );
    const completedAppointments = appointments.filter(
        (appointment) => appointment.status === 'completed',
    );

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Appointments Psikolog" />

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
                        <div className="hidden items-center gap-2 sm:flex">
                            <button
                                type="button"
                                aria-label="Notifikasi"
                                className="relative cursor-pointer rounded-full border-none bg-transparent p-2 text-[#717783] transition-colors hover:bg-[#f2f4f6] hover:text-[#191c1e]"
                            >
                                <Bell className="h-[22px] w-[22px]" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#e65c5c] ring-2 ring-white" />
                            </button>
                            <button
                                type="button"
                                aria-label="Pesan"
                                className="relative cursor-pointer rounded-full border-none bg-transparent p-2 text-[#717783] transition-colors hover:bg-[#f2f4f6] hover:text-[#191c1e]"
                            >
                                <MessageSquare className="h-[22px] w-[22px]" />
                            </button>
                        </div>
                        <div className="hidden h-6 w-px bg-[#e2e4e6] sm:block" />
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
                                            onClick={() =>
                                                setIsUserMenuOpen(false)
                                            }
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
                                            data-test="logout-button"
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
                <section className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
                    <div>
                        <p className="m-0 mb-2 text-sm font-bold tracking-widest text-[#1464BC] uppercase">
                            Semua Appointment
                        </p>
                        <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight text-[#191c1e] md:text-[44px]">
                            Daftar Appointment.
                        </h1>
                        <p className="m-0 mt-3 max-w-[660px] text-base leading-relaxed font-medium text-[#717783]">
                            Kelola jadwal pertemuan dan sesi terapi Anda dengan
                            pasien di sini.
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="m-0 text-2xl font-black text-[#191c1e]">
                                Semua Jadwal
                            </h2>
                            <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                Pasien yang telah menjadwalkan sesi dengan Anda.
                            </p>
                        </div>
                    </div>

                    {appointments.length > 0 ? (
                        <div className="flex flex-col gap-8">
                            <AppointmentSection
                                title="Sedang Berjalan"
                                description="Sesi yang sudah masuk waktu konsultasi."
                                appointments={runningAppointments}
                                emptyText="Belum ada sesi yang sedang berjalan atau overdue."
                            />
                            <AppointmentSection
                                title="Upcoming"
                                description="Sesi berbayar yang jadwalnya belum mulai."
                                appointments={upcomingAppointments}
                                emptyText="Belum ada sesi upcoming."
                            />
                            <AppointmentSection
                                title="Selesai"
                                description="Sesi yang sudah ditandai selesai oleh psikolog."
                                appointments={completedAppointments}
                                emptyText="Belum ada sesi selesai."
                            />
                        </div>
                    ) : (
                        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dde5] bg-[#f7f9fb] p-8 text-center">
                            <Calendar className="mb-4 h-10 w-10 text-[#a0a5b1]" />
                            <h3 className="m-0 text-lg font-black text-[#191c1e]">
                                Belum ada appointment
                            </h3>
                            <p className="m-0 mt-2 max-w-[420px] text-sm font-medium text-[#717783]">
                                Sesi akan muncul di sini setelah pasien
                                melakukan pemesanan untuk Anda.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

PsychologistAppointments.layout = {};

function AppointmentSection({
    title,
    description,
    appointments,
    emptyText,
}: {
    title: string;
    description: string;
    appointments: Appointment[];
    emptyText: string;
}) {
    return (
        <section className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3 className="m-0 text-lg font-black text-[#191c1e]">
                        {title}
                    </h3>
                    <p className="m-0 text-sm font-medium text-[#717783]">
                        {description}
                    </p>
                </div>
                <span className="w-fit rounded-full bg-[#f2f4f6] px-3 py-1 text-xs font-bold text-[#717783]">
                    {appointments.length} sesi
                </span>
            </div>

            {appointments.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {appointments.map((appointment) => (
                        <AppointmentRow
                            key={appointment.id}
                            appointment={appointment}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex min-h-20 items-center gap-3 rounded-2xl border border-dashed border-[#d8dde5] bg-[#f7f9fb] px-4 py-5">
                    <Clock className="h-5 w-5 shrink-0 text-[#a0a5b1]" />
                    <p className="m-0 text-sm font-medium text-[#717783]">
                        {emptyText}
                    </p>
                </div>
            )}
        </section>
    );
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
    const isPaid = appointment.payment_status === 'paid';
    const canStart =
        isPaid && ['upcoming', 'due', 'overdue'].includes(appointment.status);
    const canComplete = appointment.can_complete;

    const completeAppointment = () => {
        if (!canComplete) {
            return;
        }

        router.patch(
            complete.url(appointment.id),
            {},
            { preserveScroll: true },
        );
    };

    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-[#f2f4f6] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                <InitialsAvatar
                    name={appointment.patient_name}
                    className="size-12 rounded-2xl"
                />
                <div>
                    <h3 className="m-0 text-base font-black text-[#191c1e]">
                        {appointment.patient_name}
                    </h3>
                    <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                        {appointment.date} · {appointment.time} ·{' '}
                        {formatRupiah(appointment.amount)}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
                <div className="flex gap-2">
                    <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                            isPaid
                                ? 'bg-[#dcfce7] text-[#166534]'
                                : 'bg-[#fef3c7] text-[#92400e]'
                        }`}
                    >
                        {appointment.payment_status}
                    </span>
                    <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                            appointment.status === 'upcoming'
                                ? 'bg-[#e1eef9] text-[#1464BC]'
                                : appointment.status === 'due'
                                  ? 'bg-[#dcfce7] text-[#166534]'
                                  : appointment.status === 'overdue'
                                    ? 'bg-[#feecec] text-[#b02a2a]'
                                    : 'bg-[#f2f4f6] text-[#717783]'
                        }`}
                    >
                        {statusText(appointment.status)}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                    <Link
                        href={canStart ? '/sessions' : '#'}
                        className={`flex h-11 items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors ${
                            canStart
                                ? 'bg-[#1464BC] text-white hover:bg-[#1053A0]'
                                : 'bg-[#f2f4f6] text-[#717783]'
                        }`}
                    >
                        Mulai Sesi
                    </Link>
                    <button
                        type="button"
                        onClick={completeAppointment}
                        disabled={!canComplete}
                        className={`flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold transition-colors disabled:cursor-not-allowed ${
                            canComplete
                                ? 'bg-[#dcfce7] text-[#166534] hover:bg-[#bbf7d0]'
                                : 'bg-[#f2f4f6] text-[#717783]'
                        }`}
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Selesai
                    </button>
                </div>
            </div>
        </article>
    );
}

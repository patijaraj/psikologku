import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    CalendarClock,
    CheckCircle2,
    Clock,
    Headphones,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    Smile,
    UserRound,
    Wallet,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';
import { NotificationDropdown } from '@/components/notification-dropdown';

type PsychologistProfile = {
    id: number;
    str_number?: string | null;
    specialization?: string[] | null;
    price: number;
    is_online: boolean;
    photo_url?: string | null;
};

type TodaySession = {
    id: number;
    patient_name: string;
    patient_email?: string | null;
    status: string;
    amount: number;
    time?: string | null;
    date?: string | null;
};

type Summary = {
    today_sessions: number;
    paid_sessions: number;
    pending_sessions: number;
    monthly_revenue: number;
};

type PsychologistDashboardProps = {
    profile?: PsychologistProfile | null;
    todaySessions?: TodaySession[];
    summary?: Summary;
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: true },
    { label: 'Schedules', path: '/psychologist/schedules', active: false },
    {
        label: 'Appointments',
        path: '/psychologist/appointments',
        active: false,
    },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Records', path: '/psychologist/records', active: false },
];

function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function PsychologistDashboard({
    profile = null,
    todaySessions = [],
    summary = {
        today_sessions: 0,
        paid_sessions: 0,
        pending_sessions: 0,
        monthly_revenue: 0,
    },
}: PsychologistDashboardProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isOnline, setIsOnline] = useState(profile?.is_online ?? false);
    const [isUpdatingAvailability, setIsUpdatingAvailability] = useState(false);
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Psikolog';
    const userEmail = auth.user?.email ?? 'psikolog@example.com';

    const handleLogout = () => {
        router.flushAll();
    };

    const toggleAvailability = () => {
        if (!profile || isUpdatingAvailability) {
            return;
        }

        const nextValue = !isOnline;
        setIsOnline(nextValue);
        setIsUpdatingAvailability(true);

        router.patch(
            '/psychologist/availability',
            { is_online: nextValue },
            {
                preserveScroll: true,
                onError: () => setIsOnline(!nextValue),
                onFinish: () => setIsUpdatingAvailability(false),
            },
        );
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Dashboard Psikolog" />

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
                            <NotificationDropdown />
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
                                    photoUrl={
                                        profile?.photo_url ||
                                        (auth.user as any)?.photo_url
                                    }
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
                                                photoUrl={
                                                    profile?.photo_url ||
                                                    (auth.user as any)
                                                        ?.photo_url
                                                }
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
                                            href="/customer-service"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#f7f9fb]"
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                                                <MessageSquare className="h-5 w-5" />
                                            </span>
                                            Customer Service
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
                            Pusat Kendali
                        </p>
                        <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight text-[#191c1e] md:text-[44px]">
                            Selamat datang, {userName}.
                        </h1>
                        <p className="m-0 mt-3 max-w-[660px] text-base leading-relaxed font-medium text-[#717783]">
                            Pantau sesi hari ini, status ketersediaan, dan hal
                            yang butuh perhatian cepat.
                        </p>
                    </div>

                    <AvailabilitySwitch
                        enabled={isOnline}
                        disabled={!profile || isUpdatingAvailability}
                        onToggle={toggleAvailability}
                    />
                </section>

                <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                    <SummaryCard
                        icon={<CalendarClock className="h-5 w-5" />}
                        label="Sesi Hari Ini"
                        value={String(summary.today_sessions)}
                        helper="Transaksi dibuat hari ini"
                    />
                    <SummaryCard
                        icon={<CheckCircle2 className="h-5 w-5" />}
                        label="Siap Dimulai"
                        value={String(summary.paid_sessions)}
                        helper="Status pembayaran paid"
                    />
                    <SummaryCard
                        icon={<Clock className="h-5 w-5" />}
                        label="Menunggu"
                        value={String(summary.pending_sessions)}
                        helper="Masih pending"
                    />
                    <SummaryCard
                        icon={<Wallet className="h-5 w-5" />}
                        label="Pendapatan Bulan Ini"
                        value={formatRupiah(summary.monthly_revenue)}
                        helper="Dari sesi paid"
                    />
                </section>

                <section className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="m-0 text-2xl font-black text-[#191c1e]">
                                    Jadwal Hari Ini
                                </h2>
                                <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                    Pasien yang perlu dipantau hari ini.
                                </p>
                            </div>
                            <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                                    isOnline
                                        ? 'bg-[#dcfce7] text-[#166534]'
                                        : 'bg-[#f2f4f6] text-[#717783]'
                                }`}
                            >
                                {isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>

                        {todaySessions.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {todaySessions.map((session) => (
                                    <SessionRow
                                        key={session.id}
                                        session={session}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dde5] bg-[#f7f9fb] p-8 text-center">
                                <UserRound className="mb-4 h-10 w-10 text-[#a0a5b1]" />
                                <h3 className="m-0 text-lg font-black text-[#191c1e]">
                                    Belum ada jadwal hari ini
                                </h3>
                                <p className="m-0 mt-2 max-w-[420px] text-sm font-medium text-[#717783]">
                                    Sesi akan muncul di sini setelah pasien
                                    melakukan pemesanan untuk Anda.
                                </p>
                            </div>
                        )}
                    </div>

                    <aside className="flex flex-col gap-5">
                        <section className="rounded-3xl bg-[#1464BC] p-6 text-white shadow-[0_18px_40px_-24px_rgba(0,93,167,0.55)]">
                            <div className="mb-5 flex items-center gap-4">
                                {profile?.photo_url ? (
                                    <img
                                        src={profile.photo_url}
                                        alt={userName}
                                        className="size-16 rounded-full border-2 border-white/20 object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="flex size-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white">
                                        <UserRound className="size-8" />
                                    </div>
                                )}
                                <div>
                                    <p className="m-0 text-xs font-bold tracking-widest text-blue-100 uppercase">
                                        Profil Praktik
                                    </p>
                                    <h2 className="m-0 max-w-[180px] truncate text-xl font-black">
                                        {userName}
                                    </h2>
                                </div>
                            </div>

                            <h3 className="m-0 mt-4 border-t border-white/10 pt-4 text-lg font-bold text-blue-50">
                                {profile?.specialization &&
                                profile.specialization.length > 0
                                    ? profile.specialization.join(', ')
                                    : 'Spesialisasi belum diisi'}
                            </h3>
                            <div className="mt-6 flex flex-col gap-4">
                                <PracticeMeta
                                    label="Tarif sesi"
                                    value={
                                        profile
                                            ? formatRupiah(profile.price)
                                            : '-'
                                    }
                                />
                                <PracticeMeta
                                    label="STR"
                                    value={profile?.str_number ?? '-'}
                                />
                            </div>
                        </section>

                        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1464BC] to-[#0A3D7A] p-6 text-white shadow-md">
                            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-white/10 blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 size-32 rounded-full bg-white/10 blur-3xl" />

                            <div className="relative z-10 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                                        <Headphones className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="m-0 text-lg font-bold">
                                        Customer Service
                                    </h3>
                                </div>
                                <p className="m-0 text-sm leading-relaxed text-blue-100/90">
                                    Butuh bantuan atau ingin menyampaikan
                                    keluhan terkait aplikasi? Tim kami siap
                                    mendengarkan dan membantu Anda.
                                </p>
                                <Link
                                    href="/customer-service"
                                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#1464BC] transition-all hover:bg-blue-50 active:scale-95"
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    Hubungi Kami
                                </Link>
                            </div>
                        </section>
                    </aside>
                </section>
            </main>
        </div>
    );
}

PsychologistDashboard.layout = {};

function AvailabilitySwitch({
    enabled,
    disabled,
    onToggle,
}: {
    enabled: boolean;
    disabled: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onToggle}
            className={`flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border-none p-4 text-left transition-all md:w-[300px] ${
                enabled
                    ? 'bg-[#dcfce7] text-[#166534]'
                    : 'bg-[#f2f4f6] text-[#414751]'
            } ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:scale-[1.01]'}`}
        >
            <div>
                <div className="text-xs font-bold tracking-widest uppercase">
                    Status Praktik
                </div>
                <div className="mt-1 text-2xl font-black">
                    {enabled ? 'Online' : 'Offline'}
                </div>
            </div>
            <span
                className={`flex h-9 w-16 items-center rounded-full p-1 transition-colors ${
                    enabled ? 'bg-[#16a34a]' : 'bg-[#c1c7d3]'
                }`}
            >
                <span
                    className={`size-7 rounded-full bg-white shadow-sm transition-transform ${
                        enabled ? 'translate-x-7' : 'translate-x-0'
                    }`}
                />
            </span>
        </button>
    );
}

function SummaryCard({
    icon,
    label,
    value,
    helper,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    helper: string;
}) {
    return (
        <section className="rounded-3xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-[#eef5fe] text-[#1464BC]">
                {icon}
            </div>
            <div className="text-[28px] font-black text-[#191c1e]">{value}</div>
            <div className="mt-1 text-sm font-bold text-[#414751]">{label}</div>
            <div className="mt-2 text-xs font-medium text-[#717783]">
                {helper}
            </div>
        </section>
    );
}

function SessionRow({ session }: { session: TodaySession }) {
    const isPaid = session.status === 'paid';
    const isOverdue = session.status === 'overdue';

    return (
        <article
            className={`flex flex-col gap-4 rounded-2xl border ${isOverdue ? 'border-[#feecec] bg-[#fff5f5]' : 'border-[#f2f4f6] bg-white'} p-4 sm:flex-row sm:items-center sm:justify-between`}
        >
            <div className="flex items-center gap-4">
                <InitialsAvatar
                    name={session.patient_name}
                    className="size-12 rounded-2xl"
                />
                <div>
                    <h3 className="m-0 text-base font-black text-[#191c1e]">
                        {session.patient_name}
                    </h3>
                    <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                        {session.date ? `${session.date} · ` : ''}
                        {session.time ?? '--:--'} WIB ·{' '}
                        {formatRupiah(session.amount)}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
                <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold uppercase ${
                        isPaid
                            ? 'bg-[#dcfce7] text-[#166534]'
                            : isOverdue
                              ? 'bg-[#feecec] text-[#b02a2a]'
                              : 'bg-[#fef3c7] text-[#92400e]'
                    }`}
                >
                    {session.status}
                </span>
                <Link
                    href={isPaid || isOverdue ? '/sessions' : '#'}
                    className={`flex h-11 items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors ${
                        isPaid || isOverdue
                            ? 'bg-[#1464BC] text-white hover:bg-[#1053A0]'
                            : 'bg-[#f2f4f6] text-[#717783]'
                    }`}
                >
                    Mulai Sesi
                </Link>
            </div>
        </article>
    );
}

function PracticeMeta({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-white/10 p-4">
            <div className="mb-1 text-xs font-bold tracking-widest text-blue-100 uppercase">
                {label}
            </div>
            <div className="text-base font-black text-white">{value}</div>
        </div>
    );
}

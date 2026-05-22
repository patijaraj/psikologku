import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
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
import { logout } from '@/routes';

type Record = {
    id: number;
    patient_name: string;
    patient_email?: string | null;
    last_session_date: string;
    diagnosis?: string;
    notes_count: number;
};

type PsychologistRecordsProps = {
    records?: Record[];
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Schedules', path: '/psychologist/schedules', active: false },
    { label: 'Appointments', path: '/psychologist/appointments', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Records', path: '/psychologist/records', active: true },
];

export default function PsychologistRecords({
    records = [],
}: PsychologistRecordsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Psikolog';
    const userEmail = auth.user?.email ?? 'psikolog@example.com';

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Records Psikolog" />

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
                                                photoUrl={
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
                            Semua Rekam Medis
                        </p>
                        <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight text-[#191c1e] md:text-[44px]">
                            Daftar Record Pasien.
                        </h1>
                        <p className="m-0 mt-3 max-w-[660px] text-base leading-relaxed font-medium text-[#717783]">
                            Kelola rekam medis dan catatan perkembangan pasien Anda di sini.
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="m-0 text-2xl font-black text-[#191c1e]">
                                Daftar Pasien
                            </h2>
                            <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                Pasien yang memiliki riwayat sesi terapi dengan Anda.
                            </p>
                        </div>
                    </div>

                    {records.length > 0 ? (
                        <div className="flex flex-col gap-3">
                            {records.map((record) => (
                                <RecordRow
                                    key={record.id}
                                    record={record}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dde5] bg-[#f7f9fb] p-8 text-center">
                            <FileText className="mb-4 h-10 w-10 text-[#a0a5b1]" />
                            <h3 className="m-0 text-lg font-black text-[#191c1e]">
                                Belum ada record
                            </h3>
                            <p className="m-0 mt-2 max-w-[420px] text-sm font-medium text-[#717783]">
                                Record akan muncul di sini setelah Anda menyelesaikan sesi dengan pasien.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

PsychologistRecords.layout = {};

function RecordRow({ record }: { record: Record }) {
    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-[#f2f4f6] bg-white p-4 sm:flex-row sm:items-center sm:justify-between transition-colors hover:border-[#e2e4e6]">
            <div className="flex items-center gap-4">
                <InitialsAvatar
                    name={record.patient_name}
                    className="size-12 rounded-2xl"
                />
                <div>
                    <h3 className="m-0 text-base font-black text-[#191c1e]">
                        {record.patient_name}
                    </h3>
                    <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                        Sesi Terakhir: {record.last_session_date}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
                <div className="flex gap-2">
                    <span className="w-fit rounded-full px-3 py-1 text-xs font-bold bg-[#eef5fe] text-[#1464BC]">
                        {record.notes_count} Catatan
                    </span>
                    {record.diagnosis && (
                        <span className="w-fit rounded-full px-3 py-1 text-xs font-bold bg-[#f2f4f6] text-[#717783]">
                            {record.diagnosis}
                        </span>
                    )}
                </div>
                <div className="flex flex-wrap gap-2 sm:justify-end">
                    <Link
                        href={`/psychologist/records/${record.id}`}
                        className="flex h-11 items-center justify-center rounded-xl px-5 text-sm font-bold transition-colors bg-[#1464BC] text-white hover:bg-[#1053A0]"
                    >
                        Lihat Detail
                    </Link>
                </div>
            </div>
        </article>
    );
}

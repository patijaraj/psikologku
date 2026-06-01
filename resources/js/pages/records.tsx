import { Head, Link, usePage } from '@inertiajs/react';
import {
    Bell,
    CheckCircle2,
    FileText,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    Smile,
    User,
    X,
    UserRound,
    Star,
} from 'lucide-react';
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';
import { NotificationDropdown } from '@/components/notification-dropdown';

type PatientRecord = {
    id: number;
    psychologist_name: string;
    psychologist_photo_url?: string | null;
    specialization: string[] | null;
    session_date: string;
    record_summary: string;
    rating?: number | null;
};

type RecordsProps = {
    records: PatientRecord[];
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '/records', active: true },
];

export default function Records({ records = [] }: RecordsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props as any;
    const userName = auth.user?.name ?? 'User';
    const userEmail = auth.user?.email ?? 'user@example.com';

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="My Records" />

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
                                            href="/profile"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#f7f9fb]"
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                                                <User className="h-5 w-5" />
                                            </span>
                                            Profile
                                        </Link>
                                        <Link
                                            href={logout()}
                                            as="button"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#b02a2a] transition-colors hover:bg-[#feecec]"
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
                            Catatan Kesehatan
                        </p>
                        <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight text-[#191c1e] md:text-[44px]">
                            Riwayat Record Konsultasi.
                        </h1>
                        <p className="m-0 mt-3 max-w-[660px] text-base leading-relaxed font-medium text-[#717783]">
                            Akses ringkasan dan rekomendasi dari sesi konsultasi
                            Anda bersama psikolog.
                        </p>
                    </div>
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="m-0 text-2xl font-black text-[#191c1e]">
                                Daftar Record
                            </h2>
                            <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                Rekam medis yang telah ditulis oleh psikolog
                                Anda.
                            </p>
                        </div>
                    </div>

                    {records.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {records.map((record) => (
                                <Link
                                    href={`/records/${record.id}`}
                                    key={record.id}
                                    className="flex flex-col gap-4 rounded-2xl border border-[#f2f4f6] bg-white p-5 transition-colors hover:border-[#1464BC] hover:shadow-md"
                                >
                                    <div className="flex items-center gap-4">
                                        <InitialsAvatar
                                            name={record.psychologist_name}
                                            photoUrl={
                                                record.psychologist_photo_url
                                            }
                                            className="size-12 rounded-xl"
                                        />
                                        <div>
                                            <h3 className="m-0 text-base font-bold text-[#191c1e]">
                                                {record.psychologist_name}
                                            </h3>
                                            <p className="m-0 text-xs font-medium text-[#717783]">
                                                {record.specialization &&
                                                record.specialization.length > 0
                                                    ? record.specialization.join(
                                                          ', ',
                                                      )
                                                    : 'Psikologi'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="h-px w-full bg-[#f2f4f6]" />
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs font-bold text-[#717783]">
                                                Sesi Terakhir
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {record.rating ? (
                                                    <span className="flex items-center gap-1 rounded-md bg-[#fff8e6] px-2 py-0.5 text-[11px] font-bold text-[#b45309]">
                                                        <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                                                        {record.rating}/5
                                                    </span>
                                                ) : (
                                                    <span className="rounded-md bg-[#feecec] px-2 py-0.5 text-[11px] font-bold text-[#b02a2a]">
                                                        Belum Diulas
                                                    </span>
                                                )}
                                                <span className="text-xs font-bold text-[#1464BC]">
                                                    {record.session_date}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="m-0 line-clamp-2 text-sm leading-relaxed text-[#717783]">
                                            {record.record_summary}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dde5] bg-[#f7f9fb] p-8 text-center">
                            <FileText className="mb-4 h-10 w-10 text-[#a0a5b1]" />
                            <h3 className="m-0 text-lg font-black text-[#191c1e]">
                                Belum ada record
                            </h3>
                            <p className="m-0 mt-2 max-w-[420px] text-sm font-medium text-[#717783]">
                                Record akan muncul di sini setelah Anda
                                menyelesaikan sesi dengan psikolog dan psikolog
                                telah mengisi catatan.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

Records.layout = {};

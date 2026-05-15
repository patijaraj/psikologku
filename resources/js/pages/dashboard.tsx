import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Bell,
    BookOpen,
    Brain,
    Calendar,
    ChevronRight,
    FileText,
    Frown,
    Headphones,
    LogOut,
    Menu,
    MessageSquare,
    Moon,
    Phone,
    Settings,
    Smile,
    SmilePlus,
    Star,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';

const drJulianneImg =
    'https://images.unsplash.com/photo-1721674098745-7d1b76e0fc02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBtYXR1cmUlMjB3b21hbiUyMHBvcnRyYWl0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3ODUxMzUwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const drElenaImg =
    'https://images.unsplash.com/photo-1659353887012-680771c1b497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHhpc3BhbmljJTIwZmVtYWxlJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTEzNTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const drMarcusImg =
    'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFsZSUyMGRvY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODUxMzUwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: true },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '#', active: false },
];

function ImageWithFallback({
    src,
    alt,
    className,
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            onError={(event) => {
                event.currentTarget.src =
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1080&auto=format&fit=crop';
            }}
        />
    );
}

export default function Dashboard() {
    const quotesIndo = [
        "Sebab tidak ada yang lebih setia selain luka yang kau rawat sendiri. — M. Aan Mansyur",
        "Mencintai diri sendiri adalah awal dari romansa seumur hidup. — Oscar Wilde",
        "Apa pun yang terjadi, jangan pernah kehilangan harapan pada dirimu sendiri. — Chairil Anwar",
        "Ada perasaan yang harus dijaga, meski hanya dalam diam dan doa. — Sapardi Djoko Damono",
        "Jangan terburu-buru, hal-hal baik sedang dalam perjalanan menuju kepadamu. — Rupi Kaur",
        "Kita adalah apa yang kita pikirkan. Semua yang kita alami lahir dari pikiran kita. — Dhammapada",
        "Bersabarlah dengan segala sesuatu yang belum terselesaikan di hatimu. — Rainer Maria Rilke",
        "Kadang kau harus menghilang untuk bisa benar-benar ditemukan kembali. — Buku Puisi",
        "Hanya karena jalannya berbeda, bukan berarti kamu sedang tersesat. — Anonim",
        "Istirahatlah, jiwa yang lelah pun butuh waktu untuk sekadar menjadi. — Kutipan Sastra"
    ];

    const [quote, setQuote] = useState(quotesIndo[0]);

    const handleRefresh = () => {
        const randomIndex = Math.floor(Math.random() * quotesIndo.length);
        setQuote(quotesIndo[randomIndex]);
    };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const firstName = auth.user?.name?.split(' ')[0] ?? 'Sarah';
    const userName = auth.user?.name ?? 'Sarah';
    const userEmail = auth.user?.email ?? 'sarah@example.com';

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Dashboard" />

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

                                        <button
                                            type="button"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#f7f9fb]"
                                            onClick={() =>
                                                setIsUserMenuOpen(false)
                                            }
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                                                <Settings className="h-5 w-5" />
                                            </span>
                                            Settings
                                        </button>

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
                        <div className="my-2 h-px w-full bg-[#e2e4e6]" />
                        <div className="flex justify-around p-2">
                            <button
                                type="button"
                                className="flex cursor-pointer flex-col items-center gap-1 border-none bg-transparent text-[#717783]"
                            >
                                <Bell className="h-6 w-6" />
                                <span className="text-xs">Notifikasi</span>
                            </button>
                            <button
                                type="button"
                                className="flex cursor-pointer flex-col items-center gap-1 border-none bg-transparent text-[#717783]"
                            >
                                <MessageSquare className="h-6 w-6" />
                                <span className="text-xs">Pesan</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            <main className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-8 sm:px-8 md:py-12">
                <section className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="m-0 text-[36px] leading-tight font-black tracking-tight text-[#191c1e] md:text-[48px]">
                            Selamat pagi, {firstName}.
                        </h1>
                        <p className="m-0 text-lg font-medium text-[#717783] md:text-xl">
                            Bagaimana perasaanmu hari ini?
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <MoodButton
                            active
                            icon={<SmilePlus className="h-5 w-5" />}
                            label="Tenang"
                            className="bg-[#99f2c1] text-[#08714a] hover:bg-[#85e1b0]"
                        />
                        <MoodButton
                            icon={<Brain className="h-5 w-5" />}
                            label="Reflektif"
                        />
                        <MoodButton
                            icon={<Frown className="h-5 w-5" />}
                            label="Cemas"
                        />
                        <MoodButton
                            icon={<Moon className="h-5 w-5" />}
                            label="Lelah"
                            className="bg-[#7069c7] text-white shadow-sm hover:bg-[#5f59ab]"
                        />
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                    <div className="flex flex-col gap-10 lg:col-span-8">
                        <section className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-[#1464BC] p-6 shadow-md md:flex-row md:items-center md:p-8">
                            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/2 rounded-full bg-white opacity-5 blur-3xl" />

                            <div className="relative z-10 flex w-full items-center gap-5 md:w-auto">
                                <div className="size-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 shadow-inner md:size-[100px]">
                                    <ImageWithFallback
                                        src={drJulianneImg}
                                        alt="Dr. Julianne Moore"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
                                        Obrolan Mendatang
                                    </span>
                                    <h2 className="m-0 text-2xl leading-tight font-bold text-white md:text-[28px]">
                                        Dr. Julianne Moore
                                    </h2>
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-blue-100 md:text-[15px]">
                                        <Calendar className="h-4 w-4" />
                                        Chat hari ini, 10:30 (45 mnt)
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="relative z-10 flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-white px-6 py-3.5 text-[15px] font-bold text-[#1464BC] shadow-sm transition-colors hover:bg-blue-50 md:w-auto"
                            >
                                <MessageSquare className="h-5 w-5" />
                                Masuk Obrolan
                            </button>
                        </section>
                        
                        <section className="relative overflow-hidden rounded-3xl border border-[#e2e4e6] bg-white p-8 shadow-sm">
                            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-[#eef5fe]/50 blur-3xl" />
                            
                            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#eef5fe] text-[#1464BC]">
                                    <Brain className="h-8 w-8" />
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <h3 className="m-0 text-xl font-bold text-[#191c1e]">
                                        Kata-kata hari ini bosku
                                    </h3>
                                    <p className="m-0 max-w-[500px] text-[17px] font-medium italic leading-relaxed text-[#717783]">
                                        "{quote}"
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRefresh}
                                    className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-[#f2f4f6] px-5 py-2.5 text-sm font-bold text-[#1464BC] transition-all hover:bg-[#eef5fe] active:scale-95"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Refresh Inspirasi
                                </button>
                            </div>
                        </section>
                    </div>

                    <aside className="flex flex-col gap-6 lg:col-span-4">
                        <section className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm">
                            <h3 className="m-0 mb-6 text-lg font-bold text-[#191c1e]">
                                Progres Mingguan
                            </h3>
                            <div className="flex flex-col gap-5">
                                <ProgressItem
                                    label="Keseimbangan Emosi"
                                    percent={78}
                                    color="bg-[#1464BC]"
                                    textColor="text-[#1464BC]"
                                />
                                <ProgressItem
                                    label="Kualitas Tidur"
                                    percent={62}
                                    color="bg-[#08714a]"
                                    textColor="text-[#08714a]"
                                />
                                <ProgressItem
                                    label="Praktik Mindfulness"
                                    percent={45}
                                    color="bg-[#7069c7]"
                                    textColor="text-[#7069c7]"
                                />
                            </div>
                        </section>

                        <section className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm">
                            <h3 className="m-0 mb-5 text-lg font-bold text-[#191c1e]">
                                Riwayat Terbaru
                            </h3>
                            <div className="flex flex-col gap-4">
                                <RecordItem
                                    icon={<FileText className="h-6 w-6" />}
                                    title="Ringkasan Sesi - 12 Mei"
                                    meta="Dokumen PDF - 1.2 MB"
                                    className="bg-[#feecec] text-[#e65c5c]"
                                />
                                <RecordItem
                                    icon={<Headphones className="h-6 w-6" />}
                                    title="Meditasi Terpandu #4"
                                    meta="Audio MP3 - 15:20 mnt"
                                    className="bg-[#eef5fe] text-[#1464BC]"
                                />
                                <RecordItem
                                    icon={<BookOpen className="h-6 w-6" />}
                                    title="Strategi Mengatasi Kecemasan"
                                    meta="Bacaan - 5 mnt baca"
                                    className="bg-[#e5f5ef] text-[#08714a]"
                                />

                                <button
                                    type="button"
                                    className="mt-2 w-full cursor-pointer rounded-xl border border-[#e2e4e6] bg-white py-3 text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#f7f9fb]"
                                >
                                    Lihat Semua Riwayat
                                </button>
                            </div>
                        </section>

                        <section className="rounded-3xl bg-[#feecec] p-6 shadow-sm">
                            <div className="mb-3 flex items-center gap-2 text-[#b02a2a]">
                                <AlertCircle className="h-5 w-5" />
                                <h3 className="m-0 text-base font-bold">
                                    Butuh bantuan darurat?
                                </h3>
                            </div>
                            <p className="m-0 mb-5 text-sm leading-relaxed text-[#b02a2a]">
                                Tim dukungan krisis kami tersedia 24/7 jika Anda
                                membutuhkan bantuan segera.
                            </p>
                            <button
                                type="button"
                                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-[#b02a2a] py-3.5 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-[#902222]"
                            >
                                <Phone className="h-5 w-5" />
                                Hubungi Bantuan
                            </button>
                        </section>
                    </aside>
                </div>
            </main>
        </div>
    );
}

Dashboard.layout = {};

function MoodButton({
    icon,
    label,
    className = 'bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e2e4e6]',
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    className?: string;
}) {
    return (
        <button
            type="button"
            className={`flex cursor-pointer items-center gap-2 rounded-full border-none px-6 py-3 text-base font-semibold transition-colors ${className}`}
        >
            {icon}
            {label}
        </button>
    );
}

function TherapistCard({
    image,
    name,
    specialty,
    rating,
    reviews,
    match,
    price,
    imageBg,
}: {
    image: string;
    name: string;
    specialty: string;
    rating: string;
    reviews: string;
    match: string;
    price: string;
    imageBg: string;
}) {
    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-[#e2e4e6] bg-white p-5 transition-shadow hover:shadow-md">
            <div className="flex gap-4">
                <div className="relative size-[72px] shrink-0">
                    <div
                        className={`h-full w-full overflow-hidden rounded-2xl ${imageBg}`}
                    >
                        <ImageWithFallback
                            src={image}
                            alt={name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-x-0 -bottom-2 flex justify-center">
                        <span className="rounded-full bg-[#08714a] px-2 py-0.5 text-[10px] font-bold whitespace-nowrap text-white">
                            {match}
                        </span>
                    </div>
                </div>
                <div className="flex min-w-0 flex-col">
                    <h4 className="m-0 text-lg font-bold text-[#191c1e]">
                        {name}
                    </h4>
                    <span className="mt-0.5 text-[13px] leading-tight font-medium text-[#717783]">
                        {specialty}
                    </span>
                    <div className="mt-2 flex items-center gap-1 text-[13px]">
                        <Star className="h-4 w-4 fill-[#08714a] text-[#08714a]" />
                        <span className="font-bold text-[#191c1e]">
                            {rating}
                        </span>
                        <span className="text-[#717783]">({reviews})</span>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-[#f2f4f6] pt-4">
                <div>
                    <span className="text-xl font-black text-[#191c1e]">
                        {price}
                    </span>
                    <span className="text-sm font-medium text-[#717783]">
                        /sesi
                    </span>
                </div>
                <Link
                    href="/therapists"
                    className="cursor-pointer rounded-[10px] border-none bg-[#f2f4f6] px-5 py-2.5 text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#e2e4e6]"
                >
                    Pesan
                </Link>
            </div>
        </div>
    );
}

function ProgressItem({
    label,
    percent,
    color,
    textColor,
}: {
    label: string;
    percent: number;
    color: string;
    textColor: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-[#191c1e]">{label}</span>
                <span className={`font-bold ${textColor}`}>{percent}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#f2f4f6]">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${color}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}

function RecordItem({
    icon,
    title,
    meta,
    className,
}: {
    icon: React.ReactNode;
    title: string;
    meta: string;
    className: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${className}`}
            >
                {icon}
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-semibold text-[#191c1e]">
                    {title}
                </span>
                <span className="mt-0.5 text-xs text-[#717783]">{meta}</span>
            </div>
        </div>
    );
}

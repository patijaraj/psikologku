import { Head, Link, usePage } from '@inertiajs/react';
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
    Menu,
    MessageSquare,
    Moon,
    Phone,
    Smile,
    SmilePlus,
    Star,
    Video,
    X,
} from 'lucide-react';
import { useState } from 'react';

const profileImg =
    'https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwYXNpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3ODAzMDI3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const drJulianneImg =
    'https://images.unsplash.com/photo-1721674098745-7d1b76e0fc02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBtYXR1cmUlMjB3b21hbiUyMHBvcnRyYWl0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3ODUxMzUwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const drElenaImg =
    'https://images.unsplash.com/photo-1659353887012-680771c1b497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHhpc3BhbmljJTIwZmVtYWxlJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTEzNTA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const drMarcusImg =
    'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFsZSUyMGRvY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODUxMzUwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: true },
    { label: 'Therapist', path: '#', active: false },
    { label: 'Sessions', path: '#', active: false },
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
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const firstName = auth.user?.name?.split(' ')[0] ?? 'Sarah';

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

                        <button
                            type="button"
                            aria-label="Profil"
                            className="flex shrink-0 cursor-pointer items-center rounded-full border-none bg-transparent p-1 transition-all hover:ring-2 hover:ring-[#e2e4e6]"
                        >
                            <div className="size-9 shrink-0 overflow-hidden rounded-full">
                                <ImageWithFallback
                                    src={profileImg}
                                    alt="Profil pengguna"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </button>

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
                                        Sesi Mendatang
                                    </span>
                                    <h2 className="m-0 text-2xl leading-tight font-bold text-white md:text-[28px]">
                                        Dr. Julianne Moore
                                    </h2>
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-blue-100 md:text-[15px]">
                                        <Calendar className="h-4 w-4" />
                                        Hari ini, 10:30 (45 mnt)
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="relative z-10 flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-white px-6 py-3.5 text-[15px] font-bold text-[#1464BC] shadow-sm transition-colors hover:bg-blue-50 md:w-auto"
                            >
                                <Video className="h-5 w-5" />
                                Masuk Ruang
                            </button>
                        </section>

                        <section className="flex flex-col gap-5">
                            <div className="flex items-end justify-between">
                                <div className="flex flex-col gap-1">
                                    <h3 className="m-0 text-[22px] font-bold text-[#191c1e]">
                                        Rekomendasi untukmu
                                    </h3>
                                    <p className="m-0 text-[15px] text-[#717783]">
                                        Berdasarkan progres dan preferensimu
                                    </p>
                                </div>
                                <Link
                                    href="#"
                                    className="hidden items-center gap-1 text-[15px] font-semibold text-[#1464BC] hover:underline sm:flex"
                                >
                                    Lihat Semua
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <TherapistCard
                                    image={drElenaImg}
                                    name="Dr. Elena Rodriguez"
                                    specialty="Terapi Perilaku Kognitif"
                                    rating="4.9"
                                    reviews="124 ulasan"
                                    match="MATCH 98%"
                                    price="Rp 250rb"
                                    imageBg="bg-green-100"
                                />
                                <TherapistCard
                                    image={drMarcusImg}
                                    name="Dr. Marcus Chen"
                                    specialty="Mindfulness & Manajemen Stres"
                                    rating="4.8"
                                    reviews="89 ulasan"
                                    match="MATCH 94%"
                                    price="Rp 200rb"
                                    imageBg="bg-blue-100"
                                />

                                <Link
                                    href="#"
                                    className="mt-2 flex items-center justify-center gap-1 text-[15px] font-semibold text-[#1464BC] sm:hidden"
                                >
                                    Lihat Semua Psikolog
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
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
                <button
                    type="button"
                    className="cursor-pointer rounded-[10px] border-none bg-[#f2f4f6] px-5 py-2.5 text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#e2e4e6]"
                >
                    Pesan
                </button>
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

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
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';
import { NotificationDropdown } from '@/components/notification-dropdown';

const defaultAvatar =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: true },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '/records', active: false },
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
                event.currentTarget.src = defaultAvatar;
            }}
        />
    );
}

export default function Dashboard({
    appointments = [],
    topPsychologists = [],
    recentRecords = [],
}: {
    appointments?: any[];
    topPsychologists?: any[];
    recentRecords?: any[];
}) {
    const upcomingAppointments =
        appointments?.filter((a) => {
            const appointmentDateTime = new Date(
                `${a.appointment_date}T${a.start_time}`,
            );
            return appointmentDateTime >= new Date();
        }) || [];
    const closestAppointment =
        upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

    const quotesIndo = [
        'Sebab tidak ada yang lebih setia selain luka yang kau rawat sendiri. — M. Aan Mansyur',
        'Mencintai diri sendiri adalah awal dari romansa seumur hidup. — Oscar Wilde',
        'Apa pun yang terjadi, jangan pernah kehilangan harapan pada dirimu sendiri. — Chairil Anwar',
        'Ada perasaan yang harus dijaga, meski hanya dalam diam dan doa. — Sapardi Djoko Damono',
        'Jangan terburu-buru, hal-hal baik sedang dalam perjalanan menuju kepadamu. — Rupi Kaur',
        'Kita adalah apa yang kita pikirkan. Semua yang kita alami lahir dari pikiran kita. — Dhammapada',
        'Bersabarlah dengan segala sesuatu yang belum terselesaikan di hatimu. — Rainer Maria Rilke',
        'Kadang kau harus menghilang untuk bisa benar-benar ditemukan kembali. — Buku Puisi',
        'Hanya karena jalannya berbeda, bukan berarti kamu sedang tersesat. — Anonim',
        'Istirahatlah, jiwa yang lelah pun butuh waktu untuk sekadar menjadi. — Kutipan Sastra',
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
                            <NotificationDropdown />
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
                    </div>
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                    <div className="flex flex-col gap-10 lg:col-span-8">
                        <section className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-3xl bg-[#1464BC] p-6 shadow-md md:flex-row md:items-center md:p-8">
                            <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 translate-x-1/4 -translate-y-1/2 rounded-full bg-white opacity-5 blur-3xl" />

                            <div className="relative z-10 flex w-full items-center gap-5 md:w-auto">
                                <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/10 shadow-inner md:size-[100px]">
                                    <Calendar className="h-10 w-10 text-white opacity-90" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
                                        Obrolan Mendatang
                                    </span>
                                    <h2 className="m-0 text-2xl leading-tight font-bold text-white md:text-[28px]">
                                        {closestAppointment
                                            ? closestAppointment.psychologist_name
                                            : 'Belum ada jadwal'}
                                    </h2>
                                    {closestAppointment ? (
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-blue-100 md:text-[15px]">
                                            <Calendar className="h-4 w-4" />
                                            {new Intl.DateTimeFormat('id-ID', {
                                                dateStyle: 'long',
                                            }).format(
                                                new Date(
                                                    closestAppointment.appointment_date,
                                                ),
                                            )}
                                            ,{' '}
                                            {closestAppointment.start_time.substring(
                                                0,
                                                5,
                                            )}{' '}
                                            WIB
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-sm font-medium text-blue-100 md:text-[15px]">
                                            <Calendar className="h-4 w-4" />
                                            Silakan jadwalkan sesi dengan
                                            psikolog kami.
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Link
                                href={
                                    closestAppointment?.meeting_link ??
                                    '/sessions'
                                }
                                className={`relative z-10 flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl border-none px-6 py-3.5 text-[15px] font-bold text-[#1464BC] shadow-sm transition-colors md:w-auto ${closestAppointment ? 'bg-white hover:bg-blue-50' : 'cursor-not-allowed bg-[#e2e4e6] opacity-80'}`}
                            >
                                <MessageSquare className="h-5 w-5" />
                                Masuk Obrolan
                            </Link>
                        </section>

                        {topPsychologists && topPsychologists.length > 0 && (
                            <section>
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="m-0 text-xl font-bold text-[#191c1e]">
                                        Rekomendasi Psikolog Terbaik
                                    </h3>
                                    <Link
                                        href="/therapists"
                                        className="text-sm font-semibold text-[#1464BC] hover:underline"
                                    >
                                        Lihat Semua
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                                    {topPsychologists.map((therapist) => (
                                        <TherapistCard
                                            key={therapist.id}
                                            therapistId={therapist.id}
                                            image={
                                                therapist.photo_url ??
                                                defaultAvatar
                                            }
                                            name={therapist.name}
                                            specialty={
                                                therapist.specialization &&
                                                therapist.specialization
                                                    .length > 0
                                                    ? therapist.specialization.join(
                                                          ', ',
                                                      )
                                                    : 'Spesialisasi Umum'
                                            }
                                            rating={
                                                therapist.average_rating
                                                    ? therapist.average_rating.toString()
                                                    : '-'
                                            }
                                            reviews={
                                                therapist.review_count
                                                    ? therapist.review_count.toString()
                                                    : '0'
                                            }
                                            match="Sangat Cocok"
                                            price={new Intl.NumberFormat(
                                                'id-ID',
                                                {
                                                    style: 'currency',
                                                    currency: 'IDR',
                                                    maximumFractionDigits: 0,
                                                },
                                            ).format(therapist.price)}
                                            imageBg="bg-[#e1eef9]"
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="relative overflow-hidden rounded-3xl border border-[#e2e4e6] bg-white p-8 shadow-sm">
                            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-[#eef5fe]/50 blur-3xl" />

                            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                                <div className="flex size-14 items-center justify-center rounded-2xl bg-[#eef5fe] text-[#1464BC]">
                                    <Brain className="h-8 w-8" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className="m-0 text-xl font-bold text-[#191c1e]">
                                        Inspirasi Hari Ini
                                    </h3>
                                    <p className="m-0 max-w-[500px] text-[17px] leading-relaxed font-medium text-[#717783] italic">
                                        "{quote}"
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRefresh}
                                    className="mt-2 flex cursor-pointer items-center gap-2 rounded-xl bg-[#f2f4f6] px-5 py-2.5 text-sm font-bold text-[#1464BC] transition-all hover:bg-[#eef5fe] active:scale-95"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    Refresh Inspirasi
                                </button>
                            </div>
                        </section>
                    </div>

                    <aside className="flex flex-col gap-6 lg:col-span-4">
                        <section className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm">
                            <h3 className="m-0 mb-6 text-lg font-bold text-[#191c1e]">
                                Jadwal Terdekat
                            </h3>
                            <div className="flex flex-col gap-5">
                                {upcomingAppointments.length > 0 ? (
                                    upcomingAppointments
                                        .slice(0, 3)
                                        .map((appointment, idx) => (
                                            <div
                                                key={appointment.id}
                                                className="flex flex-col gap-2 border-b border-[#f2f4f6] pb-4 last:border-0 last:pb-0"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold text-[#191c1e]">
                                                        {
                                                            appointment.psychologist_name
                                                        }
                                                    </span>
                                                    <span className="rounded-md bg-[#eef5fe] px-2 py-1 text-[11px] font-bold tracking-wider text-[#1464BC] uppercase">
                                                        {appointment.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#717783]">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    <span>
                                                        {new Intl.DateTimeFormat(
                                                            'id-ID',
                                                            {
                                                                dateStyle:
                                                                    'medium',
                                                            },
                                                        ).format(
                                                            new Date(
                                                                appointment.appointment_date,
                                                            ),
                                                        )}{' '}
                                                        •{' '}
                                                        {appointment.start_time.substring(
                                                            0,
                                                            5,
                                                        )}{' '}
                                                        -{' '}
                                                        {appointment.end_time.substring(
                                                            0,
                                                            5,
                                                        )}{' '}
                                                        WIB
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="py-4 text-center text-sm font-medium text-[#717783]">
                                        Belum ada jadwal tersimpan.
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm">
                            <h3 className="m-0 mb-5 text-lg font-bold text-[#191c1e]">
                                Riwayat Terbaru
                            </h3>
                            <div className="flex flex-col gap-4">
                                {recentRecords && recentRecords.length > 0 ? (
                                    recentRecords.map((record) => (
                                        <Link
                                            href={`/records/${record.id}`}
                                            key={record.id}
                                            className="block no-underline"
                                        >
                                            <RecordItem
                                                icon={
                                                    <FileText className="h-6 w-6" />
                                                }
                                                title={`Sesi dengan ${record.psychologist_name}`}
                                                meta={record.session_date}
                                                className="bg-[#eef5fe] text-[#1464BC] transition-colors hover:bg-[#e1eef9]"
                                            />
                                        </Link>
                                    ))
                                ) : (
                                    <div className="py-4 text-center text-sm font-medium text-[#717783]">
                                        Belum ada riwayat konsultasi.
                                    </div>
                                )}

                                <Link
                                    href="/records"
                                    className="mt-2 flex w-full cursor-pointer items-center justify-center rounded-xl border border-[#e2e4e6] bg-white py-3 text-sm font-semibold text-[#191c1e] no-underline transition-colors hover:bg-[#f7f9fb]"
                                >
                                    Lihat Semua Riwayat
                                </Link>
                            </div>
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
    therapistId,
}: {
    image: string;
    name: string;
    specialty: string;
    rating: string;
    reviews: string;
    match: string;
    price: string;
    imageBg: string;
    therapistId: number;
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
                    href={`/therapists/${therapistId}`}
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

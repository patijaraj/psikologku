import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    Calendar,
    Clock,
    HelpCircle,
    Lock,
    LogOut,
    Menu,
    MessageSquare,
    Search,
    Settings,
    ShieldQuestion,
    Smile,
    Wallet,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';

type Schedule = {
    id: number;
    day_of_week: string;
    start_time: string;
    end_time: string;
};

type Therapist = {
    id: number;
    name: string;
    email?: string | null;
    str_number?: string | null;
    specialization?: string[] | null;
    price: number;
    is_online: boolean;
    photo_url?: string | null;
    schedules?: Schedule[];
    booked_appointments?: {
        schedule_id: number;
        appointment_date: string;
        start_time: string;
        end_time: string;
    }[];
};

type TherapistsProps = {
    therapists?: Therapist[];
    selectedTherapist?: Therapist | null;
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: true },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '/records', active: false },
];


const portraitImages = [
    'https://images.unsplash.com/photo-1659353887012-680771c1b497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1721674098745-7d1b76e0fc02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080',
];

function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(amount);
}

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

export default function Therapists({
    therapists = [],
    selectedTherapist = null,
}: TherapistsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTimes, setSelectedTimes] = useState<{schedule_id: number, start_time: string, end_time: string}[]>([]);
    const [search, setSearch] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState('all');
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Sarah';
    const userEmail = auth.user?.email ?? 'sarah@example.com';

    const specializations = useMemo(
        () =>
            Array.from(
                new Set(
                    therapists
                        .flatMap((therapist) => therapist.specialization || [])
                        .map((s) => s.trim())
                        .filter(Boolean),
                ),
            ),
        [therapists],
    );

    const filteredTherapists = useMemo(() => {
        const query = search.trim().toLowerCase();

        return therapists.filter((therapist) => {
            const matchesSearch =
                !query ||
                therapist.name.toLowerCase().includes(query) ||
                (therapist.specialization?.some(s => s.toLowerCase().includes(query)) ?? false);
            const matchesSpecialization =
                selectedSpecialization === 'all' ||
                (therapist.specialization?.includes(selectedSpecialization) ?? false);

            return matchesSearch && matchesSpecialization;
        });
    }, [search, selectedSpecialization, therapists]);

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head
                title={
                    selectedTherapist ? 'Jadwalkan Sesi' : 'Daftar Therapist'
                }
            />

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
                    </div>
                )}
            </nav>

            {selectedTherapist ? (
                <ScheduleView
                    therapist={selectedTherapist}
                    selectedDate={selectedDate}
                    selectedTimes={selectedTimes}
                    onSelectDate={setSelectedDate}
                    onSelectTimes={setSelectedTimes}
                />
            ) : (
                <ListingView
                    therapists={filteredTherapists}
                    allTherapistsCount={therapists.length}
                    search={search}
                    selectedSpecialization={selectedSpecialization}
                    specializations={specializations}
                    onSearch={setSearch}
                    onSelectSpecialization={setSelectedSpecialization}
                />
            )}
        </div>
    );
}

Therapists.layout = {};

function ListingView({
    therapists,
    allTherapistsCount,
    search,
    selectedSpecialization,
    specializations,
    onSearch,
    onSelectSpecialization,
}: {
    therapists: Therapist[];
    allTherapistsCount: number;
    search: string;
    selectedSpecialization: string;
    specializations: string[];
    onSearch: (value: string) => void;
    onSelectSpecialization: (value: string) => void;
}) {
    return (
        <main className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-8 sm:px-8 md:py-10 lg:grid-cols-[280px_1fr]">
            <aside className="flex flex-col gap-8 lg:sticky lg:top-[104px] lg:h-[calc(100vh-128px)]">
                <section>
                    <h2 className="m-0 mb-6 text-lg font-black text-[#191c1e]">
                        Filter
                    </h2>
                    <div className="mb-4 text-xs font-bold tracking-widest text-[#717783] uppercase">
                        Spesialisasi
                    </div>
                    <div className="flex flex-col gap-3">
                        <FilterButton
                            active={selectedSpecialization === 'all'}
                            label="Semua psikolog"
                            onClick={() => onSelectSpecialization('all')}
                        />
                        {specializations.map((specialization) => (
                            <FilterButton
                                key={specialization}
                                active={
                                    selectedSpecialization === specialization
                                }
                                label={specialization}
                                onClick={() =>
                                    onSelectSpecialization(specialization)
                                }
                            />
                        ))}
                    </div>
                </section>

                <section className="mt-auto rounded-2xl bg-[#dbeafe] p-6">
                    <h3 className="m-0 mb-2 text-base font-black text-[#0b4f8f]">
                        Butuh bantuan cepat?
                    </h3>
                    <p className="m-0 mb-5 text-sm leading-relaxed font-medium text-[#0b4f8f]">
                        Hubungi konselor darurat untuk bantuan awal.
                    </p>
                    <button
                        type="button"
                        className="h-12 w-full cursor-pointer rounded-xl border-none bg-[#0b4f8f] text-sm font-bold text-white transition-colors hover:bg-[#083d70]"
                    >
                        Contact Hotline
                    </button>
                </section>
            </aside>

            <section className="flex flex-col gap-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="m-0 mb-3 text-sm font-bold tracking-widest text-[#1464BC] uppercase">
                            {allTherapistsCount} therapist tersedia
                        </p>
                        <h1 className="m-0 max-w-[620px] text-[42px] leading-[0.95] font-black tracking-tight text-[#191c1e] md:text-[56px]">
                            Temukan psikolog yang tepat
                        </h1>
                        <p className="m-0 mt-5 max-w-[620px] text-lg leading-relaxed font-medium text-[#414751]">
                            Pilih psikolog dari database berdasarkan
                            spesialisasi, harga sesi, dan status online.
                        </p>
                    </div>

                    <div className="relative w-full lg:max-w-[300px]">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#717783]" />
                        <input
                            type="text"
                            value={search}
                            onChange={(event) => onSearch(event.target.value)}
                            placeholder="Cari nama atau spesialisasi..."
                            className="h-[74px] w-full rounded-2xl border border-transparent bg-white pr-5 pl-12 text-[15px] font-medium text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#717783] focus:border-[#1464BC] focus:ring-4 focus:ring-[#1464BC]/10"
                        />
                    </div>
                </div>

                {therapists.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {therapists.map((therapist, index) => (
                            <TherapistCard
                                key={therapist.id}
                                therapist={therapist}
                                image={
                                    portraitImages[
                                        index % portraitImages.length
                                    ]
                                }
                            />
                        ))}
                        <ReferralCard />
                    </div>
                ) : (
                    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#c1c7d3] bg-white p-8 text-center">
                        <ShieldQuestion className="mb-4 h-10 w-10 text-[#717783]" />
                        <h2 className="m-0 text-xl font-black text-[#191c1e]">
                            Belum ada therapist yang cocok
                        </h2>
                        <p className="m-0 mt-2 max-w-[420px] text-sm font-medium text-[#717783]">
                            Coba ubah kata kunci atau filter spesialisasi.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}

function FilterButton({
    active,
    label,
    onClick,
}: {
    active: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            className="flex cursor-pointer items-center gap-3 border-none bg-transparent p-0 text-left"
            onClick={onClick}
        >
            <span
                className={`flex size-5 items-center justify-center rounded border text-white ${
                    active
                        ? 'border-[#1464BC] bg-[#1464BC]'
                        : 'border-[#c1c7d3] bg-white'
                }`}
            >
                {active && <span className="size-2 rounded-full bg-white" />}
            </span>
            <span
                className={`text-[15px] font-semibold ${
                    active ? 'text-[#1464BC]' : 'text-[#414751]'
                }`}
            >
                {label}
            </span>
        </button>
    );
}

function TherapistCard({
    therapist,
    image,
}: {
    therapist: Therapist;
    image: string;
}) {
    return (
        <article className="flex min-h-[466px] flex-col rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(25,28,30,0.45)]">
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-xl bg-[#e1eef9]">
                <ImageWithFallback
                    src={therapist.photo_url ?? image}
                    alt={therapist.name}
                    className="h-full w-full object-cover"
                />
                <span
                    className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm ${
                        therapist.is_online
                            ? 'bg-[#dcfce7] text-[#166534]'
                            : 'bg-white text-[#717783]'
                    }`}
                >
                    {therapist.is_online ? 'Online' : 'Offline'}
                </span>
            </div>

            <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="m-0 text-[22px] leading-tight font-black text-[#191c1e]">
                    {therapist.name}
                </h2>
                <div className="shrink-0 text-right">
                    <span className="text-lg font-black text-[#1464BC]">
                        {formatRupiah(therapist.price)}
                    </span>
                    <div className="text-xs font-medium text-[#717783]">
                        per sesi
                    </div>
                </div>
            </div>

            {therapist.specialization && therapist.specialization.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {therapist.specialization.map(spec => (
                        <span key={spec} className="w-fit rounded-full bg-[#eef5fe] px-3 py-1 text-xs font-bold text-[#0b4f8f]">
                            {spec}
                        </span>
                    ))}
                </div>
            )}

            <div className="mb-6 flex flex-col gap-2 text-sm font-medium text-[#717783]">
                <span>{therapist.str_number ?? 'STR belum diisi'}</span>
                <span>Ulasan belum tersedia</span>
            </div>

            <Link
                href={`/therapists/${therapist.id}`}
                className="mt-auto flex h-14 items-center justify-center rounded-xl bg-[#1464BC] text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(0,93,167,0.55)] transition-colors hover:bg-[#1053A0]"
            >
                Book Now
            </Link>
        </article>
    );
}

function ReferralCard() {
    return (
        <article className="flex min-h-[466px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dde5] bg-white p-8 text-center">
            <span className="mb-6 flex size-16 items-center justify-center rounded-full bg-[#f2f4f6] text-[#717783]">
                <ShieldQuestion className="h-8 w-8" />
            </span>
            <h2 className="m-0 text-xl font-black text-[#191c1e]">
                Belum menemukan yang cocok?
            </h2>
            <p className="m-0 mt-3 text-sm leading-relaxed font-medium text-[#717783]">
                Ceritakan kebutuhan Anda dan tim kami akan membantu memilih
                therapist yang sesuai.
            </p>
            <button
                type="button"
                className="mt-8 h-14 w-full cursor-pointer rounded-xl border-2 border-[#1464BC] bg-white text-base font-bold text-[#1464BC] transition-colors hover:bg-[#eef5fe]"
            >
                Get a Referral
            </button>
        </article>
    );
}

// Helper for date generation
function getNext14Days(schedules?: Schedule[]) {
    if (!schedules || schedules.length === 0) {
return [];
}

    const availableDays = new Set(schedules.map((s) => s.day_of_week.toLowerCase()));
    
    const dayNamesMap: Record<number, string> = {
        0: 'minggu', 1: 'senin', 2: 'selasa', 3: 'rabu', 4: 'kamis', 5: 'jumat', 6: 'sabtu'
    };
    
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dayName = dayNamesMap[d.getDay()];
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        dates.push({
            dateObj: d,
            dateStr: `${year}-${month}-${day}`,
            dayNum: d.getDate(),
            dayNameShort: dayName.substring(0, 3).toUpperCase(),
            disabled: !availableDays.has(dayName),
        });
    }

    return dates;
}

function ScheduleView({
    therapist,
    selectedDate,
    selectedTimes,
    onSelectDate,
    onSelectTimes,
}: {
    therapist: Therapist;
    selectedDate: string;
    selectedTimes: any[];
    onSelectDate: (date: string) => void;
    onSelectTimes: (times: any[]) => void;
}) {
    const availableDates = getNext14Days(therapist.schedules);
    const availableSchedules = (therapist.schedules || []).filter(s => {
        if (!selectedDate) {
            return false;
        }

        const [y, m, day] = selectedDate.split('-').map(Number);
        const d = new Date(y, m - 1, day);
        const dayNamesMap: Record<number, string> = {
            0: 'minggu', 1: 'senin', 2: 'selasa', 3: 'rabu', 4: 'kamis', 5: 'jumat', 6: 'sabtu'
        };

        return s.day_of_week.toLowerCase() === dayNamesMap[d.getDay()];
    });

    const bookedForDate = (therapist.booked_appointments || []).filter(a => {
        const aDate = a.appointment_date.split('T')[0];
        return aDate === selectedDate;
    });

    const sessionCount = selectedTimes.length || 1;
    const totalPrice = therapist.price * sessionCount;

    return (
        <main className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 sm:px-8 md:py-12">
            <section className="flex flex-col gap-4">
                <Link
                    href="/therapists"
                    className="flex w-fit items-center gap-2 text-[15px] font-semibold text-[#1464BC] transition-colors hover:text-[#1053A0]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Kembali ke daftar therapist
                </Link>
                <div>
                    <h1 className="m-0 text-[32px] font-black tracking-tight text-[#191c1e] md:text-4xl">
                        Jadwalkan sesi Anda
                    </h1>
                    <p className="m-0 mt-2 text-base font-medium text-[#717783]">
                        Pilih waktu terbaik untuk sesi bersama {therapist.name}.
                    </p>
                </div>
            </section>

            <div className="flex flex-col items-start gap-8 lg:flex-row">
                <div className="flex w-full flex-col gap-6 lg:flex-[2]">
                    <DatePickerCard
                        availableDates={availableDates}
                        selectedDate={selectedDate}
                        onSelectDate={(date) => {
                            onSelectDate(date);
                            onSelectTimes([]); // Reset selected slots when changing date
                        }}
                    />

                    <TimePickerCard
                        availableSchedules={availableSchedules}
                        bookedForDate={bookedForDate}
                        selectedTimes={selectedTimes}
                        onSelectTimes={onSelectTimes}
                    />
                </div>

                <aside className="flex w-full flex-col gap-6 lg:max-w-[400px] lg:flex-1">
                    <TherapistSummaryCard therapist={therapist} />

                    <div className="rounded-3xl border border-[#e2e4e6]/50 bg-[#f2f4f6] p-6">
                        <h3 className="m-0 mb-6 text-lg font-black text-[#191c1e]">
                            Ringkasan Pemesanan
                        </h3>

                        <div className="mb-8 flex flex-col gap-5">
                            <SummaryItem
                                icon={<Calendar className="h-4 w-4" />}
                                label="Tanggal"
                                value={selectedDate ? new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(selectedDate)) : '-'}
                            />
                            <SummaryItem
                                icon={<Clock className="h-4 w-4" />}
                                label="Waktu"
                                value={selectedTimes.length > 0 ? selectedTimes.map(t => t.start_time.substring(0,5)).join(', ') + ' WIB' : '-'}
                            />
                            <div className="flex gap-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1464BC] shadow-sm">
                                    <Wallet className="h-4 w-4" />
                                </div>
                                <div className="flex flex-1 items-end justify-between gap-4">
                                    <div>
                                        <div className="mb-1 text-[11px] font-bold tracking-wider text-[#717783] uppercase">
                                            Biaya Konsultasi
                                        </div>
                                        <div className="text-xl font-bold text-[#191c1e]">
                                            {formatRupiah(totalPrice)}
                                        </div>
                                    </div>
                                    <div className="mb-1 rounded-md bg-[#e2e4e6] px-2 py-1 text-[11px] font-medium text-[#717783]">
                                        {sessionCount} sesi
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/payment?psychologist_id=${therapist.id}${selectedTimes.length > 0 && selectedDate ? `&schedule_id=${selectedTimes[0].schedule_id}&date=${selectedDate}&times=${selectedTimes.map(t => t.start_time).join(',')}` : ''}`}
                            className={`mb-4 flex h-[52px] w-full items-center justify-center gap-2 rounded-[14px] border-none text-base font-semibold text-white shadow-[0_8px_20px_-4px_rgba(0,93,167,0.4)] transition-colors ${selectedTimes.length > 0 && selectedDate ? 'bg-[#1464BC] hover:bg-[#1053A0] cursor-pointer' : 'bg-[#c1c7d3] cursor-not-allowed'}`}
                            onClick={(e) => {
                                if (selectedTimes.length === 0 || !selectedDate) {
                                    e.preventDefault();
                                }
                            }}
                        >
                            Konfirmasi Pemesanan
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <div className="flex items-center justify-center gap-2 text-[#717783]">
                            <Lock className="h-3.5 w-3.5" />
                            <span className="text-xs font-medium">
                                Pembayaran aman & terenkripsi
                            </span>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-2xl border border-[#1464BC]/10 bg-[#e1eef9] p-4">
                        <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#1464BC]" />
                        <p className="m-0 text-[13px] leading-normal font-medium text-[#414751]">
                            Butuh bantuan dengan pemesanan Anda? Tim dukungan
                            kami tersedia 24/7 untuk bantuan teknis.
                        </p>
                    </div>
                </aside>
            </div>
        </main>
    );
}

function DatePickerCard({
    availableDates,
    selectedDate,
    onSelectDate,
}: {
    availableDates: any[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}) {
    const week1 = availableDates.slice(0, 7);
    const week2 = availableDates.slice(7, 14);

    return (
        <section className="rounded-3xl border border-[#e2e4e6]/50 bg-white p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-[#f2f4f6] p-2 text-[#1464BC]">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <h2 className="m-0 text-lg font-black text-[#191c1e]">
                        Pilih Tanggal
                    </h2>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <DateRow
                    items={week1}
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                />
                <DateRow
                    items={week2}
                    selectedDate={selectedDate}
                    onSelectDate={onSelectDate}
                />
            </div>
        </section>
    );
}

function DateRow({
    items,
    selectedDate,
    onSelectDate,
}: {
    items: any[];
    selectedDate: string;
    onSelectDate: (date: string) => void;
}) {
    if (items.length === 0) {
        return null;
    }

    return (
        <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {items.map((item) => (
                <div key={item.dateStr} className="flex flex-col items-center gap-2">
                    <div className="text-[11px] font-bold tracking-widest text-[#a0a5b1]">
                        {item.dayNameShort}
                    </div>
                    <button
                        type="button"
                        disabled={item.disabled}
                        onClick={() => !item.disabled && onSelectDate(item.dateStr)}
                        className={`flex aspect-square w-full cursor-pointer items-center justify-center rounded-[14px] border-none text-[15px] font-semibold transition-all md:aspect-auto md:h-14 ${
                            item.disabled
                                ? 'cursor-not-allowed bg-transparent text-[#c1c7d3]'
                                : selectedDate === item.dateStr
                                  ? 'bg-[#1464BC] text-white shadow-[0_8px_16px_-4px_rgba(0,93,167,0.3)]'
                                  : 'bg-[#f7f9fb] text-[#191c1e] hover:bg-[#e2e4e6]'
                        }`}
                    >
                        {item.dayNum}
                    </button>
                </div>
            ))}
        </div>
    );
}

function TimePickerCard({
    availableSchedules,
    bookedForDate,
    selectedTimes,
    onSelectTimes,
}: {
    availableSchedules: Schedule[];
    bookedForDate: any[];
    selectedTimes: any[];
    onSelectTimes: (times: any[]) => void;
}) {
    // Generate 1-hour slots from available schedules
    const slots: any[] = [];
    availableSchedules.forEach(schedule => {
        const startHour = parseInt(schedule.start_time.split(':')[0]);
        const endHour = parseInt(schedule.end_time.split(':')[0]);
        for (let h = startHour; h < endHour; h++) {
            const slotStartTime = `${h.toString().padStart(2, '0')}:00:00`;
            const isBooked = bookedForDate.some(b => 
                b.schedule_id === schedule.id && 
                b.start_time.startsWith(slotStartTime.substring(0, 5))
            );
            
            if (!isBooked) {
                slots.push({
                    schedule_id: schedule.id,
                    start_time: slotStartTime,
                    end_time: `${(h+1).toString().padStart(2, '0')}:00:00`
                });
            }
        }
    });

    const morningSlots = slots.filter(s => parseInt(s.start_time.split(':')[0]) < 12);
    const afternoonSlots = slots.filter(s => parseInt(s.start_time.split(':')[0]) >= 12);

    return (
        <section className="rounded-3xl border border-[#e2e4e6]/50 bg-white p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
            <div className="mb-8 flex items-center gap-3">
                <div className="rounded-xl bg-[#f2f4f6] p-2 text-[#1464BC]">
                    <Clock className="h-5 w-5" />
                </div>
                <h2 className="m-0 text-lg font-black text-[#191c1e]">
                    Jadwal Tersedia
                </h2>
            </div>

            {slots.length === 0 && (
                <div className="text-sm font-medium text-[#717783] py-4 text-center">
                    Pilih tanggal yang tersedia untuk melihat jadwal.
                </div>
            )}

            {morningSlots.length > 0 && (
                <TimeSlotGroup
                    title="Sesi Pagi"
                    slots={morningSlots}
                    selectedTimes={selectedTimes}
                    onSelectTimes={onSelectTimes}
                />
            )}
            
            {afternoonSlots.length > 0 && (
                <TimeSlotGroup
                    title="Sesi Siang / Sore"
                    slots={afternoonSlots}
                    selectedTimes={selectedTimes}
                    onSelectTimes={onSelectTimes}
                />
            )}
        </section>
    );
}

function TimeSlotGroup({
    title,
    slots,
    selectedTimes,
    onSelectTimes,
}: {
    title: string;
    slots: any[];
    selectedTimes: any[];
    onSelectTimes: (times: any[]) => void;
}) {
    return (
        <div className="mb-6 last:mb-0">
            <h3 className="m-0 mb-4 text-[13px] font-bold tracking-widest text-[#a0a5b1] uppercase">
                {title}
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {slots.map((slot) => {
                    const isSelected = selectedTimes.some(t => t.schedule_id === slot.schedule_id && t.start_time === slot.start_time);

                    return (
                        <button
                            key={`${slot.schedule_id}-${slot.start_time}`}
                            type="button"
                            onClick={() => {
                                if (isSelected) {
                                    onSelectTimes([]);
                                } else {
                                    onSelectTimes([slot]);
                                }
                            }}
                            className={`flex h-[42px] cursor-pointer items-center justify-center rounded-xl border-none text-[15px] font-bold transition-all ${
                                isSelected
                                    ? 'bg-[#eef5fe] text-[#1464BC] ring-2 ring-[#1464BC]'
                                    : 'bg-[#f7f9fb] text-[#414751] hover:bg-[#e2e4e6] hover:text-[#191c1e]'
                            }`}
                        >
                            {slot.start_time.substring(0, 5)} WIB
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function TherapistSummaryCard({ therapist }: { therapist: Therapist }) {
    return (
        <section className="rounded-3xl border border-[#e2e4e6]/50 bg-white p-5 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
            <div className="mb-5 flex items-center gap-4 border-b border-[#f2f4f6] pb-5">
                <div className="relative">
                    {therapist.photo_url ? (
                        <img
                            src={therapist.photo_url}
                            alt={therapist.name}
                            className="size-16 rounded-2xl object-cover border border-[#e2e4e6] shadow-xs"
                        />
                    ) : (
                        <InitialsAvatar
                            name={therapist.name}
                            className="size-16 rounded-2xl text-lg"
                        />
                    )}
                    <div
                        className={`absolute -right-1 -bottom-1 size-4 rounded-full border-2 border-white ${
                            therapist.is_online
                                ? 'bg-[#10b981]'
                                : 'bg-[#c1c7d3]'
                        }`}
                    />
                </div>
                <div>
                    <h3 className="m-0 mb-1 text-base font-black text-[#191c1e]">
                        {therapist.name}
                    </h3>
                    <p className="m-0 mb-1 text-[13px] font-semibold text-[#1464BC]">
                        {therapist.specialization && therapist.specialization.length > 0
                            ? therapist.specialization.join(', ')
                            : 'Spesialisasi belum diisi'}
                    </p>
                    <p className="m-0 text-xs font-medium text-[#717783]">
                        Ulasan belum tersedia
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-4 text-[13px]">
                <span className="font-medium text-[#717783]">STR</span>
                <span className="truncate text-right font-bold text-[#191c1e]">
                    {therapist.str_number ?? 'Belum diisi'}
                </span>
            </div>
        </section>
    );
}

function SummaryItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#1464BC] shadow-sm">
                {icon}
            </div>
            <div>
                <div className="mb-1 text-[11px] font-bold tracking-wider text-[#717783] uppercase">
                    {label}
                </div>
                <div className="text-[15px] font-bold text-[#191c1e]">
                    {value}
                </div>
            </div>
        </div>
    );
}

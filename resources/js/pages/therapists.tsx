import { Head, Link } from '@inertiajs/react';
import {
    ArrowRight,
    Bell,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    HelpCircle,
    Lock,
    Menu,
    MessageSquare,
    Smile,
    Star,
    Wallet,
    X,
} from 'lucide-react';
import { useState } from 'react';

const profileImg =
    'https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc3ODAzMDI3MXww&ixlib=rb-4.1.0&q=80&w=1080';

const drElenaImg =
    'https://images.unsplash.com/photo-1659353887012-680771c1b497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHhpc3BhbmljJTIwZmVtYWxlJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTEzNTA3fDA&ixlib=rb-4.1.0&q=80&w=1080';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: true },
    { label: 'Sessions', path: '#', active: false },
    { label: 'Record', path: '#', active: false },
];

const days = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

const week1 = [
    { date: 28, disabled: true },
    { date: 29, disabled: true },
    { date: 30, disabled: true },
    { date: 31, disabled: true },
    { date: 1, disabled: false },
    { date: 2, disabled: false },
    { date: 3, disabled: false },
];

const week2 = [
    { date: 4, disabled: false },
    { date: 5, disabled: false },
    { date: 6, disabled: false },
    { date: 7, disabled: false },
    { date: 8, disabled: false },
    { date: 9, disabled: false },
    { date: 10, disabled: false },
];

const morningSlots = [
    { time: '09:00', label: '09:00 WIB', disabled: false },
    { time: '10:00', label: '10:00 WIB', disabled: false },
    { time: '11:00', label: '11:00 WIB', disabled: false },
    { time: '11:30', label: '11:30 WIB', disabled: true },
];

const afternoonSlots = [
    { time: '14:00', label: '14:00 WIB', disabled: false },
    { time: '15:00', label: '15:00 WIB', disabled: false },
    { time: '16:30', label: '16:30 WIB', disabled: false },
    { time: '17:00', label: '17:00 WIB', disabled: false },
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

export default function Therapists() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(5);
    const [selectedTime, setSelectedTime] = useState('14:00');
    const endHour = Number(selectedTime.split(':')[0]) + 1;

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Book Therapist" />

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
                    </div>
                )}
            </nav>

            <main className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 sm:px-8 md:py-12">
                <section className="flex flex-col gap-2">
                    <h1 className="m-0 text-[32px] font-black tracking-tight text-[#191c1e] md:text-4xl">
                        Jadwalkan sesi Anda
                    </h1>
                    <p className="m-0 text-base font-medium text-[#717783]">
                        Pilih waktu terbaik untuk perjalanan kesehatan mental
                        Anda.
                    </p>
                </section>

                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    <div className="flex w-full flex-col gap-6 lg:flex-[2]">
                        <DatePickerCard
                            selectedDate={selectedDate}
                            onSelectDate={setSelectedDate}
                        />

                        <TimePickerCard
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                        />
                    </div>

                    <aside className="flex w-full flex-col gap-6 lg:max-w-[400px] lg:flex-1">
                        <TherapistSummaryCard />

                        <div className="rounded-3xl border border-[#e2e4e6]/50 bg-[#f2f4f6] p-6">
                            <h3 className="m-0 mb-6 text-lg font-black text-[#191c1e]">
                                Ringkasan Pemesanan
                            </h3>

                            <div className="mb-8 flex flex-col gap-5">
                                <SummaryItem
                                    icon={<Calendar className="h-4 w-4" />}
                                    label="Tanggal"
                                    value={`${selectedDate} Oktober 2026`}
                                />
                                <SummaryItem
                                    icon={<Clock className="h-4 w-4" />}
                                    label="Waktu"
                                    value={`${selectedTime} - ${String(endHour).padStart(2, '0')}:00 WIB`}
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
                                                Rp 250.000
                                            </div>
                                        </div>
                                        <div className="mb-1 rounded-md bg-[#e2e4e6] px-2 py-1 text-[11px] font-medium text-[#717783]">
                                            Per sesi
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/payment"
                                className="mb-4 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-none bg-[#1464BC] text-base font-semibold text-white shadow-[0_8px_20px_-4px_rgba(0,93,167,0.4)] transition-colors hover:bg-[#1053A0]"
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
                                Butuh bantuan dengan pemesanan Anda? Tim
                                dukungan kami tersedia 24/7 untuk bantuan
                                teknis.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

Therapists.layout = {};

function DatePickerCard({
    selectedDate,
    onSelectDate,
}: {
    selectedDate: number;
    onSelectDate: (date: number) => void;
}) {
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
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-[#e2e4e6] bg-white text-[#717783] transition-colors hover:bg-[#f2f4f6]"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-[#e2e4e6] bg-white text-[#191c1e] transition-colors hover:bg-[#f2f4f6]"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-7 gap-2 text-center">
                    {days.map((day) => (
                        <div
                            key={day}
                            className="pb-2 text-xs font-bold tracking-widest text-[#a0a5b1]"
                        >
                            {day}
                        </div>
                    ))}
                </div>

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
    items: Array<{ date: number; disabled: boolean }>;
    selectedDate: number;
    onSelectDate: (date: number) => void;
}) {
    return (
        <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {items.map((item) => (
                <button
                    key={item.date}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => !item.disabled && onSelectDate(item.date)}
                    className={`flex aspect-square cursor-pointer items-center justify-center rounded-[14px] border-none text-[15px] font-semibold transition-all md:aspect-auto md:h-14 ${
                        item.disabled
                            ? 'cursor-not-allowed bg-transparent text-[#c1c7d3]'
                            : selectedDate === item.date
                              ? 'bg-[#1464BC] text-white shadow-[0_8px_16px_-4px_rgba(0,93,167,0.3)]'
                              : 'bg-[#f7f9fb] text-[#191c1e] hover:bg-[#e2e4e6]'
                    }`}
                >
                    {item.date}
                </button>
            ))}
        </div>
    );
}

function TimePickerCard({
    selectedTime,
    onSelectTime,
}: {
    selectedTime: string;
    onSelectTime: (time: string) => void;
}) {
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

            <TimeSlotGroup
                title="Sesi Pagi"
                slots={morningSlots}
                selectedTime={selectedTime}
                onSelectTime={onSelectTime}
            />
            <TimeSlotGroup
                title="Sesi Siang / Sore"
                slots={afternoonSlots}
                selectedTime={selectedTime}
                onSelectTime={onSelectTime}
            />
        </section>
    );
}

function TimeSlotGroup({
    title,
    slots,
    selectedTime,
    onSelectTime,
}: {
    title: string;
    slots: Array<{ time: string; label: string; disabled: boolean }>;
    selectedTime: string;
    onSelectTime: (time: string) => void;
}) {
    return (
        <div className="mb-6 last:mb-0">
            <div className="mb-4 text-xs font-bold tracking-widest text-[#a0a5b1] uppercase">
                {title}
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {slots.map((slot) => (
                    <button
                        key={slot.time}
                        type="button"
                        disabled={slot.disabled}
                        onClick={() =>
                            !slot.disabled && onSelectTime(slot.time)
                        }
                        className={`flex h-12 cursor-pointer items-center justify-center rounded-[14px] border-none text-sm font-semibold transition-all ${
                            slot.disabled
                                ? 'cursor-not-allowed bg-[#f7f9fb]/50 text-[#c1c7d3]'
                                : selectedTime === slot.time
                                  ? 'bg-[#1464BC] text-white shadow-[0_4px_12px_-2px_rgba(0,93,167,0.3)]'
                                  : 'bg-[#f7f9fb] text-[#191c1e] hover:bg-[#e2e4e6]'
                        }`}
                    >
                        {slot.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function TherapistSummaryCard() {
    return (
        <section className="rounded-3xl border border-[#e2e4e6]/50 bg-white p-5 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
            <div className="mb-5 flex items-center gap-4 border-b border-[#f2f4f6] pb-5">
                <div className="relative">
                    <div className="size-16 overflow-hidden rounded-2xl">
                        <ImageWithFallback
                            src={drElenaImg}
                            alt="Dr. Elena"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="absolute -right-1 -bottom-1 size-4 rounded-full border-2 border-white bg-[#10b981]" />
                </div>
                <div>
                    <h3 className="m-0 mb-1 text-base font-black text-[#191c1e]">
                        Dr. Elena Rodriguez
                    </h3>
                    <p className="m-0 mb-1 text-[13px] font-semibold text-[#1464BC]">
                        Psikolog Klinis
                    </p>
                    <div className="flex items-center gap-1 text-xs font-medium text-[#717783]">
                        <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        <span className="font-bold text-[#191c1e]">4.9</span>
                        <span>(124 ulasan)</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between text-[13px]">
                <span className="font-medium text-[#717783]">Spesialisasi</span>
                <span className="font-bold text-[#191c1e]">
                    CBT & Mindfulness
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

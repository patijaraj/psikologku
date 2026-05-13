import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    Building2,
    CheckCircle2,
    Clock,
    CreditCard,
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
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '#', active: false },
];

const paymentOptions = [
    {
        id: 'ewallet',
        label: 'GoPay / OVO / E-Wallet',
        icon: Wallet,
    },
    {
        id: 'bank',
        label: 'Transfer Bank Langsung',
        icon: Building2,
    },
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

export default function Payment() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <div className="min-h-screen bg-[#f7f9fb] pb-20 font-sans">
            <Head title="Payment" />

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

            <main className="mx-auto flex max-w-[1024px] flex-col gap-8 px-4 py-8 sm:px-8 md:py-12">
                <section className="flex flex-col gap-6">
                    <Link
                        href="/therapists"
                        className="flex w-fit items-center gap-2 text-[15px] font-semibold text-[#1464BC] transition-colors hover:text-[#1053A0]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>

                    <div className="flex flex-col gap-2">
                        <h1 className="m-0 text-[32px] font-black tracking-tight text-[#191c1e] md:text-4xl">
                            Konfirmasi & Bayar
                        </h1>
                        <p className="m-0 text-base font-medium text-[#717783]">
                            Sesi Anda dengan Dr. Elena Rodriguez telah dipesan
                            untuk 5 Oktober 2026.
                        </p>
                    </div>
                </section>

                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    <section className="flex w-full flex-col gap-6 lg:flex-[1.5]">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#d1fae5] bg-[#ecfdf5] p-4">
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#10b981]" />
                            <p className="m-0 text-sm font-medium text-[#065f46]">
                                Pembayaran Anda terenkripsi dan diamankan oleh
                                teknologi SSL.
                            </p>
                        </div>

                        <h2 className="m-0 mt-2 text-xl font-bold text-[#191c1e]">
                            Pilih Metode Pembayaran
                        </h2>

                        <div className="flex flex-col gap-4">
                            <div
                                className={`overflow-hidden rounded-2xl border-2 bg-white transition-all ${
                                    paymentMethod === 'card'
                                        ? 'border-[#1464BC] shadow-[0_4px_24px_rgba(0,93,167,0.08)]'
                                        : 'cursor-pointer border-[#e2e4e6] hover:border-[#c1c7d3]'
                                }`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                <div className="flex items-center justify-between border-b border-[#f2f4f6] p-5">
                                    <div className="flex items-center gap-3">
                                        <CreditCard
                                            className={`h-6 w-6 ${
                                                paymentMethod === 'card'
                                                    ? 'text-[#1464BC]'
                                                    : 'text-[#717783]'
                                            }`}
                                        />
                                        <span className="text-base font-bold text-[#191c1e]">
                                            Kartu Kredit atau Debit
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex h-5 w-8 items-center justify-center rounded border border-[#e2e4e6] bg-[#f2f4f6]">
                                            <div className="-mr-2 h-4 w-4 rounded-full bg-[#eb001b] opacity-80" />
                                            <div className="h-4 w-4 rounded-full bg-[#f79e1b] opacity-80" />
                                        </div>
                                        <div className="flex h-5 w-8 items-center justify-center rounded border border-[#e2e4e6] bg-[#f2f4f6] text-[10px] font-bold text-[#1a1f71] italic">
                                            VISA
                                        </div>
                                    </div>
                                </div>

                                {paymentMethod === 'card' && (
                                    <CardPaymentFields />
                                )}
                            </div>

                            {paymentOptions.map((option) => {
                                const Icon = option.icon;
                                const selected = paymentMethod === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 transition-all ${
                                            selected
                                                ? 'border-[#1464BC] bg-white'
                                                : 'border-transparent bg-[#f7f9fb] hover:border-[#e2e4e6]'
                                        }`}
                                        onClick={() =>
                                            setPaymentMethod(option.id)
                                        }
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon
                                                className={`h-6 w-6 ${
                                                    selected
                                                        ? 'text-[#1464BC]'
                                                        : 'text-[#717783]'
                                                }`}
                                            />
                                            <span className="text-base font-bold text-[#191c1e]">
                                                {option.label}
                                            </span>
                                        </div>
                                        <span
                                            className={`flex size-5 items-center justify-center rounded-full border-2 ${
                                                selected
                                                    ? 'border-[#1464BC]'
                                                    : 'border-[#c1c7d3]'
                                            }`}
                                        >
                                            {selected && (
                                                <span className="size-2.5 rounded-full bg-[#1464BC]" />
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <p className="mt-2 text-sm text-[#717783]">
                            Dengan mengklik "Selesaikan Pemesanan", Anda
                            menyetujui{' '}
                            <a
                                href="#"
                                className="font-semibold text-[#1464BC] hover:underline"
                            >
                                Syarat Layanan
                            </a>{' '}
                            dan{' '}
                            <a
                                href="#"
                                className="font-semibold text-[#1464BC] hover:underline"
                            >
                                Kebijakan Pembatalan
                            </a>
                            .
                        </p>
                    </section>

                    <aside className="w-full lg:max-w-[400px] lg:flex-1">
                        <div className="rounded-3xl bg-[#f7f9fb] p-6 lg:p-8">
                            <h2 className="m-0 mb-6 text-[22px] font-black text-[#191c1e]">
                                Ringkasan Pemesanan
                            </h2>

                            <div className="mb-8 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                                <div className="size-14 shrink-0 overflow-hidden rounded-xl">
                                    <ImageWithFallback
                                        src={drElenaImg}
                                        alt="Dr. Elena"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="m-0 mb-0.5 text-base font-bold text-[#191c1e]">
                                        Dr. Elena Rodriguez
                                    </h3>
                                    <p className="m-0 mb-1 text-[13px] font-medium text-[#717783]">
                                        Cognitive Behavioral Therapy
                                    </p>
                                    <div className="flex items-center gap-1 text-xs font-bold text-[#10b981]">
                                        <Star className="h-3.5 w-3.5 fill-[#10b981] text-[#10b981]" />
                                        <span>4.9 (124 ulasan)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6 flex flex-col gap-4 text-[15px]">
                                <PriceRow
                                    label="Sesi Chat 60 menit"
                                    value="Rp 250.000"
                                />
                                <PriceRow
                                    label="Biaya Layanan"
                                    value="Rp 10.000"
                                />
                                <div className="flex items-center justify-between font-semibold text-[#10b981]">
                                    <span>Diskon Promo</span>
                                    <span>-Rp 50.000</span>
                                </div>
                            </div>

                            <div className="mb-6 h-px w-full bg-[#e2e4e6]" />

                            <div className="mb-8 flex items-end justify-between gap-4">
                                <div>
                                    <div className="mb-1 text-[13px] font-medium text-[#717783]">
                                        Total Pembayaran
                                    </div>
                                    <div className="text-4xl leading-none font-black text-[#191c1e]">
                                        Rp 210.000
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="mb-1 text-[10px] font-bold tracking-wider text-[#717783] uppercase">
                                        Dibayar Hari Ini
                                    </div>
                                    <div className="text-xs font-bold tracking-wider text-[#10b981] uppercase">
                                        Hemat Rp 50.000
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/dashboard"
                                className="mb-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#1464BC] text-base font-bold text-white shadow-[0_8px_24px_-8px_rgba(0,93,167,0.5)] transition-colors hover:bg-[#1053A0]"
                            >
                                Selesaikan Pemesanan
                                <ArrowRight className="h-5 w-5" />
                            </Link>

                            <div className="flex items-center justify-center gap-6 pt-2">
                                <TrustBadge
                                    icon={<CheckCircle2 className="h-4 w-4" />}
                                    label="Sesuai Standar"
                                />
                                <TrustBadge
                                    icon={<Clock className="h-4 w-4" />}
                                    label="Batal 24 Jam"
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

Payment.layout = {};

function CardPaymentFields() {
    return (
        <div className="flex flex-col gap-4 bg-white p-5">
            <PaymentInput
                label="Nama Pemilik Kartu"
                placeholder="Sarah Johnson"
            />

            <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-wider text-[#414751] uppercase">
                    Nomor Kartu
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="h-12 w-full rounded-xl border border-transparent bg-[#f7f9fb] px-4 pr-10 text-[15px] text-[#191c1e] transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                    />
                    <Lock className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-[#a0a5b1]" />
                </div>
            </div>

            <div className="flex gap-4">
                <PaymentInput
                    label="Tgl Kedaluwarsa"
                    placeholder="MM / YY"
                    className="flex-1"
                />
                <PaymentInput
                    label="CVV"
                    placeholder="***"
                    type="password"
                    maxLength={3}
                    className="flex-1"
                />
            </div>
        </div>
    );
}

function PaymentInput({
    label,
    placeholder,
    type = 'text',
    maxLength,
    className,
}: {
    label: string;
    placeholder: string;
    type?: string;
    maxLength?: number;
    className?: string;
}) {
    return (
        <div className={`flex flex-col gap-2 ${className ?? ''}`}>
            <label className="text-xs font-bold tracking-wider text-[#414751] uppercase">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                className="h-12 w-full rounded-xl border border-transparent bg-[#f7f9fb] px-4 text-[15px] text-[#191c1e] transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
            />
        </div>
    );
}

function PriceRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between text-[#414751]">
            <span>{label}</span>
            <span className="font-bold text-[#191c1e]">{value}</span>
        </div>
    );
}

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-1.5">
            <span className="text-[#10b981]">{icon}</span>
            <span className="text-[11px] font-bold tracking-wider text-[#414751] uppercase">
                {label}
            </span>
        </div>
    );
}

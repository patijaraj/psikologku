import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Bell,
    CheckCircle2,
    Clock,
    CreditCard,
    Loader2,
    Lock,
    Menu,
    MessageSquare,
    ShieldCheck,
    Smile,
    Wallet,
    X,
    Star,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { InitialsAvatar } from '@/components/initials-avatar';
import { Button } from '@/components/ui/button';
import { dashboard, sessions, therapists } from '@/routes';
import { NotificationDropdown } from '@/components/notification-dropdown';

const navItems = [
    { label: 'Dashboard', path: dashboard.url(), active: false },
    { label: 'Therapist', path: therapists.url(), active: false },
    { label: 'Sessions', path: sessions.url(), active: false },
    { label: 'Record', path: '/records', active: false },
];

type SnapPaymentResult = Record<string, unknown>;

type TherapistSummary = {
    id: number;
    name: string;
    email?: string | null;
    str_number?: string | null;
    specialization?: string[] | null;
    price: number;
    is_online: boolean;
    photo_url?: string | null;
    average_rating?: number | null;
    review_count?: number;
};

interface PaymentProps {
    snapToken?: string;
    orderId?: string;
    amount?: number;
    therapist?: TherapistSummary | null;
}

declare global {
    interface Window {
        snap?: {
            pay: (
                token: string,
                callbacks: {
                    onSuccess: (result: SnapPaymentResult) => void;
                    onPending: (result: SnapPaymentResult) => void;
                    onError: (result: SnapPaymentResult) => void;
                    onClose: () => void;
                },
            ) => void;
        };
    }
}

function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function Payment({
    snapToken,
    orderId = 'Menunggu order',
    amount = 150000,
    therapist = null,
}: PaymentProps) {
    const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    const snapScriptUrl =
        import.meta.env.VITE_MIDTRANS_SNAP_URL ??
        'https://app.sandbox.midtrans.com/snap/snap.js';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSnapReady, setIsSnapReady] = useState(() =>
        typeof window === 'undefined' ? false : Boolean(window.snap),
    );
    const [snapError, setSnapError] = useState<string | null>(null);
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Sarah';
    const configurationError = clientKey
        ? null
        : 'Client key Midtrans belum dikonfigurasi.';
    const visibleSnapError = snapError ?? configurationError;
    const formattedAmount = useMemo(() => formatRupiah(amount), [amount]);

    useEffect(() => {
        if (!clientKey) {
            return;
        }

        const existingScript = document.getElementById('midtrans-snap-script');

        if (existingScript) {
            if (window.snap) {
                window.requestAnimationFrame(() => setIsSnapReady(true));
            }

            return;
        }

        const script = document.createElement('script');
        script.id = 'midtrans-snap-script';
        script.src = snapScriptUrl;
        script.setAttribute('data-client-key', clientKey);
        script.async = true;
        script.onload = () => {
            setIsSnapReady(true);
            setSnapError(null);
        };
        script.onerror = () => {
            setSnapError('Gagal memuat Midtrans Snap.');
            setIsSnapReady(false);
        };

        document.body.appendChild(script);

        return () => {
            script.remove();
        };
    }, [clientKey, snapScriptUrl]);

    const handlePay = () => {
        if (!snapToken) {
            setSnapError('Token pembayaran belum tersedia.');

            return;
        }

        if (!window.snap || !isSnapReady) {
            setSnapError('Midtrans Snap belum siap. Coba lagi sebentar.');

            return;
        }

        window.snap.pay(snapToken, {
            onSuccess: (result) => {
                console.log('Pembayaran sukses!', result);
                router.visit(dashboard.url());
            },
            onPending: (result) => {
                console.log('Menunggu pembayaran!', result);
            },
            onError: (result) => {
                console.log('Pembayaran gagal!', result);
                setSnapError('Pembayaran gagal diproses. Silakan coba lagi.');
            },
            onClose: () => {
                console.log('Popup ditutup tanpa menyelesaikan pembayaran');
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] pb-20 font-sans">
            <Head title="Pembayaran Konsultasi" />

            <nav className="sticky top-0 z-50 border-b border-[#e2e4e6] bg-white">
                <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-8 lg:gap-16">
                        <Link
                            href={dashboard.url()}
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
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="hidden items-center gap-2 sm:flex">
                            <NotificationDropdown />
                        </div>
                        <div className="hidden h-6 w-px bg-[#e2e4e6] sm:block" />
                        <button
                            type="button"
                            aria-label="Profil"
                            className="flex shrink-0 cursor-pointer items-center rounded-full border-none bg-transparent p-1 transition-all hover:ring-2 hover:ring-[#e2e4e6]"
                        >
                            <InitialsAvatar
                                name={userName}
                                photoUrl={(auth.user as any)?.photo_url}
                                className="size-9"
                            />
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
                                className="rounded-xl p-3 text-[15px] font-semibold text-[#717783] hover:bg-[#f7f9fb]"
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
                        href={
                            therapist
                                ? `/therapists/${therapist.id}`
                                : therapists.url()
                        }
                        className="flex w-fit items-center gap-2 text-[15px] font-semibold text-[#1464BC] transition-colors hover:text-[#1053A0]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>

                    <div className="flex flex-col gap-2">
                        <h1 className="m-0 text-[32px] font-black tracking-tight text-[#191c1e] md:text-4xl">
                            Selesaikan Pembayaran
                        </h1>
                        <p className="m-0 text-base font-medium text-[#717783]">
                            Order ID: {orderId}
                        </p>
                    </div>
                </section>

                <div className="flex flex-col items-start gap-8 lg:flex-row">
                    <section className="flex w-full flex-col gap-6 lg:flex-[1.5]">
                        <div className="flex items-center gap-3 rounded-2xl border border-[#d1fae5] bg-[#ecfdf5] p-4">
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-[#10b981]" />
                            <p className="m-0 text-sm font-medium text-[#065f46]">
                                Pembayaran diproses melalui Midtrans Snap dan
                                dilindungi enkripsi SSL.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3">
                                <span className="flex size-12 items-center justify-center rounded-2xl bg-[#eef5fe] text-[#1464BC]">
                                    <Wallet className="h-6 w-6" />
                                </span>
                                <div>
                                    <h2 className="m-0 text-xl font-bold text-[#191c1e]">
                                        Midtrans Snap
                                    </h2>
                                    <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                        Pilih kartu, transfer bank, e-wallet,
                                        atau QRIS di popup pembayaran.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <PaymentFeature
                                    icon={<CreditCard className="h-5 w-5" />}
                                    label="Kartu"
                                />
                                <PaymentFeature
                                    icon={<Wallet className="h-5 w-5" />}
                                    label="E-Wallet"
                                />
                                <PaymentFeature
                                    icon={<ShieldCheck className="h-5 w-5" />}
                                    label="Aman"
                                />
                            </div>

                            {visibleSnapError && (
                                <div className="mt-6 rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-4 text-sm font-semibold text-[#991b1b]">
                                    {visibleSnapError}
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="w-full lg:max-w-[400px] lg:flex-1">
                        <div className="rounded-3xl bg-[#f7f9fb] p-6 lg:p-8">
                            <h2 className="m-0 mb-6 text-[22px] font-black text-[#191c1e]">
                                Ringkasan Pemesanan
                            </h2>

                            <div className="mb-8 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                                <InitialsAvatar
                                    name={therapist?.name ?? 'Psikolog'}
                                    photoUrl={therapist?.photo_url}
                                    className="size-14 rounded-xl text-lg"
                                />
                                <div>
                                    <h3 className="m-0 mb-0.5 text-base font-bold text-[#191c1e]">
                                        {therapist?.name ??
                                            'Konsultasi Psikolog'}
                                    </h3>
                                    <p className="m-0 mb-1 text-[13px] font-medium text-[#717783]">
                                        {therapist?.specialization &&
                                        therapist.specialization.length > 0
                                            ? therapist.specialization.join(
                                                  ', ',
                                              )
                                            : 'Spesialisasi belum diisi'}
                                    </p>
                                    {therapist?.average_rating ? (
                                        <div className="mt-1 flex items-center gap-1">
                                            <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                                            <span className="text-xs font-bold text-[#191c1e]">
                                                {therapist.average_rating}
                                            </span>
                                            <span className="text-xs font-medium text-[#717783]">
                                                ({therapist.review_count}{' '}
                                                ulasan)
                                            </span>
                                        </div>
                                    ) : (
                                        <p className="m-0 text-xs font-medium text-[#717783]">
                                            Ulasan belum tersedia
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-6 flex flex-col gap-4 text-[15px]">
                                <PriceRow
                                    label="Sesi Konsultasi"
                                    value={formattedAmount}
                                />
                                <PriceRow
                                    label="Biaya Layanan"
                                    value="Termasuk"
                                />
                            </div>

                            <div className="mb-6 h-px w-full bg-[#e2e4e6]" />

                            <div className="mb-8">
                                <div className="mb-1 text-[13px] font-medium text-[#717783]">
                                    Total Pembayaran
                                </div>
                                <div className="text-4xl leading-none font-black text-[#191c1e]">
                                    {formattedAmount}
                                </div>
                            </div>

                            <Button
                                type="button"
                                className="mb-6 h-14 w-full rounded-2xl bg-[#1464BC] text-base font-bold text-white shadow-[0_8px_24px_-8px_rgba(0,93,167,0.5)] transition-colors hover:bg-[#1053A0]"
                                onClick={handlePay}
                                disabled={
                                    !snapToken || !isSnapReady || !clientKey
                                }
                            >
                                {!isSnapReady && clientKey ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <Lock className="h-5 w-5" />
                                )}
                                Bayar Sekarang
                            </Button>

                            <div className="flex items-center justify-center gap-6 pt-2">
                                <TrustBadge
                                    icon={<CheckCircle2 className="h-4 w-4" />}
                                    label="Midtrans"
                                />
                                <TrustBadge
                                    icon={<Clock className="h-4 w-4" />}
                                    label="Real-time"
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

function PaymentFeature({
    icon,
    label,
}: {
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <div className="flex h-20 items-center justify-center gap-2 rounded-2xl bg-[#f7f9fb] text-sm font-bold text-[#414751]">
            <span className="text-[#1464BC]">{icon}</span>
            <span>{label}</span>
        </div>
    );
}

function PriceRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-4 text-[#414751]">
            <span>{label}</span>
            <span className="text-right font-bold text-[#191c1e]">{value}</span>
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

import { Form, Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeCheck,
    Bell,
    BriefcaseMedical,
    LogOut,
    Menu,
    MessageSquare,
    ShieldCheck,
    Smile,
    X,
} from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { InitialsAvatar } from '@/components/initials-avatar';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';

type PsychologistProfileForm = {
    str_number?: string | null;
    specialization?: string | null;
    price?: number | null;
    is_online?: boolean;
};

type PsychologistProfileSetupProps = {
    profile?: PsychologistProfileForm | null;
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Schedules', path: '/psychologist/schedules', active: false },
    {
        label: 'Appointments',
        path: '/psychologist/appointments',
        active: false,
    },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Records', path: '#', active: false },
];

export default function PsychologistProfileSetup({
    profile = null,
}: PsychologistProfileSetupProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Psikolog';

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Lengkapi Profil Psikolog" />

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
                        <InitialsAvatar name={userName} className="size-9" />
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

            <main className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-4 py-8 sm:px-8 md:py-12 lg:grid-cols-[0.9fr_1.1fr]">
                <section className="rounded-3xl bg-[#1464BC] p-8 text-white shadow-[0_18px_40px_-24px_rgba(0,93,167,0.55)]">
                    <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-white/15">
                        <BriefcaseMedical className="h-7 w-7" />
                    </div>
                    <p className="m-0 mb-3 text-sm font-bold tracking-widest text-blue-100 uppercase">
                        Verifikasi Profil Praktik
                    </p>
                    <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight md:text-[44px]">
                        Lengkapi data psikolog Anda.
                    </h1>
                    <p className="m-0 mt-5 text-base leading-relaxed font-medium text-blue-50">
                        Data ini digunakan untuk listing therapist, dashboard
                        psikolog, tarif konsultasi, serta status praktik.
                    </p>

                    <div className="mt-10 flex flex-col gap-4">
                        <InfoPoint text="Spesialisasi bisa diketik bebas sesuai praktik Anda." />
                        <InfoPoint text="STR boleh dikosongkan dulu jika belum ingin ditampilkan." />
                        <InfoPoint text="Status online/offline bisa diatur setelah dashboard aktif." />
                    </div>
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-8">
                        <h2 className="m-0 text-2xl font-black text-[#191c1e]">
                            Profil Praktik
                        </h2>
                        <p className="m-0 mt-2 text-sm leading-relaxed font-medium text-[#717783]">
                            Isi data minimal agar dashboard psikolog bisa
                            digunakan.
                        </p>
                    </div>

                    <Form
                        action="/psychologist-profile"
                        method="post"
                        disableWhileProcessing
                        className="flex flex-col gap-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="specialization"
                                        className="ml-1 text-[13px] font-semibold text-[#191c1e]"
                                    >
                                        Spesialisasi
                                    </label>
                                    <input
                                        id="specialization"
                                        name="specialization"
                                        type="text"
                                        required
                                        autoFocus
                                        defaultValue={
                                            profile?.specialization ?? ''
                                        }
                                        placeholder="Contoh: CBT, Trauma, Konseling Relasi"
                                        className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                    />
                                    <InputError
                                        message={errors.specialization}
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="str_number"
                                        className="ml-1 text-[13px] font-semibold text-[#191c1e]"
                                    >
                                        Nomor STR
                                    </label>
                                    <input
                                        id="str_number"
                                        name="str_number"
                                        type="text"
                                        defaultValue={profile?.str_number ?? ''}
                                        placeholder="Contoh: STR-123456789"
                                        className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                    />
                                    <InputError message={errors.str_number} />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label
                                        htmlFor="price"
                                        className="ml-1 text-[13px] font-semibold text-[#191c1e]"
                                    >
                                        Tarif Konsultasi
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        required
                                        defaultValue={profile?.price ?? ''}
                                        placeholder="250000"
                                        className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                    />
                                    <InputError message={errors.price} />
                                </div>

                                <div className="flex items-start gap-3 rounded-2xl bg-[#eef5fe] p-4 text-[#1464BC]">
                                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                                    <p className="m-0 text-[13px] leading-relaxed font-semibold">
                                        Setelah disimpan, akun psikolog akan
                                        masuk ke dashboard praktik dan muncul di
                                        listing therapist.
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-2 flex h-13 cursor-pointer items-center justify-center gap-2 rounded-[14px] border-none bg-[#1464BC] px-5 text-base font-bold text-white shadow-[0_10px_24px_-8px_rgba(0,93,167,0.55)] transition-colors hover:bg-[#1053A0] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {processing ? (
                                        <Spinner className="h-5 w-5" />
                                    ) : (
                                        <>
                                            Simpan Profil
                                            <ArrowRight className="h-5 w-5" />
                                        </>
                                    )}
                                </button>

                                <Link
                                    href={logout()}
                                    as="button"
                                    className="mt-1 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#e2e4e6] bg-white text-sm font-semibold text-[#717783] transition-colors hover:bg-[#f7f9fb]"
                                    onClick={handleLogout}
                                    data-test="logout-button"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Log out
                                </Link>
                            </>
                        )}
                    </Form>
                </section>
            </main>
        </div>
    );
}

PsychologistProfileSetup.layout = {};

function InfoPoint({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                <BadgeCheck className="h-4 w-4" />
            </span>
            <p className="m-0 text-sm leading-relaxed font-semibold text-blue-50">
                {text}
            </p>
        </div>
    );
}

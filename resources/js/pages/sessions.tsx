import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Bell,
    Info,
    Lock,
    LogOut,
    Menu,
    MessageSquare,
    Phone,
    Plus,
    Search,
    Send,
    Settings,
    Smile,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { logout } from '@/routes';

const profileImg =
    'https://images.unsplash.com/photo-1758600587839-56ba05596c69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMHdvbWFufGVufDF8fHx8MTc3ODAzMDI3MXww&ixlib=rb-4.1.0&q=80&w=1080';

const drElenaImg =
    'https://images.unsplash.com/photo-1659353887012-680771c1b497?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHhpc3BhbmljJTIwZmVtYWxlJTIwZG9jdG9yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc4NTEzNTA3fDA&ixlib=rb-4.1.0&q=80&w=1080';

const sarahImg =
    'https://images.unsplash.com/photo-1721674098745-7d1b76e0fc02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkb2N0b3IlMjBtYXR1cmUlMjB3b21hbiUyMHBvcnRyYWl0JTIwd2hpdGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc3ODUxMzUwM3ww&ixlib=rb-4.1.0&q=80&w=1080';

const marcusImg =
    'https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFsZSUyMGRvY3RvciUyMHBvcnRyYWl0fGVufDF8fHx8MTc3ODUxMzUwOXww&ixlib=rb-4.1.0&q=80&w=1080';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: true },
    { label: 'Record', path: '#', active: false },
];

const contacts = [
    {
        name: 'Dr. Elena Rodriguez',
        image: drElenaImg,
        alt: 'Dr. Elena Rodriguez',
        status: 'Aktif',
        preview: 'Saya telah merenungkan diskusi kita...',
        active: true,
        online: true,
    },
    {
        name: 'Sarah Jenkins',
        image: sarahImg,
        alt: 'Sarah Jenkins',
        status: '2j lalu',
        preview: 'Lembar latihan telah dilampirkan.',
        active: false,
        online: false,
    },
    {
        name: 'Marcus Vane',
        image: marcusImg,
        alt: 'Marcus Vane',
        status: 'Kemarin',
        preview: 'Sampai jumpa hari Kamis jam 4 sore.',
        active: false,
        online: false,
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

export default function Sessions() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'Sarah';
    const userEmail = auth.user?.email ?? 'sarah@example.com';

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#f7f9fb] font-sans">
            <Head title="Sessions" />

            <nav className="z-50 shrink-0 border-b border-[#e2e4e6] bg-white">
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
                                <div className="size-9 shrink-0 overflow-hidden rounded-full">
                                    <ImageWithFallback
                                        src={profileImg}
                                        alt="Profil pengguna"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
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
                                            <div className="size-11 shrink-0 overflow-hidden rounded-full">
                                                <ImageWithFallback
                                                    src={profileImg}
                                                    alt="Profil pengguna"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
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

            <main className="flex min-h-0 flex-1 overflow-hidden">
                <aside className="flex w-full shrink-0 flex-col border-r border-[#e2e4e6] bg-[#f7f9fb] md:w-[320px] lg:w-[380px]">
                    <div className="p-6 pb-4">
                        <h1 className="m-0 mb-4 text-2xl font-black tracking-tight text-[#191c1e]">
                            Pesan
                        </h1>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari sesi..."
                                className="h-11 w-full rounded-xl border border-transparent bg-white pr-4 pl-11 text-sm text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:ring-2 focus:ring-[#1464BC]"
                            />
                            <Search className="absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 text-[#a0a5b1]" />
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
                        {contacts.map((contact) => (
                            <button
                                key={contact.name}
                                type="button"
                                className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                                    contact.active
                                        ? 'border-[#e2e4e6]/50 bg-white shadow-sm'
                                        : 'border-transparent bg-transparent hover:bg-white/60'
                                }`}
                            >
                                <div className="relative shrink-0">
                                    <div className="size-12 overflow-hidden rounded-xl">
                                        <ImageWithFallback
                                            src={contact.image}
                                            alt={contact.alt}
                                            className={`h-full w-full object-cover ${
                                                contact.active
                                                    ? ''
                                                    : 'grayscale-[20%]'
                                            }`}
                                        />
                                    </div>
                                    {contact.online && (
                                        <div className="absolute -right-1 -bottom-1 size-3.5 rounded-full border-2 border-white bg-[#10b981]" />
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="mb-1 flex items-center justify-between gap-3">
                                        <h3 className="m-0 truncate text-[15px] font-bold text-[#191c1e]">
                                            {contact.name}
                                        </h3>
                                        <span
                                            className={`shrink-0 text-[11px] ${
                                                contact.active
                                                    ? 'font-bold text-[#1464BC]'
                                                    : 'font-medium text-[#a0a5b1]'
                                            }`}
                                        >
                                            {contact.status}
                                        </span>
                                    </div>
                                    <p
                                        className={`m-0 truncate text-[13px] ${
                                            contact.active
                                                ? 'text-[#717783]'
                                                : 'text-[#a0a5b1]'
                                        }`}
                                    >
                                        {contact.preview}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto p-4">
                        <div className="flex items-center justify-center gap-2 rounded-xl border border-[#e2e4e6] bg-white p-3 shadow-sm">
                            <Lock className="h-4 w-4 text-[#1464BC]" />
                            <span className="text-[13px] font-bold text-[#1464BC]">
                                Status Sistem: Sehat
                            </span>
                        </div>
                    </div>
                </aside>

                <section className="relative hidden flex-1 flex-col bg-white md:flex">
                    <header className="flex h-20 shrink-0 items-center justify-between border-b border-[#f2f4f6] px-8">
                        <div className="flex items-center gap-4">
                            <div className="relative shrink-0">
                                <div className="size-11 overflow-hidden rounded-full">
                                    <ImageWithFallback
                                        src={drElenaImg}
                                        alt="Dr. Elena Rodriguez"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-[#10b981]" />
                            </div>
                            <div>
                                <h2 className="m-0 mb-0.5 text-lg font-bold text-[#191c1e]">
                                    Dr. Elena Rodriguez
                                </h2>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[13px] font-medium text-[#10b981]">
                                        Psikolog Klinis
                                    </span>
                                    <span className="text-[13px] text-[#c1c7d3]">
                                        •
                                    </span>
                                    <span className="text-[13px] font-medium text-[#10b981]">
                                        Online
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Mulai panggilan"
                                className="flex size-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#717783] transition-colors hover:bg-[#f2f4f6] hover:text-[#191c1e]"
                            >
                                <Phone className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                aria-label="Info sesi"
                                className="flex size-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#717783] transition-colors hover:bg-[#f2f4f6] hover:text-[#191c1e]"
                            >
                                <Info className="h-5 w-5" />
                            </button>
                        </div>
                    </header>

                    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-8" />

                    <footer className="shrink-0 bg-white p-6">
                        <div className="flex items-end gap-2 rounded-3xl border border-[#e2e4e6]/50 bg-[#f7f9fb] p-2 pr-2.5">
                            <button
                                type="button"
                                aria-label="Tambah lampiran"
                                className="mb-1 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                            >
                                <Plus className="h-6 w-6" />
                            </button>

                            <textarea
                                placeholder="Ketik pesan Anda dengan aman..."
                                className="max-h-[120px] min-h-12 flex-1 resize-none border-none bg-transparent py-3.5 text-[15px] text-[#191c1e] outline-none placeholder:text-[#a0a5b1]"
                                rows={1}
                            />

                            <div className="mb-1 flex shrink-0 items-center gap-2">
                                <button
                                    type="button"
                                    aria-label="Pilih emoji"
                                    className="flex size-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                                >
                                    <Smile className="h-6 w-6" />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Kirim pesan"
                                    className="flex size-10 cursor-pointer items-center justify-center rounded-2xl border-none bg-[#1464BC] text-white shadow-sm transition-colors hover:bg-[#1053A0]"
                                >
                                    <Send className="ml-0.5 h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-3 flex items-center justify-center gap-1.5 text-[#a0a5b1]">
                            <Lock className="h-3.5 w-3.5" />
                            <span className="text-[11px] font-medium">
                                Semua konsultasi dienkripsi end-to-end dan
                                sesuai standar medis.
                            </span>
                        </div>
                    </footer>
                </section>
            </main>
        </div>
    );
}

Sessions.layout = {};

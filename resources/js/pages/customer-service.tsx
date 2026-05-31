import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    Image as ImageIcon,
    LogOut,
    Menu,
    Settings,
    Smile,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';
import { NotificationDropdown } from '@/components/notification-dropdown';
import { MiniFooter } from '@/components/mini-footer';

const defaultAvatar =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '/records', active: false },
    { label: 'Pusat Bantuan', path: '/customer-service', active: true },
];

export default function CustomerService() {
    const { auth, flash } = usePage().props as any;
    const userName = auth.user?.name ?? 'Sarah';
    const userEmail = auth.user?.email ?? 'sarah@example.com';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        photo: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/customer-service', {
            onSuccess: () => {
                reset();
                setPreviewUrl(null);
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Pusat Bantuan" />

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
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            type="button"
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
            </nav>

            <main className="mx-auto flex max-w-[800px] flex-col gap-8 px-4 py-8 sm:px-8 md:py-12">
                <div className="flex flex-col gap-2 text-center">
                    <h1 className="m-0 text-[32px] leading-tight font-black tracking-tight text-[#191c1e]">
                        Pusat Bantuan
                    </h1>
                    <p className="text-[#717783]">
                        Kirimkan laporan, keluhan, atau pertanyaan Anda kepada
                        tim kami.
                    </p>
                </div>

                {flash?.success && (
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                        {flash.success}
                    </div>
                )}

                <div className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm sm:p-8">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="title"
                                className="text-sm font-bold text-[#191c1e]"
                            >
                                Judul Laporan
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="w-full rounded-xl border border-[#e2e4e6] px-4 py-3 text-sm focus:border-[#1464BC] focus:ring-1 focus:ring-[#1464BC] focus:outline-none"
                                placeholder="Contoh: Kesulitan saat login"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />
                            {errors.title && (
                                <span className="text-xs text-red-500">
                                    {errors.title}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="content"
                                className="text-sm font-bold text-[#191c1e]"
                            >
                                Isi Laporan
                            </label>
                            <textarea
                                id="content"
                                rows={5}
                                className="w-full rounded-xl border border-[#e2e4e6] px-4 py-3 text-sm focus:border-[#1464BC] focus:ring-1 focus:ring-[#1464BC] focus:outline-none"
                                placeholder="Ceritakan lebih lanjut tentang masalah atau pertanyaan Anda..."
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                            />
                            {errors.content && (
                                <span className="text-xs text-red-500">
                                    {errors.content}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-[#191c1e]">
                                Foto Pendukung (Opsional)
                            </label>
                            <div className="flex items-center gap-4">
                                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] px-4 py-3 text-sm font-semibold text-[#717783] transition-colors hover:bg-[#e2e4e6]">
                                    <ImageIcon className="h-5 w-5" />
                                    <span>Pilih Foto</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoChange}
                                    />
                                </label>
                                {data.photo && (
                                    <span className="max-w-[200px] truncate text-sm font-medium text-[#191c1e]">
                                        {data.photo.name}
                                    </span>
                                )}
                            </div>
                            {previewUrl && (
                                <div className="mt-4 h-48 w-full max-w-[300px] overflow-hidden rounded-2xl border border-[#e2e4e6]">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            {errors.photo && (
                                <span className="text-xs text-red-500">
                                    {errors.photo}
                                </span>
                            )}
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-[#1464BC] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#104b8d] disabled:opacity-50"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Laporan'}
                            </button>
                        </div>
                    </form>
                </div>

                <MiniFooter />
            </main>
        </div>
    );
}

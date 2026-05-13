import { Link, usePage } from '@inertiajs/react';
import { Bell, Settings } from 'lucide-react';
import type { ReactNode } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import type { BreadcrumbItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

export function AppHeader({ breadcrumbs: _breadcrumbs = [] }: Props) {
    const { auth } = usePage().props;
    const userName = auth.user?.name ?? 'User';

    return (
        <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4 font-sans md:px-8">
            {/* Bagian Kiri: Logo */}
            <div className="flex w-1/4 items-center">
                <Link
                    href="/"
                    className="text-lg font-black tracking-wider text-gray-900"
                >
                    PSIKOLOGKU
                </Link>
            </div>

            {/* Bagian Tengah: Menu Navigasi Horizontal */}
            <nav className="hidden h-full flex-1 items-center justify-center gap-2 md:flex">
                <NavLink href="/dashboard" active>
                    Dashboard
                </NavLink>
                <NavLink href="#">Sesi</NavLink>
                <NavLink href="#">Jurnal</NavLink>
                <NavLink href="#">Materi</NavLink>
            </nav>

            {/* Bagian Kanan: Ikon Notifikasi, Pengaturan & Profil */}
            <div className="flex w-1/4 items-center justify-end gap-5">
                <button
                    type="button"
                    aria-label="Notifikasi"
                    className="text-gray-500 transition-colors hover:text-gray-900"
                >
                    <Bell className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    aria-label="Pengaturan"
                    className="text-gray-500 transition-colors hover:text-gray-900"
                >
                    <Settings className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    aria-label="Profil"
                    className="rounded-full border border-gray-200 transition-all hover:ring-2 hover:ring-[#1E70B9] hover:ring-offset-2"
                >
                    <InitialsAvatar name={userName} className="size-9" />
                </button>
            </div>
        </header>
    );
}

// --- Komponen Bantuan untuk Navigasi Header ---

interface NavLinkProps {
    href: string;
    active?: boolean;
    children: ReactNode;
}

function NavLink({ href, active = false, children }: NavLinkProps) {
    return (
        <Link
            href={href}
            className={`flex h-full items-center border-b-2 px-4 text-[15px] transition-colors ${
                active
                    ? 'border-[#1E70B9] font-bold text-gray-900'
                    : 'border-transparent font-medium text-gray-500 hover:border-gray-300 hover:text-gray-900'
            }`}
        >
            {children}
        </Link>
    );
}

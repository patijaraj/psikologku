import React from 'react';
import { Link, router } from '@inertiajs/react';
import {
    BookHeart,
    Calendar,
    CircleHelp,
    History,
    LayoutGrid,
    Library,
    LogOut,
    MessageCircle,
    Settings,
    Smile,
} from 'lucide-react';
import { logout } from '@/routes';

const pendingRouteHref = '#';

export function AppSidebar() {
    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-gray-100 bg-white font-sans shadow-sm">
            {/* Logo Area */}
            <div className="flex h-20 items-center gap-3 border-b border-gray-50 px-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1E70B9] text-white shadow-sm">
                    <Smile className="h-5 w-5" />
                </div>
                <span className="text-xl font-extrabold text-[#1E70B9]">
                    Psikologku
                </span>
            </div>

            {/* Main Menu Area */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
                <div className="mb-4 px-3 text-xs font-bold tracking-wider text-gray-500">
                    MENU UTAMA
                </div>

                <NavItem
                    href="/dashboard"
                    icon={<LayoutGrid className="h-5 w-5" />}
                    label="Dashboard"
                    active={true}
                />
                <NavItem
                    href={pendingRouteHref}
                    icon={<Calendar className="h-5 w-5" />}
                    label="Jadwal Sesi"
                />
                <NavItem
                    href={pendingRouteHref}
                    icon={<MessageCircle className="h-5 w-5" />}
                    label="Chat Psikolog"
                    badge={2}
                />
                <NavItem
                    href={pendingRouteHref}
                    icon={<BookHeart className="h-5 w-5" />}
                    label="Jurnal & Mood"
                />
                <NavItem
                    href={pendingRouteHref}
                    icon={<Library className="h-5 w-5" />}
                    label="Materi Edukasi"
                />
                <NavItem
                    href={pendingRouteHref}
                    icon={<History className="h-5 w-5" />}
                    label="Riwayat"
                />
            </nav>

            {/* Bottom Menu Area */}
            <div className="space-y-1 border-t border-gray-100 p-4">
                <NavItem
                    href={pendingRouteHref}
                    icon={<Settings className="h-5 w-5" />}
                    label="Pengaturan"
                />
                <NavItem
                    href="/customer-service"
                    icon={<CircleHelp className="h-5 w-5" />}
                    label="Customer Service"
                />

                <Link
                    href={logout()}
                    as="button"
                    onClick={handleLogout}
                    data-test="logout-button"
                    className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-semibold text-[#EF4444] transition-colors hover:bg-red-50"
                >
                    <LogOut className="h-5 w-5" />
                    <span>Keluar</span>
                </Link>
            </div>
        </aside>
    );
}

// --- Komponen Bantuan (Mini Component) ---
// Biar kode di atas nggak kepanjangan dan gampang dibaca

interface NavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: number;
}

function NavItem({ href, icon, label, active = false, badge }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 ${
                active
                    ? 'bg-[#F0F6FF] font-bold text-[#1E70B9]' // Style jika aktif
                    : 'font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900' // Style jika tidak aktif
            }`}
        >
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>

            {/* Logika untuk menampilkan badge merah kalau ada properti 'badge' yang dikirim */}
            {badge && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EF4444] text-[11px] font-bold text-white shadow-sm">
                    {badge}
                </span>
            )}
        </Link>
    );
}

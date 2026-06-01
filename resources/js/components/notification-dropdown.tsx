import { Link, router, usePage } from '@inertiajs/react';
import { Bell, Check, CheckCircle2, Info, XCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

type Notification = {
    id: string;
    data: {
        title: string;
        message: string;
        action_url?: string | null;
        icon: 'success' | 'warning' | 'error' | 'info';
        transaction_id?: number;
        status?: string;
    };
    read_at: string | null;
    created_at: string;
};

export function NotificationDropdown() {
    const { auth } = usePage().props as any;
    const notifications: Notification[] = auth.user?.notifications || [];
    const unreadCount = notifications.length;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAsRead = (id: string, actionUrl?: string | null) => {
        router.patch(
            `/notifications/${id}/mark-as-read`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (actionUrl) {
                        router.visit(actionUrl);
                    }
                },
            },
        );
        setIsOpen(false);
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <Info className="h-5 w-5 text-amber-500" />;
            case 'error':
                return <XCircle className="h-5 w-5 text-red-500" />;
            default:
                return <Info className="h-5 w-5 text-blue-500" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                aria-label="Notifikasi"
                onClick={() => setIsOpen(!isOpen)}
                className={`relative cursor-pointer rounded-full border-none bg-transparent p-2 transition-colors ${isOpen ? 'bg-[#f2f4f6] text-[#191c1e]' : 'text-[#717783] hover:bg-[#f2f4f6] hover:text-[#191c1e]'}`}
            >
                <Bell className="h-[22px] w-[22px]" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#e65c5c] ring-2 ring-white" />
                )}
            </button>

            {isOpen && (
                <div className="absolute top-12 right-0 z-50 w-80 overflow-hidden rounded-2xl border border-[#e2e4e6] bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-[#f2f4f6] bg-[#f7f9fb] px-4 py-3">
                        <h3 className="m-0 text-sm font-bold text-[#191c1e]">
                            Notifikasi ({unreadCount})
                        </h3>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={() =>
                                    router.patch(
                                        '/notifications/mark-all-as-read',
                                        {},
                                        { preserveScroll: true },
                                    )
                                }
                                className="cursor-pointer border-none bg-transparent text-xs font-semibold text-[#1464BC] hover:underline"
                            >
                                Tandai dibaca
                            </button>
                        )}
                    </div>

                    <div className="flex max-h-80 flex-col overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <button
                                    key={notification.id}
                                    type="button"
                                    onClick={() =>
                                        markAsRead(
                                            notification.id,
                                            notification.data.action_url,
                                        )
                                    }
                                    className="flex w-full cursor-pointer items-start gap-3 border-b border-none border-[#f2f4f6] bg-transparent px-4 py-3 text-left transition-colors hover:bg-[#f7f9fb]"
                                >
                                    <div className="mt-0.5 shrink-0">
                                        {getIcon(notification.data.icon)}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="m-0 text-sm font-bold text-[#191c1e]">
                                            {notification.data.title}
                                        </p>
                                        <p className="m-0 text-xs leading-relaxed text-[#717783]">
                                            {notification.data.message}
                                        </p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center">
                                <p className="m-0 text-sm font-medium text-[#717783]">
                                    Belum ada notifikasi baru.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-[#f2f4f6] bg-[#f7f9fb]">
                        <Link
                            href="/notifications"
                            className="block w-full cursor-pointer py-2.5 text-center text-xs font-bold text-[#1464BC] no-underline hover:underline"
                            onClick={() => setIsOpen(false)}
                        >
                            Lihat Semua Notifikasi
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

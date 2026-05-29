import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, Info, XCircle } from 'lucide-react';
import { NotificationDropdown } from '@/components/notification-dropdown';
import { InitialsAvatar } from '@/components/initials-avatar';

export default function Notifications({
    notifications,
}: {
    notifications: any[];
}) {
    const { auth } = usePage().props as any;

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle2 className="h-6 w-6 text-green-500" />;
            case 'warning':
                return <Info className="h-6 w-6 text-amber-500" />;
            case 'error':
                return <XCircle className="h-6 w-6 text-red-500" />;
            default:
                return <Info className="h-6 w-6 text-blue-500" />;
        }
    };

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
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Semua Notifikasi" />

            <nav className="sticky top-0 z-50 border-b border-[#e2e4e6] bg-white">
                <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center rounded-full p-2 text-[#191c1e] hover:bg-[#f2f4f6]"
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="m-0 text-lg font-bold text-[#191c1e]">
                            Notifikasi Anda
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <NotificationDropdown />
                        <InitialsAvatar
                            name={auth.user?.name ?? 'User'}
                            photoUrl={(auth.user as any)?.photo_url}
                            className="size-9"
                        />
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-[800px] px-4 py-8 sm:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-black text-[#191c1e]">
                        Semua Notifikasi
                    </h2>
                    <button
                        onClick={() =>
                            router.patch('/notifications/mark-all-as-read')
                        }
                        className="cursor-pointer border-none bg-transparent text-sm font-semibold text-[#1464BC] hover:underline"
                    >
                        Tandai Semua Dibaca
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() =>
                                    markAsRead(
                                        notification.id,
                                        notification.data.action_url,
                                    )
                                }
                                className={`flex cursor-pointer flex-col justify-between rounded-2xl border p-5 transition-shadow hover:shadow-sm sm:flex-row sm:items-center ${
                                    notification.read_at === null
                                        ? 'border-[#1464BC]/30 bg-white shadow-sm'
                                        : 'border-[#e2e4e6] bg-[#f7f9fb] opacity-80 hover:opacity-100'
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 shrink-0">
                                        {getIcon(notification.data.icon)}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="m-0 text-base font-bold text-[#191c1e]">
                                            {notification.data.title}
                                        </h3>
                                        <p className="m-0 text-sm leading-relaxed text-[#717783]">
                                            {notification.data.message}
                                        </p>
                                        <span className="mt-2 text-xs font-medium text-[#a0a5b1]">
                                            {new Date(
                                                notification.created_at,
                                            ).toLocaleString('id-ID', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short',
                                            })}
                                        </span>
                                    </div>
                                </div>
                                {notification.read_at === null && (
                                    <div className="mt-4 flex shrink-0 sm:mt-0">
                                        <span className="h-3 w-3 rounded-full bg-[#1464BC]"></span>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="rounded-2xl border border-[#e2e4e6] bg-white py-12 text-center">
                            <Info className="mx-auto mb-4 h-12 w-12 text-[#a0a5b1]" />
                            <h3 className="mb-2 text-lg font-bold text-[#191c1e]">
                                Belum Ada Notifikasi
                            </h3>
                            <p className="mx-auto max-w-[300px] text-[#717783]">
                                Anda akan menerima pemberitahuan di sini
                                mengenai status pembayaran dan sesi konsultasi
                                Anda.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
Notifications.layout = {};

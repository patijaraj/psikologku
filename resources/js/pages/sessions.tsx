import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import {
    Bell,
    CheckCircle2,
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
import { useState, useEffect, useRef } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { NotificationDropdown } from '@/components/notification-dropdown';
import {
    complete,
    start,
    updateRecord,
} from '@/actions/App/Http/Controllers/PsychologistAppointmentController';
import { logout } from '@/routes';
import { supabase } from '../lib/supabase';

type ChatContact = {
    id: number;
    appointment_id: number;
    user_id: number;
    name: string;
    email?: string | null;
    status: string;
    appointment_status: string;
    payment_status: string;
    date?: string | null;
    time: string;
    photo_url?: string | null;
    preview: string;
    online: boolean;
    can_chat: boolean;
    can_complete: boolean;
    can_start_session: boolean;
};

type SessionsProps = {
    chatContacts?: ChatContact[];
    isPsychologist?: boolean;
};

const patientNavItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: true },
    { label: 'Record', path: '/records', active: false },
];

const psychologistNavItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Schedules', path: '/psychologist/schedules', active: false },
    {
        label: 'Appointments',
        path: '/psychologist/appointments',
        active: false,
    },
    { label: 'Sessions', path: '/sessions', active: true },
    { label: 'Records', path: '/psychologist/records', active: false },
];

function statusLabel(status: string) {
    if (status === 'completed') {
        return 'Selesai';
    }

    if (status === 'upcoming') {
        return 'Booked';
    }

    if (status === 'overdue') {
        return 'Overdue';
    }

    return status;
}

export default function Sessions({
    chatContacts = [],
    isPsychologist = false,
}: SessionsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props as any;
    const userName = auth.user?.name ?? 'Sarah';
    const userEmail = auth.user?.email ?? 'sarah@example.com';
    const navItems = isPsychologist ? psychologistNavItems : patientNavItems;

    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
    const {
        data: recordData,
        setData: setRecordData,
        patch: patchRecord,
        processing: recordProcessing,
        reset: resetRecord,
    } = useForm({
        record_summary: '',
        record_recommendation: '',
    });

    // --- LOGIC BACKEND REALTIME ---
    const [chatList, setChatList] = useState<ChatContact[]>(chatContacts);
    const [selectedUser, setSelectedUser] = useState<ChatContact | null>(
        chatContacts[0] ?? null,
    );
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const isChatClosed = selectedUser ? !selectedUser.can_chat : false;

    const handleLogout = () => {
        router.flushAll();
    };

    // 1. Sinkronkan daftar kontak booking dari Laravel ke Supabase.
    useEffect(() => {
        const fetchChatList = async () => {
            const formattedContacts = chatContacts.map((contact) => ({
                ...contact,
                status: statusLabel(contact.status),
            }));

            setChatList(formattedContacts);
            setSelectedUser((prev) => {
                if (formattedContacts.length === 0) {
                    return null;
                }

                if (!prev) {
                    return formattedContacts[0];
                }

                return (
                    formattedContacts.find(
                        (contact) =>
                            contact.appointment_id === prev.appointment_id,
                    ) ?? formattedContacts[0]
                );
            });

            if (!auth.user?.id) return;

            try {
                const supabaseUsers = [
                    {
                        id: auth.user.id,
                        name: auth.user.name ?? 'User',
                        email: auth.user.email ?? '',
                    },
                    ...formattedContacts.map((contact) => ({
                        id: contact.user_id,
                        name: contact.name || 'User',
                        email: contact.email ?? '',
                    })),
                ];

                const uniqueUsers = Array.from(
                    new Map(
                        supabaseUsers.map((user) => [String(user.id), user]),
                    ).values(),
                );

                const { error } = await supabase
                    .from('users')
                    .upsert(uniqueUsers, { onConflict: 'id' });

                if (error) {
                    console.error(
                        'Gagal sinkronisasi user Supabase:',
                        error.message,
                    );
                }
            } catch (err) {
                console.error('Terjadi error pada logic chat list:', err);
            }
        };

        fetchChatList();
    }, [auth.user, chatContacts]);

    // 2. Mendengarkan & Sinkronisasi Pesan secara Realtime dari Supabase
    useEffect(() => {
        if (!auth.user?.id || !selectedUser?.user_id) return;

        // Ambil riwayat pesan lama antara pengirim dan penerima
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .or(
                    `and(user_id.eq.${auth.user.id},receiver_id.eq.${selectedUser.user_id}),and(user_id.eq.${selectedUser.user_id},receiver_id.eq.${auth.user.id})`,
                )
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Gagal memuat pesan lama:', error.message);
                return;
            }
            if (data) setMessages(data);
        };

        fetchMessages();

        // Berlangganan (Subscribe) ke perubahan tabel messages secara realtime
        const channel = supabase
            .channel(`room-${auth.user.id}-${selectedUser.user_id}`)
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages' },
                (payload: any) => {
                    const newMsg = payload.new;

                    // Validasi apakah pesan yang masuk ditujukan untuk room chat yang sedang aktif dibuka saat ini
                    const currentSelectedId = selectedUser?.user_id
                        ? String(selectedUser.user_id)
                        : '';
                    const currentAuthId = auth.user?.id
                        ? String(auth.user.id)
                        : '';

                    const isRelevant =
                        (String(newMsg.user_id) === currentAuthId &&
                            String(newMsg.receiver_id) === currentSelectedId) ||
                        (String(newMsg.user_id) === currentSelectedId &&
                            String(newMsg.receiver_id) === currentAuthId);

                    if (isRelevant) {
                        setMessages((prev) => [...prev, newMsg]);
                    }
                },
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedUser, auth.user]);

    // Auto scroll ke bawah setiap ada pesan baru masuk
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // 3. Fungsi kirim pesan ke Supabase
    const handleSendMessage = async () => {
        if (
            isChatClosed ||
            !input.trim() ||
            !auth.user?.id ||
            !selectedUser?.user_id
        )
            return;

        const currentInput = input;
        setInput(''); // Kosongkan input field langsung demi kenyamanan user (optimistic UI)

        const { error } = await supabase.from('messages').insert([
            {
                content: currentInput,
                user_id: auth.user.id,
                receiver_id: selectedUser.user_id,
            },
        ]);

        if (error) {
            alert('Gagal mengirim pesan: ' + error.message);
            setInput(currentInput); // Kembalikan teks jika gagal kirim
        }
    };

    const handleStartSession = () => {
        if (!selectedUser?.appointment_id || !selectedUser.can_start_session) {
            return;
        }

        router.patch(
            start.url(selectedUser.appointment_id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    const startedContact = {
                        ...selectedUser,
                        appointment_status: 'ongoing',
                        status: 'ongoing',
                        can_chat: true,
                        can_start_session: false,
                    };

                    setChatList((current) =>
                        current.map((contact) =>
                            contact.appointment_id ===
                            selectedUser.appointment_id
                                ? startedContact
                                : contact,
                        ),
                    );
                    setSelectedUser(startedContact);
                },
            },
        );
    };

    const handleCompleteSession = () => {
        if (!selectedUser?.appointment_id || !selectedUser.can_complete) {
            return;
        }

        router.patch(
            complete.url(selectedUser.appointment_id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    const completedContact = {
                        ...selectedUser,
                        appointment_status: 'completed',
                        status: 'Selesai',
                        preview: 'Sesi selesai, riwayat chat tetap tersedia.',
                        can_chat: false,
                        can_complete: false,
                    };

                    setChatList((current) =>
                        current.map((contact) =>
                            contact.appointment_id ===
                            selectedUser.appointment_id
                                ? completedContact
                                : contact,
                        ),
                    );
                    setSelectedUser(completedContact);
                    setIsRecordModalOpen(true);
                },
            },
        );
    };

    const handleRecordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser?.appointment_id) return;

        patchRecord(updateRecord.url(selectedUser.appointment_id), {
            onSuccess: () => {
                setIsRecordModalOpen(false);
                resetRecord();
            },
            preserveScroll: true,
        });
    };
    // --- END OF LOGIC BACKEND ---

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#f7f9fb] font-sans">
            <Head title="Sessions" />

            {/* NAVBAR ORIGINAL */}
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
                            <NotificationDropdown />
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
                                        aria-label="Tutup menu profil"
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
                                className={`rounded-xl p-3 text-[15px] font-semibold ${item.active ? 'bg-[#f0f6fc] text-[#1464BC]' : 'text-[#717783] hover:bg-[#f7f9fb]'}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>

            <div className="flex min-h-0 flex-1 overflow-hidden">
                {/* SIDEBAR DAFTAR CHAT */}
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
                        {chatList.length > 0 ? (
                            chatList.map((contact) => (
                                <button
                                    key={contact.id}
                                    type="button"
                                    onClick={() => setSelectedUser(contact)}
                                    className={`flex w-full cursor-pointer items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                                        selectedUser?.id === contact.id
                                            ? 'border-[#e2e4e6]/50 bg-white shadow-sm'
                                            : 'border-transparent bg-transparent hover:bg-white/60'
                                    }`}
                                >
                                    <div className="relative shrink-0">
                                        {contact.photo_url ? (
                                            <img
                                                src={contact.photo_url}
                                                alt={contact.name}
                                                className="size-12 rounded-xl border border-[#e2e4e6] object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-12 items-center justify-center overflow-hidden rounded-xl bg-[#1464BC] text-lg font-bold text-white">
                                                {contact.name.charAt(0)}
                                            </div>
                                        )}
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
                                                className={`shrink-0 text-[11px] ${selectedUser?.id === contact.id ? 'font-bold text-[#1464BC]' : 'font-medium text-[#a0a5b1]'}`}
                                            >
                                                {contact.status}
                                            </span>
                                        </div>
                                        <p
                                            className={`m-0 truncate text-[13px] ${selectedUser?.id === contact.id ? 'text-[#717783]' : 'text-[#a0a5b1]'}`}
                                        >
                                            {contact.preview}
                                        </p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dde5] bg-white p-6 text-center">
                                <MessageSquare className="mb-3 h-9 w-9 text-[#a0a5b1]" />
                                <p className="m-0 text-sm font-bold text-[#191c1e]">
                                    Belum ada sesi chat
                                </p>
                                <p className="m-0 mt-2 text-xs leading-relaxed font-medium text-[#717783]">
                                    Chat akan muncul setelah booking psikolog
                                    berhasil dibayar.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto p-4">
                        <div className="flex items-center justify-center gap-2 rounded-xl border border-[#e2e4e6] bg-white p-3 shadow-sm">
                            <Lock className="h-4 w-4 text-[#1464BC]" />
                            <span className="text-[13px] font-bold text-[#1464BC]">
                                Sesi Terenkripsi End-To-End
                            </span>
                        </div>
                    </div>
                </aside>

                {/* AREA UTAMA CHATBOX */}
                <section className="relative hidden flex-1 flex-col bg-white md:flex">
                    {selectedUser ? (
                        <>
                            <header className="flex h-20 shrink-0 items-center justify-between border-b border-[#f2f4f6] px-8">
                                <div className="flex items-center gap-4">
                                    <div className="relative shrink-0">
                                        {selectedUser.photo_url ? (
                                            <img
                                                src={selectedUser.photo_url}
                                                alt={selectedUser.name}
                                                className="size-11 rounded-full border border-[#e2e4e6] object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-slate-200 font-bold text-slate-700">
                                                {selectedUser.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-[#10b981]" />
                                    </div>
                                    <div>
                                        <h2 className="m-0 mb-0.5 text-lg font-bold text-[#191c1e]">
                                            {selectedUser.name}
                                        </h2>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[13px] font-medium text-[#10b981]">
                                                {selectedUser.status}
                                            </span>
                                            <span className="text-[13px] text-[#c1c7d3]">
                                                •
                                            </span>
                                            <span className="text-[13px] font-medium text-[#10b981]">
                                                {selectedUser.date} ·{' '}
                                                {selectedUser.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isPsychologist &&
                                        selectedUser.can_complete && (
                                            <button
                                                type="button"
                                                onClick={handleCompleteSession}
                                                className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-[#bbf7d0] bg-[#dcfce7] px-4 text-sm font-bold text-[#166534] transition-colors hover:bg-[#bbf7d0]"
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                Selesai
                                            </button>
                                        )}
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

                            {/* CONTAINER BUBBLE CHAT */}
                            <div
                                ref={scrollRef}
                                className="flex flex-1 flex-col gap-4 overflow-y-auto bg-[#fdfefe] p-8"
                            >
                                {messages.map((msg) => {
                                    const isMe =
                                        String(msg.user_id) ===
                                        String(auth.user?.id);
                                    return (
                                        <div
                                            key={msg.id}
                                            className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[70%] rounded-2xl p-4 text-[15px] leading-relaxed shadow-sm ${
                                                    isMe
                                                        ? 'rounded-tr-none bg-[#1464BC] text-white'
                                                        : 'rounded-tl-none bg-[#f2f4f6] text-[#191c1e]'
                                                }`}
                                            >
                                                <p className="m-0">
                                                    {msg.content}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* FOOTER: INPUT CHAT */}
                            <footer className="shrink-0 bg-white p-6">
                                {selectedUser.can_start_session ? (
                                    <div className="flex flex-col items-center justify-center rounded-3xl border border-[#e2e4e6] bg-[#f7f9fb] p-6 text-center">
                                        <p className="mb-4 text-sm font-medium text-[#717783]">
                                            Waktu sesi telah tiba. Ketuk tombol
                                            di bawah untuk memulai percakapan.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleStartSession}
                                            className="rounded-2xl bg-[#1464BC] px-8 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1053A0]"
                                        >
                                            Mulai Sesi
                                        </button>
                                    </div>
                                ) : !selectedUser.can_chat &&
                                  selectedUser.appointment_status !==
                                      'completed' ? (
                                    <div className="flex items-center justify-center rounded-3xl border border-[#e2e4e6] bg-[#f7f9fb] p-6 text-center">
                                        <p className="m-0 text-sm font-medium text-[#717783]">
                                            {isPsychologist
                                                ? 'Sesi ini belum memasuki waktunya.'
                                                : 'Menunggu psikolog memulai sesi...'}
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div
                                            className={`flex items-end gap-2 rounded-3xl border border-[#e2e4e6]/50 bg-[#f7f9fb] p-2 pr-2.5 ${
                                                isChatClosed ? 'opacity-80' : ''
                                            }`}
                                        >
                                            <button
                                                type="button"
                                                aria-label="Tambah lampiran"
                                                disabled={isChatClosed}
                                                className="mb-1 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                                            >
                                                <Plus className="h-6 w-6" />
                                            </button>

                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) =>
                                                    setInput(e.target.value)
                                                }
                                                disabled={isChatClosed}
                                                onKeyDown={(e) =>
                                                    e.key === 'Enter' &&
                                                    handleSendMessage()
                                                }
                                                placeholder={
                                                    isChatClosed
                                                        ? 'Sesi sudah selesai. Riwayat chat tetap bisa dilihat.'
                                                        : 'Ketik pesan Anda dengan aman...'
                                                }
                                                className="mb-1 h-10 flex-1 border-none bg-transparent px-3 py-2 text-[15px] text-[#191c1e] outline-none placeholder:text-[#a0a5b1]"
                                            />

                                            <div className="mb-1 flex shrink-0 items-center gap-2">
                                                <button
                                                    type="button"
                                                    aria-label="Pilih emoji"
                                                    disabled={isChatClosed}
                                                    className="flex size-10 cursor-pointer items-center justify-center rounded-full border-none bg-transparent text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                                                >
                                                    <Smile className="h-6 w-6" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleSendMessage}
                                                    disabled={isChatClosed}
                                                    className={`flex size-10 cursor-pointer items-center justify-center rounded-2xl border-none text-white shadow-sm transition-colors ${
                                                        isChatClosed
                                                            ? 'bg-[#a0a5b1]'
                                                            : 'bg-[#1464BC] hover:bg-[#1053A0]'
                                                    }`}
                                                >
                                                    <Send className="ml-0.5 h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-3 flex items-center justify-center gap-1.5 text-[#a0a5b1]">
                                            <Lock className="h-3.5 w-3.5" />
                                            <span className="text-[11px] font-medium">
                                                Semua konsultasi dienkripsi
                                                end-to-end.
                                            </span>
                                        </div>
                                    </>
                                )}
                            </footer>
                        </>
                    ) : (
                        <div className="flex flex-1 items-center justify-center text-sm text-slate-400 italic">
                            Pilih sesi aktif untuk memulai obrolan
                        </div>
                    )}
                </section>
            </div>

            {isRecordModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191c1e]/60 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl sm:p-8">
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="m-0 text-xl font-black text-[#191c1e]">
                                    Isi Record Konsultasi
                                </h3>
                                <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                    Lengkapi rekap dan rekomendasi untuk sesi
                                    ini. Anda dapat melengkapinya nanti.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsRecordModalOpen(false)}
                                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[#f2f4f6] text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form
                            onSubmit={handleRecordSubmit}
                            className="flex flex-col gap-5"
                        >
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="record_summary"
                                    className="text-sm font-bold text-[#191c1e]"
                                >
                                    Rekap Konsul
                                </label>
                                <textarea
                                    id="record_summary"
                                    value={recordData.record_summary}
                                    onChange={(e) =>
                                        setRecordData(
                                            'record_summary',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Tuliskan ringkasan konsultasi pasien di sini..."
                                    className="min-h-[120px] resize-none rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] p-3 text-sm text-[#191c1e] transition-all outline-none placeholder:text-[#a0a5b1] focus:border-[#1464BC] focus:bg-white focus:ring-4 focus:ring-[#1464BC]/10"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="record_recommendation"
                                    className="text-sm font-bold text-[#191c1e]"
                                >
                                    Rekomendasi
                                </label>
                                <textarea
                                    id="record_recommendation"
                                    value={recordData.record_recommendation}
                                    onChange={(e) =>
                                        setRecordData(
                                            'record_recommendation',
                                            e.target.value,
                                        )
                                    }
                                    placeholder="Tuliskan rekomendasi penanganan atau tugas untuk pasien..."
                                    className="min-h-[120px] resize-none rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] p-3 text-sm text-[#191c1e] transition-all outline-none placeholder:text-[#a0a5b1] focus:border-[#1464BC] focus:bg-white focus:ring-4 focus:ring-[#1464BC]/10"
                                    required
                                />
                            </div>

                            <div className="mt-2 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsRecordModalOpen(false)}
                                    className="rounded-xl bg-[#f2f4f6] px-5 py-2.5 text-sm font-bold text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                                >
                                    Nanti Saja
                                </button>
                                <button
                                    type="submit"
                                    disabled={recordProcessing}
                                    className="rounded-xl bg-[#1464BC] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1053A0] disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {recordProcessing
                                        ? 'Menyimpan...'
                                        : 'Simpan Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

Sessions.layout = {};

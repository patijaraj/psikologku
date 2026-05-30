import { Head, Link, usePage, useForm } from '@inertiajs/react';
import {
    Bell,
    CheckCircle2,
    Clock,
    FileText,
    LogOut,
    Menu,
    MessageSquare,
    Settings,
    Smile,
    X,
    Edit3,
    Star,
} from 'lucide-react';
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';
import { updateRecord } from '@/actions/App/Http/Controllers/PsychologistAppointmentController';
import { NotificationDropdown } from '@/components/notification-dropdown';
import { RecordFormModal } from '@/components/record-form-modal';

type RecordType = {
    id: number;
    patient_name: string;
    patient_email?: string | null;
    session_date: string;
    record_summary?: string | null;
    diagnostic_focus?: string | null;
    patient_state?: string[] | null;
    structured_recommendations?: any[] | null;
    rating?: number | null;
    review?: string | null;
    status: string;
};

type PsychologistRecordsProps = {
    records: RecordType[];
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
    { label: 'Records', path: '/psychologist/records', active: true },
];

export default function PsychologistRecords({
    records = [],
}: PsychologistRecordsProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props as any;
    const userName = auth.user?.name ?? 'Psikolog';
    const userEmail = auth.user?.email ?? 'psikolog@example.com';

    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState<RecordType | null>(null);

    const pendingRecords = records.filter((r) => r.status === 'Pending');
    const completedRecords = records.filter((r) => r.status === 'Selesai');

    const openRecordModal = (record: RecordType) => {
        setSelectedRecord(record);
        setIsRecordModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Records Psikolog" />

            {/* Navbar (Same as before) */}
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
                            <button className="relative cursor-pointer rounded-full border-none bg-transparent p-2 text-[#717783] transition-colors hover:bg-[#f2f4f6] hover:text-[#191c1e]">
                                <Bell className="h-[22px] w-[22px]" />
                                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#e65c5c] ring-2 ring-white" />
                            </button>
                        </div>
                        <div className="hidden h-6 w-px bg-[#e2e4e6] sm:block" />
                        <div className="relative">
                            <button
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
                                        <Link
                                            href="/psychologist-profile"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#f7f9fb]"
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                                                <Settings className="h-5 w-5" />
                                            </span>
                                            Profile
                                        </Link>
                                        <Link
                                            href={logout()}
                                            as="button"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#b02a2a] transition-colors hover:bg-[#feecec]"
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

            <main className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-8 sm:px-8 md:py-12">
                <section className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between md:p-8">
                    <div>
                        <p className="m-0 mb-2 text-sm font-bold tracking-widest text-[#1464BC] uppercase">
                            Semua Rekam Medis
                        </p>
                        <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight text-[#191c1e] md:text-[44px]">
                            Daftar Record Pasien.
                        </h1>
                        <p className="m-0 mt-3 max-w-[660px] text-base leading-relaxed font-medium text-[#717783]">
                            Kelola rekam medis dan catatan perkembangan pasien
                            Anda di sini.
                        </p>
                    </div>
                </section>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Pending Section */}
                    <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                        <div>
                            <h2 className="m-0 flex items-center gap-2 text-xl font-black text-[#191c1e]">
                                Menunggu Diisi
                                <span className="flex h-6 items-center justify-center rounded-full bg-[#feecec] px-2 text-xs font-bold text-[#b02a2a]">
                                    {pendingRecords.length}
                                </span>
                            </h2>
                            <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                Sesi yang sudah selesai namun belum ada record
                                konsultasi.
                            </p>
                        </div>

                        {pendingRecords.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {pendingRecords.map((record) => (
                                    <div
                                        key={record.id}
                                        className="flex flex-col gap-3 rounded-2xl border border-[#fef3c7] bg-[#fffbeb] p-4 transition-colors sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <InitialsAvatar
                                                name={record.patient_name}
                                                className="size-10 rounded-xl"
                                            />
                                            <div>
                                                <h3 className="m-0 text-base font-bold text-[#92400e]">
                                                    {record.patient_name}
                                                </h3>
                                                <p className="m-0 text-xs font-medium text-[#b45309]">
                                                    Sesi: {record.session_date}
                                                </p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                openRecordModal(record)
                                            }
                                            className="flex h-9 items-center justify-center gap-2 rounded-xl bg-[#d97706] px-4 text-xs font-bold text-white transition-colors hover:bg-[#b45309]"
                                        >
                                            <Edit3 className="h-3.5 w-3.5" />
                                            Isi Record
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#e2e4e6] bg-[#f7f9fb] p-6 text-center">
                                <CheckCircle2 className="mb-2 h-8 w-8 text-[#10b981]" />
                                <p className="m-0 text-sm font-bold text-[#191c1e]">
                                    Semua record sudah diisi
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Completed Section */}
                    <section className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
                        <div>
                            <h2 className="m-0 text-xl font-black text-[#191c1e]">
                                Record Selesai
                            </h2>
                            <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                                Riwayat record konsultasi yang telah Anda
                                lengkapi.
                            </p>
                        </div>

                        {completedRecords.length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {completedRecords.map((record) => (
                                    <div
                                        key={record.id}
                                        className="flex flex-col gap-3 rounded-2xl border border-[#f2f4f6] bg-white p-4 transition-colors hover:border-[#e2e4e6] sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <InitialsAvatar
                                                name={record.patient_name}
                                                className="size-10 rounded-xl"
                                            />
                                            <div>
                                                <h3 className="m-0 text-base font-bold text-[#191c1e]">
                                                    {record.patient_name}
                                                </h3>
                                                <div className="m-0 flex items-center gap-2 text-xs font-medium text-[#717783]">
                                                    <span>
                                                        Sesi:{' '}
                                                        {record.session_date}
                                                    </span>
                                                    <span>•</span>
                                                    {record.rating ? (
                                                        <span className="flex items-center gap-1 font-bold text-[#b45309]">
                                                            <Star className="h-3 w-3 fill-[#f59e0b] text-[#f59e0b]" />
                                                            {record.rating}/5
                                                        </span>
                                                    ) : (
                                                        <span className="font-bold text-[#717783]">
                                                            Menunggu Ulasan
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() =>
                                                openRecordModal(record)
                                            }
                                            className="flex h-9 items-center justify-center rounded-xl bg-[#f2f4f6] px-4 text-xs font-bold text-[#191c1e] transition-colors hover:bg-[#e2e4e6]"
                                        >
                                            Edit / Lihat
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-[#e2e4e6] bg-[#f7f9fb] p-6 text-center">
                                <FileText className="mb-2 h-8 w-8 text-[#a0a5b1]" />
                                <p className="m-0 text-sm font-bold text-[#717783]">
                                    Belum ada record selesai
                                </p>
                            </div>
                        )}
                    </section>
                </div>
            </main>

            <RecordFormModal
                isOpen={isRecordModalOpen}
                onClose={() => {
                    setIsRecordModalOpen(false);
                    setSelectedRecord(null);
                }}
                appointmentId={selectedRecord?.id || 0}
                patientName={selectedRecord?.patient_name || ''}
                sessionDate={selectedRecord?.session_date}
                initialData={{
                    record_summary: selectedRecord?.record_summary || '',
                    diagnostic_focus: selectedRecord?.diagnostic_focus || '',
                    patient_state: selectedRecord?.patient_state || [],
                    structured_recommendations: selectedRecord?.structured_recommendations || [],
                }}
                rating={selectedRecord?.rating}
                review={selectedRecord?.review}
            />
        </div>
    );
}

PsychologistRecords.layout = {};

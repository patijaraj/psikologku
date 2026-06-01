import { Head, Link, usePage, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    Clock,
    FileText,
    LogOut,
    Menu,
    Settings,
    Smile,
    X,
    Stethoscope,
    FileHeart,
    Star,
    Printer,
    Activity,
    BookOpen,
    Tag,
    AlertCircle,
    User,
    Wind,
    Edit3,
    Users,
    Coffee,
    Moon,
} from 'lucide-react';
import { useState } from 'react';
import { InitialsAvatar } from '@/components/initials-avatar';
import { logout } from '@/routes';
import { NotificationDropdown } from '@/components/notification-dropdown';

type RecordDetail = {
    id: number;
    psychologist_name: string;
    psychologist_photo_url?: string | null;
    specialization: string[] | null;
    session_date: string;
    session_duration: string;
    record_summary: string;
    record_recommendation?: string;
    diagnostic_focus?: string;
    patient_state?: string[];
    structured_recommendations?: {
        title: string;
        description: string;
        type: string;
    }[];
    rating: number | null;
    review: string | null;
    has_referral_letter?: boolean;
};

type RecordDetailProps = {
    record: RecordDetail;
};

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '/records', active: true },
];

export default function RecordDetailView({ record }: RecordDetailProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { auth } = usePage().props as any;
    const userName = auth.user?.name ?? 'User';
    const userEmail = auth.user?.email ?? 'user@example.com';

    const { data, setData, patch, processing, errors } = useForm({
        rating: record.rating || 0,
        review: record.review || '',
    });

    const submitReview = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/records/${record.id}/review`, {
            preserveScroll: true,
        });
    };

    const handlePrint = () => {
        window.print();
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'exercise':
                return <Activity className="h-5 w-5 text-[#1464BC]" />;
            case 'reading':
                return <BookOpen className="h-5 w-5 text-[#1464BC]" />;
            case 'meditation':
                return <Wind className="h-5 w-5 text-[#1464BC]" />;
            case 'journaling':
                return <Edit3 className="h-5 w-5 text-[#1464BC]" />;
            case 'social':
                return <Users className="h-5 w-5 text-[#1464BC]" />;
            case 'relaxation':
                return <Coffee className="h-5 w-5 text-[#1464BC]" />;
            case 'sleep':
                return <Moon className="h-5 w-5 text-[#1464BC]" />;
            default:
                return <Tag className="h-5 w-5 text-[#1464BC]" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans print:bg-white">
            <Head title={`Record - ${record.session_date}`}>
                <style>{`
                    @media print {
                        body { background-color: white !important; }
                        nav, .print-hide { display: none !important; }
                        .print-show { display: block !important; }
                        .print-container { 
                            box-shadow: none !important; 
                            border: none !important;
                            max-width: 100% !important;
                            padding: 0 !important;
                        }
                        .print-break-inside-avoid { break-inside: avoid; }
                    }
                `}</style>
            </Head>

            <nav className="sticky top-0 z-50 border-b border-[#e2e4e6] bg-white print:hidden">
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
                                            href="/profile"
                                            className="flex w-full cursor-pointer items-center gap-3 rounded-2xl border-none bg-white px-3 py-3 text-left text-sm font-semibold text-[#191c1e] transition-colors hover:bg-[#f7f9fb]"
                                        >
                                            <span className="flex size-9 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                                                <User className="h-5 w-5" />
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

            <main className="mx-auto flex max-w-[900px] flex-col gap-6 px-4 py-8 sm:px-8 md:py-12 print:max-w-none print:px-0 print:py-0">
                <div className="print-hide flex items-center justify-between">
                    <Link
                        href="/records"
                        className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#717783] shadow-sm transition-colors hover:text-[#191c1e]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Kembali
                    </Link>
                    <div className="flex gap-2">
                        {record.has_referral_letter && (
                            <a
                                href={`/records/${record.id}/referral-letter/pdf`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#fff8e6] px-4 py-2 text-sm font-bold text-[#b45309] shadow-sm transition-colors hover:bg-[#fef3c7]"
                            >
                                <FileText className="h-4 w-4" />
                                Surat Rujukan
                            </a>
                        )}
                        <a
                            href={`/records/${record.id}/pdf`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#1464BC] px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#1053A0]"
                        >
                            <Printer className="h-4 w-4" />
                            Unduh Rekam Medis
                        </a>
                    </div>
                </div>

                {/* Document Header (Print Only) */}
                <div className="mb-8 hidden items-center justify-between border-b-2 border-[#191c1e] pb-4 print:flex">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-[#1464BC] text-white">
                            <Smile className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="m-0 text-2xl font-black tracking-tight text-[#1464BC]">
                                Psikologku
                            </h1>
                            <p className="m-0 text-xs font-semibold text-[#717783]">
                                Platform Konseling Psikologi Profesional
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="m-0 text-lg font-black tracking-widest text-[#191c1e] uppercase">
                            Medical Report
                        </h2>
                        <p className="m-0 text-sm font-medium text-[#717783]">
                            Doc Ref: #{record.id.toString().padStart(6, '0')}
                        </p>
                    </div>
                </div>

                <div className="print-container overflow-hidden rounded-3xl bg-white shadow-sm print:rounded-none">
                    {/* Header Section */}
                    <div className="border-b border-[#f2f4f6] bg-[#fdfefe] p-6 sm:p-8">
                        <div className="mb-6 flex items-start justify-between print:hidden">
                            <div>
                                <h1 className="m-0 text-2xl font-black text-[#191c1e] sm:text-3xl">
                                    Evaluation Report
                                </h1>
                                <p className="m-0 mt-2 text-sm font-medium text-[#717783]">
                                    Laporan hasil evaluasi konsultasi
                                    profesional Anda.
                                </p>
                            </div>
                            <div className="hidden size-12 items-center justify-center rounded-2xl bg-[#eef5fe] text-[#1464BC] sm:flex">
                                <FileHeart className="h-6 w-6" />
                            </div>
                        </div>

                        <div className="grid gap-4 rounded-2xl bg-[#f7f9fb] p-5 sm:grid-cols-2 print:border print:border-[#e2e4e6] print:bg-white">
                            <div className="flex items-center gap-4">
                                <InitialsAvatar
                                    name={record.psychologist_name}
                                    photoUrl={record.psychologist_photo_url}
                                    className="size-12 rounded-xl bg-[#1464BC] text-white"
                                />
                                <div>
                                    <p className="m-0 text-xs font-bold tracking-wider text-[#717783] uppercase">
                                        Psikolog / Evaluator
                                    </p>
                                    <p className="m-0 mt-0.5 text-base font-bold text-[#191c1e]">
                                        {record.psychologist_name}
                                    </p>
                                    <p className="m-0 text-xs font-medium text-[#1464BC]">
                                        {record.specialization &&
                                        record.specialization.length > 0
                                            ? record.specialization.join(', ')
                                            : 'Psikologi Klinis'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-center gap-3 sm:border-l sm:border-[#e2e4e6] sm:pl-6">
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-[#717783]" />
                                    <span className="text-sm font-semibold text-[#191c1e]">
                                        {record.session_date}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-[#717783]" />
                                    <span className="text-sm font-semibold text-[#191c1e]">
                                        Patient: {userName}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col gap-8 p-6 sm:p-8">
                        {/* New Fields: Patient State & Diagnostic Focus */}
                        <div className="print-break-inside-avoid grid gap-6 md:grid-cols-2">
                            <div className="rounded-2xl border border-[#e2e4e6] bg-[#fdfefe] p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-[#1464BC]" />
                                    <h3 className="m-0 text-sm font-black tracking-wide text-[#191c1e] uppercase">
                                        Patient State
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {record.patient_state &&
                                    record.patient_state.length > 0 ? (
                                        record.patient_state.map(
                                            (state, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-flex items-center rounded-lg bg-[#eef5fe] px-2.5 py-1 text-xs font-bold text-[#1464BC]"
                                                >
                                                    {state}
                                                </span>
                                            ),
                                        )
                                    ) : (
                                        <span className="text-sm text-[#717783] italic">
                                            No state recorded.
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-[#e2e4e6] bg-[#fdfefe] p-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <Activity className="h-4 w-4 text-[#1464BC]" />
                                    <h3 className="m-0 text-sm font-black tracking-wide text-[#191c1e] uppercase">
                                        Diagnostic Focus
                                    </h3>
                                </div>
                                <p className="m-0 text-[15px] font-semibold text-[#191c1e]">
                                    {record.diagnostic_focus || (
                                        <span className="text-sm font-normal text-[#717783] italic">
                                            None specified.
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Consultation Summary */}
                        <div className="print-break-inside-avoid">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#eef5fe] text-[#1464BC]">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <h2 className="m-0 text-lg font-black text-[#191c1e]">
                                    Clinical Observations & Summary
                                </h2>
                            </div>
                            <div className="rounded-2xl border border-[#e2e4e6] bg-[#fdfefe] p-5 print:border-none print:px-0">
                                <p className="m-0 text-[15px] leading-relaxed whitespace-pre-wrap text-[#4a5568]">
                                    {record.record_summary}
                                </p>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="print-break-inside-avoid">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#eef5fe] text-[#1464BC]">
                                    <Stethoscope className="h-4 w-4" />
                                </div>
                                <h2 className="m-0 text-lg font-black text-[#191c1e]">
                                    Treatment Plan & Recommendations
                                </h2>
                            </div>

                            {record.structured_recommendations &&
                            record.structured_recommendations.length > 0 ? (
                                <div className="grid gap-4 sm:grid-cols-2">
                                    {record.structured_recommendations.map(
                                        (rec, idx) => (
                                            <div
                                                key={idx}
                                                className="flex gap-4 rounded-2xl border border-[#e2e4e6] bg-[#f7f9fb] p-5 print:border-[#191c1e] print:bg-white"
                                            >
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#e2e4e6] bg-white shadow-sm print:border-[#191c1e]">
                                                    {getIconForType(rec.type)}
                                                </div>
                                                <div>
                                                    <h4 className="m-0 mb-1 text-sm font-black text-[#191c1e]">
                                                        {rec.title}
                                                    </h4>
                                                    <p className="m-0 text-sm leading-relaxed text-[#4a5568]">
                                                        {rec.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-[#e2e4e6] bg-[#fdfefe] p-5 print:border-none print:px-0">
                                    <p className="m-0 text-[15px] leading-relaxed whitespace-pre-wrap text-[#4a5568]">
                                        {record.record_recommendation || (
                                            <span className="text-[#717783] italic">
                                                No specific recommendations
                                                provided.
                                            </span>
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Signatures (Print Only) */}
                        <div className="mt-16 hidden justify-between px-8 print:flex">
                            <div className="text-center">
                                <div className="h-16"></div>
                                <div className="mx-auto w-48 border-t border-[#191c1e] pt-2">
                                    <p className="m-0 text-sm font-bold text-[#191c1e]">
                                        {userName}
                                    </p>
                                    <p className="m-0 text-xs text-[#717783]">
                                        Patient
                                    </p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="h-16"></div>
                                <div className="mx-auto w-48 border-t border-[#191c1e] pt-2">
                                    <p className="m-0 text-sm font-bold text-[#191c1e]">
                                        {record.psychologist_name}
                                    </p>
                                    <p className="m-0 text-xs text-[#717783]">
                                        Psychologist
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Review Section (Hidden in print) */}
                        <div className="print-hide mt-4 border-t border-[#f2f4f6] pt-8">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#fff8e6] text-[#f59e0b]">
                                    <Star className="h-4 w-4" />
                                </div>
                                <h2 className="m-0 text-lg font-black text-[#191c1e]">
                                    Ulasan Sesi
                                </h2>
                            </div>

                            {record.rating ? (
                                <div className="rounded-2xl border border-[#e2e4e6] bg-[#fdfefe] p-5">
                                    <div className="mb-3 flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`h-5 w-5 ${star <= record.rating! ? 'fill-[#f59e0b] text-[#f59e0b]' : 'fill-[#e2e4e6] text-[#e2e4e6]'}`}
                                            />
                                        ))}
                                    </div>
                                    {record.review && (
                                        <p className="m-0 text-[15px] leading-relaxed text-[#4a5568]">
                                            "{record.review}"
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <form
                                    onSubmit={submitReview}
                                    className="rounded-2xl border border-[#e2e4e6] bg-[#fdfefe] p-5"
                                >
                                    <p className="mb-4 text-sm font-medium text-[#717783]">
                                        Bagaimana pengalaman Anda pada sesi
                                        konsultasi ini?
                                    </p>

                                    <div className="mb-6 flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() =>
                                                    setData('rating', star)
                                                }
                                                className="cursor-pointer border-none bg-transparent p-1 transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`h-8 w-8 ${star <= data.rating ? 'fill-[#f59e0b] text-[#f59e0b]' : 'fill-[#e2e4e6] text-[#e2e4e6]'}`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {errors.rating && (
                                        <p className="mb-4 text-xs font-bold text-[#e65c5c]">
                                            {errors.rating}
                                        </p>
                                    )}

                                    <div className="mb-6">
                                        <label
                                            htmlFor="review"
                                            className="mb-2 block text-sm font-bold text-[#191c1e]"
                                        >
                                            Tulis Ulasan (Opsional)
                                        </label>
                                        <textarea
                                            id="review"
                                            rows={4}
                                            value={data.review}
                                            onChange={(e) =>
                                                setData(
                                                    'review',
                                                    e.target.value,
                                                )
                                            }
                                            className="w-full resize-none rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] p-3 text-sm text-[#191c1e] focus:border-[#1464BC] focus:ring-1 focus:ring-[#1464BC] focus:outline-none"
                                            placeholder="Ceritakan pengalaman Anda bersama psikolog ini..."
                                        />
                                        {errors.review && (
                                            <p className="mt-2 text-xs font-bold text-[#e65c5c]">
                                                {errors.review}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={
                                                processing || data.rating === 0
                                            }
                                            className="cursor-pointer rounded-xl border-none bg-[#1464BC] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#10529a] disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Menyimpan...'
                                                : 'Kirim Ulasan'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

RecordDetailView.layout = {};

import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { ArrowLeft, User, ShieldCheck } from 'lucide-react';
import { MiniFooter } from '@/components/mini-footer';

interface Report {
    id: number;
    title: string;
    content: string;
    status: 'pending' | 'in_progress' | 'resolved';
    admin_reply: string | null;
    photo_path: string | null;
    image_url: string | null;
    created_at: string;
    updated_at: string;
}

export default function CustomerServiceShow({ report }: { report: Report }) {
    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'resolved':
                return 'Selesai';
            case 'in_progress':
                return 'Diproses';
            default:
                return 'Pending';
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title={`Laporan #${report.id}`} />

            <div className="mx-auto flex max-w-[800px] items-center px-4 py-8 sm:px-8">
                <Link
                    href="/customer-service"
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e4e6] bg-white text-[#717783] shadow-sm transition-all hover:border-[#1464BC] hover:text-[#1464BC] hover:shadow-md"
                >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </Link>
            </div>

            <main className="mx-auto flex w-full max-w-[800px] flex-col gap-8 px-4 pb-12 sm:px-8">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <span className="rounded-full bg-[#1464BC] px-3 py-1 text-xs font-bold text-white">
                            {getStatusLabel(report.status)}
                        </span>
                        <span className="text-sm font-semibold text-[#717783]">
                            {format(
                                new Date(report.created_at),
                                'd MMMM yyyy, HH:mm',
                                { locale: localeId },
                            )}
                        </span>
                    </div>
                    <h1 className="m-0 text-[32px] leading-tight font-black tracking-tight text-[#191c1e]">
                        {report.title}
                    </h1>
                </div>

                <div className="flex flex-col gap-6 rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm sm:p-8">
                    {/* User Report Bubble */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f4f6] text-[#717783]">
                                <User className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-[#191c1e]">
                                    Anda
                                </h3>
                                <p className="text-xs font-medium text-[#717783]">
                                    {format(
                                        new Date(report.created_at),
                                        'd MMMM yyyy, HH:mm',
                                        { locale: localeId },
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="ml-13 rounded-2xl rounded-tl-none border border-[#e2e4e6] bg-[#f7f9fb] p-5 text-[15px] leading-relaxed text-[#191c1e] shadow-sm">
                            <p className="whitespace-pre-wrap">
                                {report.content}
                            </p>
                            {/* Support both new Supabase URLs and old local paths */}
                            {(report.image_url || report.photo_path) && (
                                <div className="mt-4 overflow-hidden rounded-xl border border-[#e2e4e6]">
                                    <img
                                        src={report.image_url ?? `/storage/${report.photo_path}`}
                                        alt="Bukti Laporan"
                                        className="max-h-[300px] w-auto object-contain"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Admin Reply Bubble */}
                    {report.admin_reply && (
                        <div className="flex flex-col gap-3 border-t border-[#e2e4e6] pt-6">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1464BC] text-white">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#191c1e]">
                                        Admin Psikologku
                                    </h3>
                                    <p className="text-xs font-medium text-[#717783]">
                                        {format(
                                            new Date(report.updated_at),
                                            'd MMMM yyyy, HH:mm',
                                            { locale: localeId },
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="ml-13 rounded-2xl rounded-tl-none border border-blue-200 bg-[#eef5fe] p-5 text-[15px] leading-relaxed text-[#104b8d] shadow-sm">
                                <p className="whitespace-pre-wrap">
                                    {report.admin_reply}
                                </p>
                            </div>
                        </div>
                    )}

                    {!report.admin_reply && report.status !== 'resolved' && (
                        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center text-sm font-semibold text-amber-700">
                            Tim kami sedang meninjau laporan Anda dan akan
                            segera memberikan balasan.
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <MiniFooter />
                </div>
            </main>
        </div>
    );
}

CustomerServiceShow.layout = (page: any) => <>{page}</>;

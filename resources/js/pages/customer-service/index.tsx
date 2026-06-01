import { Head, Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
    ArrowLeft,
    Clock,
    MessageSquare,
    Plus,
    CheckCircle2,
    Loader2,
} from 'lucide-react';
import { MiniFooter } from '@/components/mini-footer';

interface Report {
    id: number;
    title: string;
    content: string;
    status: 'pending' | 'in_progress' | 'resolved';
    admin_reply: string | null;
    created_at: string;
}

export default function CustomerServiceIndex() {
    const { reports, flash } = usePage().props as any;

    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'resolved':
                return {
                    label: 'Selesai',
                    icon: <CheckCircle2 className="h-4 w-4" />,
                    className: 'bg-green-100 text-green-700 border-green-200',
                };
            case 'in_progress':
                return {
                    label: 'Diproses',
                    icon: <Loader2 className="h-4 w-4" />,
                    className: 'bg-blue-100 text-[#1464BC] border-blue-200',
                };
            default:
                return {
                    label: 'Pending',
                    icon: <Clock className="h-4 w-4" />,
                    className: 'bg-amber-100 text-amber-700 border-amber-200',
                };
        }
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Customer Service" />

            <div className="mx-auto flex max-w-[800px] items-center px-4 py-8 sm:px-8">
                <Link
                    href="/dashboard"
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e4e6] bg-white text-[#717783] shadow-sm transition-all hover:border-[#1464BC] hover:text-[#1464BC] hover:shadow-md"
                >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </Link>
            </div>

            <main className="mx-auto flex w-full max-w-[800px] flex-col gap-8 px-4 pb-12 sm:px-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1464BC] text-white shadow-sm shadow-blue-900/20">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <h1 className="m-0 text-[32px] leading-tight font-black tracking-tight text-[#191c1e]">
                            Customer Service
                        </h1>
                        <p className="max-w-xl text-[15px] leading-relaxed text-[#717783]">
                            Pantau laporan dan pertanyaan Anda kepada tim
                            Psikologku.
                        </p>
                    </div>

                    <Link
                        href="/customer-service/create"
                        className="flex items-center gap-2 rounded-xl bg-[#1464BC] px-5 py-3 font-bold text-white shadow-sm transition-all hover:bg-[#104b8d] hover:shadow-md"
                    >
                        <Plus className="h-5 w-5" />
                        Buat Laporan
                    </Link>
                </div>

                {flash?.success && (
                    <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
                        <CheckCircle2 className="h-5 w-5" />
                        <p className="text-sm font-semibold">{flash.success}</p>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {reports?.length > 0 ? (
                        reports.map((report: Report) => {
                            const status = getStatusConfig(report.status);

                            return (
                                <Link
                                    key={report.id}
                                    href={`/customer-service/${report.id}`}
                                    className="group flex flex-col gap-4 rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm transition-all hover:border-[#1464BC] hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-8"
                                >
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold text-[#191c1e] transition-colors group-hover:text-[#1464BC]">
                                            {report.title}
                                        </h3>
                                        <p className="text-sm font-medium text-[#717783]">
                                            {format(
                                                new Date(report.created_at),
                                                'd MMMM yyyy, HH:mm',
                                                { locale: id },
                                            )}{' '}
                                            WIB
                                        </p>
                                    </div>
                                    <div
                                        className={`flex w-fit items-center gap-2 rounded-full border px-4 py-2 ${status.className}`}
                                    >
                                        {status.icon}
                                        <span className="text-sm font-bold">
                                            {status.label}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#e2e4e6] bg-white p-12 text-center shadow-sm">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f2f4f6] text-[#717783]">
                                <MessageSquare className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-[#191c1e]">
                                Belum ada laporan
                            </h3>
                            <p className="max-w-xs text-sm text-[#717783]">
                                Anda belum membuat laporan apa pun. Klik "Buat
                                Laporan" jika Anda memiliki kendala.
                            </p>
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

CustomerServiceIndex.layout = (page: any) => <>{page}</>;

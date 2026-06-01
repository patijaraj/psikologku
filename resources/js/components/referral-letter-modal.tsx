import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { X, Send, Printer, FileText } from 'lucide-react';

type ReferralLetterModalProps = {
    isOpen: boolean;
    onClose: () => void;
    appointmentId: number;
    patientName: string;
    sessionDate?: string;
    initialData?: {
        diagnostic_focus?: string | null;
        patient_state?: string[] | null;
    };
};

export function ReferralLetterModal({
    isOpen,
    onClose,
    appointmentId,
    patientName,
    sessionDate,
    initialData,
}: ReferralLetterModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [hasExistingData, setHasExistingData] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        addressed_to: '',
        reason: '',
    });

    useEffect(() => {
        if (isOpen && appointmentId) {
            setIsLoading(true);
            // Fetch existing data if any
            fetch(`/records/${appointmentId}/referral-letter`)
                .then((res) => {
                    if (res.ok) return res.json();
                    throw new Error('Not found');
                })
                .then((responseData) => {
                    if (responseData && responseData.id) {
                        setData({
                            addressed_to: responseData.addressed_to || '',
                            reason: responseData.reason || '',
                        });
                        setHasExistingData(true);
                    } else {
                        // Pre-fill reason with diagnostic focus and patient state if no existing data
                        let defaultReason = '';
                        if (initialData?.diagnostic_focus) {
                            defaultReason += `Fokus Diagnostik: ${initialData.diagnostic_focus}\n`;
                        }
                        if (
                            initialData?.patient_state &&
                            initialData.patient_state.length > 0
                        ) {
                            defaultReason += `Kondisi Pasien: ${initialData.patient_state.join(', ')}\n`;
                        }
                        setData({
                            addressed_to: '',
                            reason: defaultReason,
                        });
                        setHasExistingData(false);
                    }
                })
                .catch(() => {
                    setHasExistingData(false);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isOpen, appointmentId]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Using Wayfinder for route, fallback if not fully typed yet
        const url = `/records/${appointmentId}/referral-letter`;
        post(url, {
            onSuccess: () => {
                setHasExistingData(true);
            },
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191c1e]/60 p-4 backdrop-blur-sm sm:p-6">
            <div
                className="relative flex w-full max-w-[600px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-[#e2e4e6] bg-[#f7f9fb] px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-[#eef5fe] text-[#1464BC]">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="m-0 text-lg font-black tracking-tight text-[#191c1e]">
                                Surat Rujukan
                            </h2>
                            <p className="m-0 text-xs font-medium text-[#717783]">
                                Pasien: {patientName} • Sesi: {sessionDate}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-full border-none bg-transparent p-2 text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {isLoading ? (
                        <div className="flex h-40 items-center justify-center">
                            <p className="text-sm font-medium text-[#717783]">
                                Memuat data...
                            </p>
                        </div>
                    ) : (
                        <form
                            id="referral-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
                            <div>
                                <label
                                    htmlFor="addressed_to"
                                    className="mb-2 block text-sm font-bold text-[#191c1e]"
                                >
                                    Tujuan Surat (Kepada Yth.){' '}
                                    <span className="text-[#e65c5c]">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="addressed_to"
                                    placeholder="Contoh: Prof/Dr/dr/Ts.: SPKJ/Psikiater"
                                    className="w-full rounded-xl border border-[#e2e4e6] bg-[#fdfefe] p-3 text-sm text-[#191c1e] transition-colors focus:border-[#1464BC] focus:ring-1 focus:ring-[#1464BC] focus:outline-none"
                                    value={data.addressed_to}
                                    onChange={(e) =>
                                        setData('addressed_to', e.target.value)
                                    }
                                />
                                {errors.addressed_to && (
                                    <p className="mt-2 text-xs font-bold text-[#e65c5c]">
                                        {errors.addressed_to}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="reason"
                                    className="mb-2 block text-sm font-bold text-[#191c1e]"
                                >
                                    Hasil Pemeriksaan Psikologis / Alasan
                                    Rujukan
                                </label>
                                <textarea
                                    id="reason"
                                    rows={8}
                                    placeholder="Jelaskan kondisi pasien saat ini..."
                                    className="w-full resize-y rounded-xl border border-[#e2e4e6] bg-[#fdfefe] p-3 text-sm text-[#191c1e] transition-colors focus:border-[#1464BC] focus:ring-1 focus:ring-[#1464BC] focus:outline-none"
                                    value={data.reason}
                                    onChange={(e) =>
                                        setData('reason', e.target.value)
                                    }
                                />
                                <p className="mt-2 text-xs font-medium text-[#717783]">
                                    Deskripsikan keluhan, durasi, dan
                                    rekomendasi tindak lanjut secara detail.
                                </p>
                                {errors.reason && (
                                    <p className="mt-2 text-xs font-bold text-[#e65c5c]">
                                        {errors.reason}
                                    </p>
                                )}
                            </div>
                        </form>
                    )}
                </div>

                <div className="flex items-center justify-between border-t border-[#e2e4e6] bg-[#fdfefe] px-6 py-4">
                    {hasExistingData ? (
                        <a
                            href={`/records/${appointmentId}/referral-letter/pdf`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 rounded-xl bg-[#eef5fe] px-4 py-2.5 text-sm font-bold text-[#1464BC] transition-colors hover:bg-[#d9e8fc]"
                        >
                            <Printer className="h-4 w-4" />
                            Unduh PDF
                        </a>
                    ) : (
                        <div />
                    )}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer rounded-xl border border-[#e2e4e6] bg-white px-5 py-2.5 text-sm font-bold text-[#717783] transition-colors hover:bg-[#f7f9fb]"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            form="referral-form"
                            disabled={processing}
                            className="flex cursor-pointer items-center gap-2 rounded-xl border-none bg-[#1464BC] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1053A0] disabled:opacity-50"
                        >
                            <Send className="h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Surat'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

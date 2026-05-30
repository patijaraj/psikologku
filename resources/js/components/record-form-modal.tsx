import { X, Plus, Trash2, Tag, BookOpen, Activity, AlertCircle } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { updateRecord } from '@/actions/App/Http/Controllers/PsychologistAppointmentController';

type RecordData = {
    record_summary: string;
    record_recommendation?: string;
    diagnostic_focus?: string;
    patient_state?: string[];
    structured_recommendations?: { title: string; description: string; type: string }[];
};

type RecordFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    appointmentId: number;
    patientName: string;
    sessionDate?: string;
    initialData?: RecordData;
    rating?: number | null;
    review?: string | null;
    onSuccess?: () => void;
};

const predefinedStates = ['Calm', 'Reflective', 'Highly Verbal', 'Anxious', 'Withdrawn', 'Agitated'];
const recommendationTypes = [
    { value: 'exercise', label: 'Exercise', icon: <Activity className="h-4 w-4" /> },
    { value: 'reading', label: 'Reading', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'general', label: 'General', icon: <Tag className="h-4 w-4" /> },
];

export function RecordFormModal({
    isOpen,
    onClose,
    appointmentId,
    patientName,
    sessionDate,
    initialData,
    rating,
    review,
    onSuccess,
}: RecordFormModalProps) {
    const { data, setData, patch, processing, reset } = useForm({
        record_summary: initialData?.record_summary ?? '',
        diagnostic_focus: initialData?.diagnostic_focus ?? '',
        patient_state: initialData?.patient_state ?? [],
        structured_recommendations: initialData?.structured_recommendations ?? [],
    });

    const [customState, setCustomState] = useState('');

    useEffect(() => {
        if (isOpen && initialData) {
            setData({
                record_summary: initialData.record_summary ?? '',
                diagnostic_focus: initialData.diagnostic_focus ?? '',
                patient_state: initialData.patient_state ?? [],
                structured_recommendations: initialData.structured_recommendations ?? [],
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const toggleState = (state: string) => {
        if (data.patient_state.includes(state)) {
            setData('patient_state', data.patient_state.filter((s) => s !== state));
        } else {
            setData('patient_state', [...data.patient_state, state]);
        }
    };

    const addCustomState = () => {
        if (customState.trim() && !data.patient_state.includes(customState.trim())) {
            setData('patient_state', [...data.patient_state, customState.trim()]);
            setCustomState('');
        }
    };

    const addRecommendation = () => {
        setData('structured_recommendations', [
            ...data.structured_recommendations,
            { title: '', description: '', type: 'general' },
        ]);
    };

    const updateRecommendation = (index: number, field: string, value: string) => {
        const newRecs = [...data.structured_recommendations];
        newRecs[index] = { ...newRecs[index], [field]: value };
        setData('structured_recommendations', newRecs);
    };

    const removeRecommendation = (index: number) => {
        const newRecs = [...data.structured_recommendations];
        newRecs.splice(index, 1);
        setData('structured_recommendations', newRecs);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(updateRecord.url(appointmentId), {
            onSuccess: () => {
                reset();
                onClose();
                if (onSuccess) onSuccess();
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#191c1e]/60 p-4 backdrop-blur-sm overflow-y-auto">
            <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-xl sm:p-8 my-8">
                <div className="mb-6 flex items-start justify-between gap-4 sticky top-0 bg-white z-10 pb-4 border-b border-[#f2f4f6]">
                    <div>
                        <h3 className="m-0 text-xl font-black text-[#191c1e]">
                            Evaluation Report
                        </h3>
                        <p className="m-0 mt-1 text-sm font-medium text-[#717783]">
                            {patientName} {sessionDate && `• Sesi ${sessionDate}`}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full border-none bg-[#f2f4f6] text-[#717783] transition-colors hover:bg-[#e2e4e6] hover:text-[#191c1e]"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Patient State */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#191c1e]">
                            Patient State
                        </label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {predefinedStates.map((state) => {
                                const isActive = data.patient_state.includes(state);
                                return (
                                    <button
                                        key={state}
                                        type="button"
                                        onClick={() => toggleState(state)}
                                        className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors border ${
                                            isActive
                                                ? 'bg-[#1464BC] text-white border-[#1464BC]'
                                                : 'bg-[#f7f9fb] text-[#717783] border-[#e2e4e6] hover:bg-[#f2f4f6]'
                                        }`}
                                    >
                                        {state}
                                    </button>
                                );
                            })}
                            {data.patient_state.filter(s => !predefinedStates.includes(s)).map(state => (
                                <button
                                    key={state}
                                    type="button"
                                    onClick={() => toggleState(state)}
                                    className="rounded-full px-3 py-1.5 text-xs font-bold transition-colors border bg-[#1464BC] text-white border-[#1464BC]"
                                >
                                    {state} (Custom)
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={customState}
                                onChange={(e) => setCustomState(e.target.value)}
                                placeholder="Tambah state kustom..."
                                className="h-9 flex-1 rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] px-3 text-sm text-[#191c1e] outline-none focus:border-[#1464BC]"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addCustomState();
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={addCustomState}
                                className="h-9 rounded-xl bg-[#eef5fe] px-4 text-xs font-bold text-[#1464BC] hover:bg-[#d9e8fc]"
                            >
                                Tambah
                            </button>
                        </div>
                    </div>

                    {/* Diagnostic Focus */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#191c1e]">
                            Diagnostic Focus (Current Protocol)
                        </label>
                        <input
                            type="text"
                            value={data.diagnostic_focus}
                            onChange={(e) => setData('diagnostic_focus', e.target.value)}
                            placeholder="Contoh: Cognitive Behavioral Therapy (CBT)"
                            className="h-11 rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] px-3 text-sm text-[#191c1e] outline-none focus:border-[#1464BC]"
                        />
                    </div>

                    {/* Consultation Summary */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-[#191c1e]">
                            Consultation Summary
                        </label>
                        <textarea
                            value={data.record_summary}
                            onChange={(e) => setData('record_summary', e.target.value)}
                            placeholder="Catatan naratif sesi konsultasi..."
                            className="min-h-[120px] resize-none rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] p-3 text-sm text-[#191c1e] outline-none focus:border-[#1464BC]"
                            required
                        />
                    </div>

                    {/* Structured Recommendations */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-[#191c1e]">
                                Recommendations
                            </label>
                            <button
                                type="button"
                                onClick={addRecommendation}
                                className="flex items-center gap-1 rounded-lg bg-[#eef5fe] px-3 py-1.5 text-xs font-bold text-[#1464BC] hover:bg-[#d9e8fc]"
                            >
                                <Plus className="h-4 w-4" /> Tambah
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                            {data.structured_recommendations.length === 0 ? (
                                <div className="text-center py-4 text-sm text-[#a0a5b1] border border-dashed border-[#e2e4e6] rounded-xl bg-[#f7f9fb]">
                                    Belum ada rekomendasi.
                                </div>
                            ) : (
                                data.structured_recommendations.map((rec, idx) => (
                                    <div key={idx} className="relative rounded-xl border border-[#e2e4e6] p-4 bg-[#f7f9fb] flex flex-col gap-3">
                                        <button
                                            type="button"
                                            onClick={() => removeRecommendation(idx)}
                                            className="absolute top-3 right-3 text-[#a0a5b1] hover:text-[#b02a2a]"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    value={rec.title}
                                                    onChange={(e) => updateRecommendation(idx, 'title', e.target.value)}
                                                    placeholder="Judul (mis: Daily Reflection Exercise)"
                                                    className="w-full h-9 rounded-lg border border-[#e2e4e6] px-3 text-sm outline-none focus:border-[#1464BC]"
                                                    required
                                                />
                                            </div>
                                            <div className="w-1/3">
                                                <select
                                                    value={rec.type}
                                                    onChange={(e) => updateRecommendation(idx, 'type', e.target.value)}
                                                    className="w-full h-9 rounded-lg border border-[#e2e4e6] px-3 text-sm outline-none focus:border-[#1464BC] bg-white"
                                                >
                                                    {recommendationTypes.map(type => (
                                                        <option key={type.value} value={type.value}>{type.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <textarea
                                            value={rec.description}
                                            onChange={(e) => updateRecommendation(idx, 'description', e.target.value)}
                                            placeholder="Deskripsi rekomendasi..."
                                            className="w-full h-20 resize-none rounded-lg border border-[#e2e4e6] p-3 text-sm outline-none focus:border-[#1464BC]"
                                            required
                                        />
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3 border-t border-[#f2f4f6] pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-[#f2f4f6] px-5 py-2.5 text-sm font-bold text-[#717783] transition-colors hover:bg-[#e2e4e6]"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-[#1464BC] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1053A0] disabled:opacity-70"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Record'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

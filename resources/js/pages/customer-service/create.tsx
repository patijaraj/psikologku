import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, MessageSquare, UploadCloud, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { MiniFooter } from '@/components/mini-footer';

export default function CustomerService() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        content: '',
        photo: null as File | null,
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            setData('photo', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const removePhoto = () => {
        setData('photo', null);
        setPreviewUrl(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/customer-service', {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setPreviewUrl(null);
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Customer Service" />

            {/* Top Navigation - Just Back Button */}
            <div className="mx-auto flex max-w-[800px] items-center px-4 py-8 sm:px-8">
                <Link
                    href="/customer-service"
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#e2e4e6] bg-white text-[#717783] shadow-sm transition-all hover:border-[#1464BC] hover:text-[#1464BC] hover:shadow-md"
                >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </Link>
            </div>

            {/* Main Content */}
            <main className="mx-auto flex w-full max-w-[800px] flex-col gap-8 px-4 pb-12 sm:px-8">
                <div className="flex flex-col gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1464BC] text-white shadow-sm shadow-blue-900/20">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                    <h1 className="m-0 text-[32px] leading-tight font-black tracking-tight text-[#191c1e]">
                        Customer Service
                    </h1>
                    <p className="max-w-xl text-[15px] leading-relaxed text-[#717783]">
                        Kirimkan laporan, kendala, atau pertanyaan Anda. Tim
                        Psikologku siap membantu memberikan solusi terbaik untuk
                        Anda.
                    </p>
                </div>

                <div className="rounded-3xl border border-[#e2e4e6] bg-white p-6 shadow-sm sm:p-8">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="title"
                                className="text-[14px] font-bold text-[#191c1e]"
                            >
                                Topik Keluhan / Pertanyaan
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="w-full rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] px-4 py-3.5 text-[15px] font-medium text-[#191c1e] transition-colors placeholder:font-normal placeholder:text-[#a0a5b1] focus:border-[#1464BC] focus:bg-white focus:ring-1 focus:ring-[#1464BC] focus:outline-none"
                                placeholder="Contoh: Kendala saat sesi chat"
                                value={data.title}
                                onChange={(e) =>
                                    setData('title', e.target.value)
                                }
                            />
                            {errors.title && (
                                <span className="text-xs font-semibold text-red-500">
                                    {errors.title}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="content"
                                className="text-[14px] font-bold text-[#191c1e]"
                            >
                                Detail Kendala
                            </label>
                            <textarea
                                id="content"
                                rows={5}
                                className="w-full resize-y rounded-xl border border-[#e2e4e6] bg-[#f7f9fb] px-4 py-3.5 text-[15px] font-medium text-[#191c1e] transition-colors placeholder:font-normal placeholder:text-[#a0a5b1] focus:border-[#1464BC] focus:bg-white focus:ring-1 focus:ring-[#1464BC] focus:outline-none"
                                placeholder="Ceritakan detail masalah yang Anda alami..."
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                            />
                            {errors.content && (
                                <span className="text-xs font-semibold text-red-500">
                                    {errors.content}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-bold text-[#191c1e]">
                                Foto Pendukung{' '}
                                <span className="font-normal text-[#717783]">
                                    (Opsional)
                                </span>
                            </label>

                            {!previewUrl ? (
                                <label className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#e2e4e6] bg-[#f7f9fb] py-8 transition-colors hover:border-[#1464BC] hover:bg-[#eef5fe]">
                                    <div className="flex size-12 items-center justify-center rounded-full bg-white text-[#717783] shadow-sm transition-colors group-hover:text-[#1464BC]">
                                        <UploadCloud className="h-5 w-5" />
                                    </div>
                                    <span className="mt-3 text-[14px] font-semibold text-[#191c1e]">
                                        Klik untuk mengunggah foto
                                    </span>
                                    <span className="mt-1 text-[13px] text-[#717783]">
                                        Format JPG/PNG, Maks. 2MB
                                    </span>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoChange}
                                    />
                                </label>
                            ) : (
                                <div className="relative overflow-hidden rounded-xl border border-[#e2e4e6]">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="h-48 w-full object-cover sm:h-64"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                                        <button
                                            type="button"
                                            onClick={removePhoto}
                                            className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-600"
                                        >
                                            <X className="h-4 w-4" /> Hapus
                                        </button>
                                    </div>
                                </div>
                            )}
                            {errors.photo && (
                                <span className="text-xs font-semibold text-red-500">
                                    {errors.photo}
                                </span>
                            )}
                        </div>

                        <div className="mt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-[#1464BC] px-6 py-4 text-[15px] font-bold text-white shadow-sm transition-colors hover:bg-[#104b8d] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing ? 'Mengirim...' : 'Kirim Laporan'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-4">
                    <MiniFooter />
                </div>
            </main>
        </div>
    );
}

CustomerService.layout = (page: any) => <>{page}</>;

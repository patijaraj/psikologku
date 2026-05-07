import React from 'react';
import { Smile, PenLine, CheckSquare } from 'lucide-react';

export default function UserDashboard() {
    return (
        <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-8 lg:p-12 font-sans">
            <div className="mx-auto max-w-6xl">
                
                {/* Header Greeting */}
                <div className="mb-8">
                    <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900">
                        Selamat pagi, Sarah.
                    </h1>
                    <p className="text-lg text-gray-600 font-medium">
                        Sesi Anda selanjutnya besok pukul 10:00.
                    </p>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    
                    {/* Left Column (Wider) */}
                    <div className="space-y-6 lg:col-span-2">
                        
                        {/* Upcoming Session Card */}
                        <div className="rounded-[2rem] bg-[#1E70B9] p-8 text-white shadow-sm md:p-10">
                            <p className="mb-2 text-sm font-bold tracking-widest text-blue-100 uppercase">
                                Sesi Mendatang
                            </p>
                            <h2 className="mb-2 text-4xl font-bold">
                                Dr. Emily Chen
                            </h2>
                            <p className="mb-10 text-blue-100 font-medium text-lg">
                                Terapi Perilaku Kognitif • 45 mnt
                            </p>
                            <button className="rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#1E70B9] shadow-sm transition hover:bg-gray-50 active:scale-95">
                                Gabung Panggilan Video
                            </button>
                        </div>

                        {/* Treatment Plan Progress Card */}
                        <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-10">
                            <h3 className="mb-8 text-2xl font-bold text-gray-900">
                                Progres Rencana Perawatan
                            </h3>
                            <div className="space-y-8">
                                <ProgressItem label="Teknik Manajemen Kecemasan" percent={75} />
                                <ProgressItem label="Konsistensi Jurnal Harian" percent={40} />
                                <ProgressItem label="Rutinitas Kebersihan Tidur" percent={90} />
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Narrower) */}
                    <div className="space-y-6 lg:col-span-1">
                        
                        {/* Quick Actions Card */}
                        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                            <h3 className="mb-6 text-xl font-bold text-gray-900">
                                Aksi Cepat
                            </h3>
                            <div className="space-y-4">
                                <ActionItem label="Catat Mood" icon={<Smile className="h-5 w-5" />} />
                                <ActionItem label="Jurnal Baru" icon={<PenLine className="h-5 w-5" />} />
                                <ActionItem label="Tinjau Latihan" icon={<CheckSquare className="h-5 w-5" />} />
                            </div>
                        </div>

                        {/* Recent Entries Card */}
                        <div className="rounded-[2rem] bg-white p-8 shadow-sm">
                            <div className="mb-8 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900">
                                    Entri Terbaru
                                </h3>
                                <button className="text-sm font-bold text-[#1E70B9] hover:underline">
                                    Lihat Semua
                                </button>
                            </div>
                            
                            {/* Timeline */}
                            <div className="ml-2 space-y-6 border-l-2 border-gray-100">
                                <TimelineItem 
                                    title="Merasa Kewalahan di Kantor" 
                                    date="24 Okt 2023" 
                                    active 
                                />
                                <TimelineItem 
                                    title="Tidur Lebih Nyenyak Semalam" 
                                    date="22 Okt 2023" 
                                />
                                <TimelineItem 
                                    title="Kecemasan Meningkat Pagi Hari" 
                                    date="20 Okt 2023" 
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

// --- Mini Components for reusability & cleaner code ---

function ProgressItem({ label, percent }: { label: string; percent: number }) {
    return (
        <div>
            <div className="mb-3 flex justify-between text-sm font-bold">
                <span className="text-gray-900">{label}</span>
                <span className="text-gray-500">{percent}%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div 
                    className="h-full rounded-full bg-[#1264A3]" 
                    style={{ width: `${percent}%` }}
                ></div>
            </div>
        </div>
    );
}

function ActionItem({ label, icon }: { label: string; icon: React.ReactNode }) {
    return (
        <button className="flex w-full items-center justify-between rounded-2xl border border-gray-100 bg-[#FAFAFA] p-4 text-gray-600 transition-colors hover:border-gray-200 hover:bg-gray-50 active:bg-gray-100">
            <span className="font-semibold">{label}</span>
            <span className="text-gray-400">{icon}</span>
        </button>
    );
}

function TimelineItem({ title, date, active = false }: { title: string; date: string; active?: boolean }) {
    return (
        <div className="relative pl-6">
            {/* Timeline Dot */}
            <span 
                className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-4 border-white ${
                    active ? 'bg-[#1E70B9]' : 'bg-gray-300'
                }`}
            />
            <h4 className="text-sm font-bold text-gray-900">{title}</h4>
            <p className="mt-1 text-xs font-medium text-gray-500">{date}</p>
        </div>
    );
}
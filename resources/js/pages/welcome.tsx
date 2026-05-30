import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Brain,
    CloudRain,
    HeartHandshake,
    LayoutGrid,
    Smile,
    Users,
    MessageCircle,
    Calendar,
    FileText,
    BookOpen,
    UserCheck,
    Video,
    ShieldCheck,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';

type Props = {
    canRegister?: boolean;
};

const heroImage =
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGRvY3RvcnxlbnwwfHx8fDE3Nzg1MTMxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

const counselingTopics = [
    { name: 'Stres', icon: Brain },
    { name: 'Kecemasan', icon: Activity },
    { name: 'Depresi', icon: CloudRain },
    { name: 'Keluarga', icon: Users },
    { name: 'Trauma', icon: AlertCircle },
    { name: 'Hubungan', icon: HeartHandshake },
    { name: 'Lainnya', icon: LayoutGrid },
];

const mainServices = [
    {
        icon: MessageCircle,
        title: 'Chat Psikolog',
        description: 'Konsultasi online via chat atau panggilan',
        color: 'bg-blue-50 text-[#1464BC]',
    },
    {
        icon: Calendar,
        title: 'Buat Janji',
        description: 'Jadwalkan sesi tatap muka atau online',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: FileText,
        title: 'Tes Psikologi',
        description: 'Ketahui lebih dalam kondisi mentalmu',
        color: 'bg-violet-50 text-violet-600',
    },
    {
        icon: BookOpen,
        title: 'Artikel Edukasi',
        description: 'Tips dan panduan kesehatan mental',
        color: 'bg-amber-50 text-amber-600',
    },
];

const howItWorks = [
    {
        icon: UserCheck,
        title: 'Pilih Psikolog',
        description:
            'Pilih tenaga ahli yang sesuai dengan kebutuhan dan masalah yang sedang kamu hadapi.',
    },
    {
        icon: Calendar,
        title: 'Tentukan Waktu',
        description:
            'Pilih jadwal yang paling nyaman untukmu, bisa hari ini atau untuk beberapa hari ke depan.',
    },
    {
        icon: Video,
        title: 'Mulai Konsultasi',
        description:
            'Lakukan sesi konseling secara aman dan rahasia melalui platform kami.',
    },
];

function BrandMark({ inverted = false }: { inverted?: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`flex size-8 items-center justify-center rounded-xl ${
                    inverted
                        ? 'bg-white text-[#1464BC]'
                        : 'bg-[#1464BC] text-white shadow-sm shadow-blue-900/20'
                }`}
            >
                <Smile className="h-5 w-5" />
            </div>
            <span
                className={`text-xl font-black tracking-tight ${
                    inverted ? 'text-white' : 'text-[#1464BC]'
                }`}
            >
                Psikologku
            </span>
        </div>
    );
}

export default function Welcome({ canRegister = true }: Props) {
    const { auth } = usePage().props;
    const primaryAction = auth.user ? dashboard() : login();

    return (
        <>
            <Head title="Psikologku">
                <link rel="preconnect" href="https://images.unsplash.com" />
            </Head>

            <div className="min-h-screen bg-white font-sans text-gray-900">
                <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8">
                        <Link href="/" className="no-underline">
                            <BrandMark />
                        </Link>

                        <div className="hidden items-center gap-8 md:flex">
                            <a
                                href="#beranda"
                                className="text-[15px] font-bold text-gray-900 hover:text-[#1464BC]"
                            >
                                Beranda
                            </a>
                            <a
                                href="#layanan"
                                className="text-[15px] font-medium text-gray-600 hover:text-[#1464BC]"
                            >
                                Layanan
                            </a>
                            <a
                                href="#artikel"
                                className="text-[15px] font-medium text-gray-600 hover:text-[#1464BC]"
                            >
                                Artikel
                            </a>
                            <a
                                href="#tentang"
                                className="text-[15px] font-medium text-gray-600 hover:text-[#1464BC]"
                            >
                                Tentang Kami
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-xl bg-[#1464BC] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1053A0]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={login()}
                                    className="rounded-xl bg-[#1464BC] px-6 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#1053A0]"
                                >
                                    Masuk
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>

                <main>
                    {/* Hero Section */}
                    <section
                        id="beranda"
                        className="overflow-hidden bg-white px-4 pt-10 pb-16 sm:px-8 md:pt-16 md:pb-20"
                    >
                        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            {/* Left Side: Content */}
                            <div className="relative z-10 flex flex-col gap-6">
                                <h3 className="m-0 text-lg font-bold text-[#1464BC]">
                                    Jangan abaikan kesehatan mentalmu.
                                </h3>

                                <div className="flex flex-col gap-2">
                                    <h1 className="m-0 text-[36px] leading-[1.2] font-black text-gray-900 md:text-[44px]">
                                        Jelajahi Topik Konseling Umum
                                    </h1>
                                    <p className="m-0 text-lg text-gray-600">
                                        Pelajari masalah yang sering dihadapi.
                                    </p>
                                </div>

                                {/* Topics Grid */}
                                <div className="mt-4 flex flex-wrap gap-4">
                                    {counselingTopics.map((topic) => {
                                        const Icon = topic.icon;
                                        return (
                                            <button
                                                key={topic.name}
                                                className="group flex h-[110px] w-[110px] flex-col items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:border-blue-200 hover:bg-blue-50"
                                            >
                                                <div className="flex size-12 items-center justify-center rounded-full bg-white text-[#1464BC] shadow-sm transition-transform group-hover:scale-110">
                                                    <Icon className="h-6 w-6" />
                                                </div>
                                                <span className="text-center text-[13px] leading-tight font-semibold text-gray-700">
                                                    {topic.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <Link
                                        href={primaryAction}
                                        className="inline-flex rounded-xl bg-[#1464BC] px-8 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#1053A0]"
                                    >
                                        Carikan Ahli
                                    </Link>
                                    <a
                                        href="#cara-kerja"
                                        className="inline-flex rounded-xl bg-blue-50 px-8 py-3.5 text-base font-bold text-[#1464BC] transition-colors hover:bg-blue-100"
                                    >
                                        Pelajari Lebih Lanjut
                                    </a>
                                </div>
                            </div>

                            {/* Right Side: Image/Visual */}
                            <div className="relative mt-10 flex justify-center lg:mt-0 lg:justify-end">
                                <div className="relative w-full max-w-[450px]">
                                    {/* Abstract background shapes */}
                                    <div className="absolute top-10 right-0 bottom-0 left-10 rounded-full bg-[#1464BC]" />
                                    <div className="absolute top-1/4 -left-8 h-24 w-24 rounded-full border-[16px] border-[#1464BC] bg-transparent opacity-20" />
                                    <div className="absolute -right-4 bottom-1/4 h-16 w-16 rounded-full bg-blue-200" />
                                    <div className="absolute -bottom-6 left-1/4 flex size-16 rotate-12 items-center justify-center rounded-2xl bg-white shadow-xl">
                                        <Smile className="h-8 w-8 text-[#1464BC]" />
                                    </div>

                                    {/* Main Image */}
                                    <div className="relative z-10 aspect-[4/5] overflow-hidden rounded-t-[200px] rounded-br-[40px] rounded-bl-[100px] bg-blue-50">
                                        <img
                                            src={heroImage}
                                            alt="Konsultasi Psikolog"
                                            className="h-full w-full object-cover object-top"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Layanan Utama Section */}
                    <section
                        id="layanan"
                        className="bg-[#F8FAFC] px-4 py-16 sm:px-8 md:py-24"
                    >
                        <div className="mx-auto max-w-7xl">
                            <h2 className="mb-2 text-center text-[28px] font-black tracking-tight text-gray-900 md:text-[36px]">
                                Layanan Terpadu Kami
                            </h2>
                            <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-gray-600">
                                Berbagai kemudahan untuk menjaga dan
                                meningkatkan kualitas kesehatan mentalmu dalam
                                satu platform.
                            </p>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {mainServices.map((service) => {
                                    const Icon = service.icon;
                                    return (
                                        <div
                                            key={service.title}
                                            className="group cursor-pointer rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#1464BC] hover:shadow-xl hover:shadow-blue-900/5"
                                        >
                                            <div
                                                className={`mb-5 flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${service.color}`}
                                            >
                                                <Icon className="h-7 w-7" />
                                            </div>
                                            <h3 className="m-0 mb-2 text-[17px] font-bold text-gray-900 transition-colors group-hover:text-[#1464BC]">
                                                {service.title}
                                            </h3>
                                            <p className="m-0 text-[14px] leading-relaxed text-gray-500">
                                                {service.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* Cara Kerja Section */}
                    <section
                        id="cara-kerja"
                        className="bg-white px-4 py-16 sm:px-8 md:py-24"
                    >
                        <div className="mx-auto max-w-7xl">
                            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
                                <div>
                                    <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[13px] font-semibold text-[#1464BC]">
                                        <ShieldCheck className="h-4 w-4" />
                                        Aman & Terpercaya
                                    </div>
                                    <h2 className="m-0 mb-4 text-[32px] leading-tight font-black tracking-tight text-gray-900 md:text-[40px]">
                                        Konseling menjadi lebih mudah dan
                                        praktis
                                    </h2>
                                    <p className="mb-10 text-lg leading-relaxed text-gray-600">
                                        Kami memahami bahwa mengambil langkah
                                        pertama tidaklah mudah. Oleh karena itu,
                                        kami membuat prosesnya sesederhana
                                        mungkin.
                                    </p>

                                    <div className="flex flex-col gap-8">
                                        {howItWorks.map((step, index) => {
                                            const Icon = step.icon;
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex gap-4"
                                                >
                                                    <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1464BC]">
                                                        <Icon className="h-6 w-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="m-0 mb-1 text-[17px] font-bold text-gray-900">
                                                            {index + 1}.{' '}
                                                            {step.title}
                                                        </h4>
                                                        <p className="m-0 text-[14px] leading-relaxed text-gray-500">
                                                            {step.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="relative rounded-[2.5rem] bg-[#1464BC] p-8 text-white shadow-2xl shadow-blue-900/20 sm:p-12">
                                    <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-amber-400 opacity-20 blur-2xl" />
                                    <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-emerald-400 opacity-20 blur-3xl" />

                                    <h3 className="m-0 mb-4 text-[28px] leading-tight font-black">
                                        "Kesehatan mentalmu sama pentingnya
                                        dengan kesehatan fisikmu."
                                    </h3>
                                    <p className="mb-8 text-[15px] leading-relaxed text-blue-100">
                                        Jangan tunggu sampai masalah menjadi
                                        lebih besar. Konselor profesional kami
                                        siap mendengarkan tanpa menghakimi.
                                    </p>

                                    <Link
                                        href={primaryAction}
                                        className="inline-block w-full rounded-xl bg-white px-6 py-4 text-center text-[15px] font-bold text-[#1464BC] transition-colors hover:bg-blue-50 sm:w-auto"
                                    >
                                        Mulai Sesi Pertamamu
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer
                    id="tentang"
                    className="bg-gray-950 px-4 pt-16 pb-8 text-white sm:px-8"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-4">
                            <div className="flex flex-col gap-4">
                                <BrandMark inverted />
                                <p className="m-0 text-sm leading-relaxed text-gray-400">
                                    Platform layanan kesehatan mental online
                                    terpercaya di Indonesia. Kami hadir untuk
                                    mendengarkan.
                                </p>
                            </div>

                            <FooterColumn
                                title="Layanan"
                                links={[
                                    'Chat Psikolog',
                                    'Buat Janji Klinik',
                                    'Tes Psikologi',
                                    'Psikologku for Business',
                                ]}
                            />
                            <FooterColumn
                                title="Perusahaan"
                                links={[
                                    'Tentang Kami',
                                    'Karir',
                                    'Hubungi Kami',
                                    'Blog',
                                ]}
                            />
                            <FooterColumn
                                title="Bantuan"
                                links={[
                                    'Pusat Bantuan',
                                    'Syarat & Ketentuan',
                                    'Kebijakan Privasi',
                                ]}
                            />
                        </div>

                        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
                            <span className="text-sm text-gray-500">
                                (c) {new Date().getFullYear()} Psikologku. Hak
                                Cipta Dilindungi.
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold">{title}</h4>
            {links.map((link) => (
                <a
                    key={link}
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                    {link}
                </a>
            ))}
        </div>
    );
}

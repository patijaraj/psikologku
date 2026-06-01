import { Head, Link, usePage } from '@inertiajs/react';
import {
    Activity,
    AlertCircle,
    Brain,
    CloudRain,
    HeartHandshake,
    LayoutGrid,
    Users,
    BookOpen,
    Calendar,
    Clock,
    FileText,
    MessageCircle,
    Search,
    ShieldCheck,
    Smile,
    Star,
    UserCheck,
    Briefcase,
    ShieldAlert,
    TrendingUp,
    Baby,
    Puzzle,
    CloudLightning,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';

type Props = {
    canRegister?: boolean;
};

type Service = {
    icon: typeof MessageCircle;
    title: string;
    description: string;
    color: string;
};

const heroImage =
    'https://images.unsplash.com/photo-1758691462743-f9fc9e430d39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGRvY3RvciUyMHBzeWNob2xvZ2lzdCUyMG9ubGluZSUyMGNvbnN1bHRhdGlvbnxlbnwxfHx8fDE3Nzg1MTMxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const mobileUserImage =
    'https://images.unsplash.com/photo-1775479367275-424c38c3df6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHdvbWFuJTIwc21pbGluZyUyMHBob25lfGVufDF8fHx8MTc3ODUxMzEzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

const specializations = [
    { name: 'Stress', icon: Brain },
    { name: 'Gangguan Kecemasan', icon: Activity },
    { name: 'Depresi', icon: CloudRain },
    { name: 'Keluarga dan Hubungan', icon: HeartHandshake },
    { name: 'Trauma', icon: AlertCircle },
    { name: 'Gangguan Mood', icon: CloudLightning },
    { name: 'Pekerjaan dan Karir', icon: Briefcase },
    { name: 'Kecanduan', icon: ShieldAlert },
    { name: 'Pengembangan Diri', icon: TrendingUp },
    { name: 'Parenting dan Anak', icon: Baby },
    { name: 'Gangguan Kepribadian', icon: Puzzle },
    { name: 'Identitas Seksual', icon: Users },
];

const mainServices: Service[] = [
    {
        icon: UserCheck,
        title: 'Psikolog Profesional',
        description: 'Temukan tenaga ahli yang berlisensi dan berpengalaman',
        color: 'bg-blue-50 text-[#1464BC]',
    },
    {
        icon: Calendar,
        title: 'Buat Jadwal Mudah',
        description: 'Jadwalkan sesi konsultasi sesuai dengan waktu luangmu',
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        icon: FileText,
        title: 'Rekam Medis Tersimpan',
        description: 'Akses hasil dan catatan konsultasi kapan saja dengan aman',
        color: 'bg-violet-50 text-violet-600',
    },
    {
        icon: ShieldCheck,
        title: 'Privasi Terjamin',
        description: 'Setiap sesi dan data pribadimu dijaga kerahasiaannya',
        color: 'bg-amber-50 text-amber-600',
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

function LandingImage({
    src,
    alt,
    className,
}: {
    src: string;
    alt: string;
    className?: string;
}) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            loading="lazy"
            onError={(event) => {
                event.currentTarget.src =
                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1080&auto=format&fit=crop';
            }}
        />
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
                <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
                    <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8">
                        <Link href="/" className="no-underline">
                            <BrandMark />
                        </Link>

                        <div className="hidden items-center gap-8 md:flex">
                            <a
                                href="#beranda"
                                className="text-[15px] font-semibold text-gray-900 transition-colors hover:text-[#1464BC]"
                            >
                                Beranda
                            </a>
                            <a
                                href="#layanan"
                                className="text-[15px] font-medium text-gray-600 transition-colors hover:text-[#1464BC]"
                            >
                                Layanan
                            </a>
                            <a
                                href="#artikel"
                                className="text-[15px] font-medium text-gray-600 transition-colors hover:text-[#1464BC]"
                            >
                                Artikel
                            </a>
                            <a
                                href="#tentang"
                                className="text-[15px] font-medium text-gray-600 transition-colors hover:text-[#1464BC]"
                            >
                                Tentang Kami
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-xl bg-[#1464BC] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm shadow-blue-900/20 transition-colors hover:bg-[#1053A0]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="hidden rounded-xl px-4 py-2 text-[15px] font-semibold text-[#1464BC] transition-colors hover:bg-blue-50 sm:flex"
                                    >
                                        Masuk
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-xl bg-[#1464BC] px-5 py-2.5 text-[15px] font-semibold text-white shadow-sm shadow-blue-900/20 transition-colors hover:bg-[#1053A0]"
                                        >
                                            Daftar
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <main>
                    <section
                        id="beranda"
                        className="overflow-hidden bg-[#F8FAFC] px-4 pt-12 pb-20 sm:px-8 md:pt-20 md:pb-24"
                    >
                        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            <div className="relative z-10 flex flex-col gap-8">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-[13px] font-semibold text-[#1464BC] ring-1 ring-blue-100">
                                    <ShieldCheck className="h-4 w-4" />
                                    Platform kesehatan mental terpercaya
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h1 className="m-0 max-w-2xl text-[42px] leading-[1.08] font-black tracking-tight text-gray-950 md:text-[56px]">
                                        Temukan ketenangan bersama ahlinya.
                                    </h1>
                                    <p className="m-0 max-w-[540px] text-lg leading-relaxed text-gray-600">
                                        Konsultasi dengan psikolog klinis
                                        berlisensi kapan saja, di mana saja.
                                        Solusi kesehatan mental yang aman,
                                        rahasia, dan profesional.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="mb-3 text-sm font-bold text-gray-900">Spesialisasi</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {specializations.map((topic) => {
                                            const Icon = topic.icon;
                                            return (
                                                <button
                                                    key={topic.name}
                                                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2 pr-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md hover:shadow-blue-900/5"
                                                >
                                                    <div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#1464BC] transition-transform group-hover:scale-110">
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-[13px] font-semibold text-gray-700">
                                                        {topic.name}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex -space-x-3">
                                            <div className="h-8 w-8 rounded-full border-2 border-white bg-blue-200" />
                                            <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-200" />
                                            <div className="h-8 w-8 rounded-full border-2 border-white bg-amber-200" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-950">
                                                10rb+
                                            </span>
                                            <span className="text-xs font-medium text-gray-500">
                                                Pengguna aktif
                                            </span>
                                        </div>
                                    </div>
                                    <div className="hidden h-8 w-px bg-gray-200 sm:block" />
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                            <span className="text-sm font-bold text-gray-950">
                                                4.9/5
                                            </span>
                                        </div>
                                        <span className="text-xs font-medium text-gray-500">
                                            Rating pengguna
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex justify-center lg:justify-end">
                                <div className="absolute top-1/2 left-1/2 -z-10 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/70 blur-3xl" />

                                <div className="relative aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[2rem] border-8 border-white shadow-2xl shadow-blue-950/15">
                                    <LandingImage
                                        src={heroImage}
                                        alt="Konsultasi psikolog online"
                                        className="h-full w-full object-cover"
                                    />

                                    <div className="absolute right-5 bottom-5 left-5 flex items-center gap-4 rounded-2xl bg-white/92 p-4 shadow-lg shadow-blue-950/10 backdrop-blur">
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="m-0 text-[15px] font-bold text-gray-950">
                                                Tersedia 24/7
                                            </h4>
                                            <p className="m-0 mt-0.5 text-[13px] text-gray-500">
                                                Psikolog siap membantumu kapan
                                                saja
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="layanan"
                        className="bg-white px-4 py-16 sm:px-8 md:py-24"
                    >
                        <div className="mx-auto max-w-7xl">
                            <h2 className="mb-10 text-center text-[28px] font-black tracking-tight text-gray-950 md:text-4xl">
                                Layanan Utama Kami
                            </h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {mainServices.map((service) => {
                                    const Icon = service.icon;

                                    return (
                                        <div
                                            key={service.title}
                                            className="group cursor-pointer rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-[#1464BC] hover:shadow-xl hover:shadow-blue-900/10"
                                        >
                                            <div
                                                className={`mb-6 flex size-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${service.color}`}
                                            >
                                                <Icon className="h-7 w-7" />
                                            </div>
                                            <h3 className="m-0 mb-2 text-lg font-bold text-gray-950 transition-colors group-hover:text-[#1464BC]">
                                                {service.title}
                                            </h3>
                                            <p className="m-0 text-sm text-gray-500">
                                                {service.description}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section
                        id="artikel"
                        className="bg-white px-4 py-20 sm:px-8"
                    >
                        <div className="mx-auto flex max-w-7xl flex-col items-center overflow-hidden rounded-[2rem] bg-[#1464BC] md:flex-row">
                            <div className="flex flex-1 flex-col gap-6 p-8 text-white sm:p-10 md:p-16">
                                <h2 className="m-0 max-w-xl text-[32px] leading-tight font-black tracking-tight md:text-[40px]">
                                    Langkah kecil menuju perubahan besar.
                                </h2>
                                <p className="m-0 max-w-[460px] text-base leading-relaxed text-blue-100 md:text-lg">
                                    Bergabunglah dengan ribuan orang yang telah
                                    merasakan manfaat konseling bersama
                                    Psikologku. Jadwalkan sesimu hari ini.
                                </p>
                                <div className="pt-2">
                                    <Link
                                        href={primaryAction}
                                        className="inline-block w-full rounded-xl bg-white px-8 py-4 text-center text-base font-bold text-[#1464BC] transition-colors hover:bg-blue-50 sm:w-auto"
                                    >
                                        {auth.user
                                            ? 'Buka Dashboard'
                                            : 'Mulai Konsultasi Sekarang'}
                                    </Link>
                                </div>
                            </div>
                            <div className="h-[300px] w-full self-stretch md:h-auto md:w-[45%]">
                                <LandingImage
                                    src={mobileUserImage}
                                    alt="Pengguna Psikologku tersenyum dengan ponsel"
                                    className="h-full w-full object-cover"
                                />
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
                                title="Platform"
                                links={[
                                    { label: 'Masuk', href: login() },
                                    { label: 'Daftar', href: register() },
                                ]}
                            />
                            <FooterColumn
                                title="Layanan"
                                links={[
                                    { label: 'Pilih Psikolog', href: primaryAction },
                                    { label: 'Buat Janji', href: primaryAction },
                                ]}
                            />
                            <FooterColumn
                                title="Bantuan"
                                links={[
                                    { label: 'Hubungi CS', href: 'mailto:support@psikologku.com' },
                                    { label: 'Pusat Bantuan', href: '#' },
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

function FooterColumn({ title, links }: { title: string; links: { label: string; href: any }[] }) {
    return (
        <div className="flex flex-col gap-4">
            <h4 className="text-base font-bold">{title}</h4>
            {links.map((link) => {
                const hrefString = String(link.href || '');
                if (hrefString.startsWith('http') || hrefString.startsWith('mailto:') || hrefString === '#') {
                    return (
                        <a
                            key={link.label}
                            href={hrefString}
                            className="text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            {link.label}
                        </a>
                    );
                }
                return (
                    <Link
                        key={link.label}
                        href={link.href}
                        className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                        {link.label}
                    </Link>
                );
            })}
        </div>
    );
}

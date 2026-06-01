import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import {
    Menu,
    Smile,
    X,
    User as UserIcon,
    Settings,
    ArrowRight
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { InitialsAvatar } from '@/components/initials-avatar';
import { NotificationDropdown } from '@/components/notification-dropdown';
import { dashboard } from '@/routes';
import userProfile from '@/routes/user-profile';
import { MiniFooter } from '@/components/mini-footer';

interface User {
    name: string;
    email: string;
    phone: string;
    birthdate: string | null;
    gender: string;
    birthplace: string;
    address: string;
    photo_url: string | null;
}

const navItems = [
    { label: 'Dashboard', path: '/dashboard', active: false },
    { label: 'Therapist', path: '/therapists', active: false },
    { label: 'Sessions', path: '/sessions', active: false },
    { label: 'Record', path: '/records', active: false },
];

function InfoPoint({ text }: { text: string }) {
    return (
        <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
            <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#1464BC]">
                <ArrowRight className="h-3 w-3" strokeWidth={3} />
            </div>
            <p className="m-0 text-sm font-medium leading-relaxed text-blue-50">
                {text}
            </p>
        </div>
    );
}

export default function EditProfile({ user }: { user: User }) {
    const { auth } = usePage().props as any;
    const userName = auth.user?.name ?? 'User';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(user.photo_url || null);
    
    // Parse birthdate
    const parsedDate = user.birthdate ? new Date(user.birthdate) : null;
    const [birthDay, setBirthDay] = useState(parsedDate ? String(parsedDate.getDate()).padStart(2, '0') : '');
    const [birthMonth, setBirthMonth] = useState(parsedDate ? String(parsedDate.getMonth() + 1).padStart(2, '0') : '');
    const [birthYear, setBirthYear] = useState(parsedDate ? String(parsedDate.getFullYear()) : '');

    const isCustomGender = !['Laki-laki', 'Perempuan'].includes(user.gender || '') && !!user.gender;
    const [genderSelect, setGenderSelect] = useState(isCustomGender ? 'Lainnya' : (user.gender || ''));
    const [customGender, setCustomGender] = useState(isCustomGender ? user.gender : '');

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        phone: user.phone || '',
        birthplace: user.birthplace || '',
        birthdate: user.birthdate || '',
        gender: user.gender || '',
        address: user.address || '',
        photo: null as File | null,
    });

    useEffect(() => {
        const bd = birthYear && birthMonth && birthDay ? `${birthYear}-${birthMonth}-${birthDay}` : '';
        setData('birthdate', bd);
    }, [birthDay, birthMonth, birthYear]);

    useEffect(() => {
        setData('gender', genderSelect === 'Lainnya' ? customGender : genderSelect);
    }, [genderSelect, customGender]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(userProfile.update.url(), {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#f7f9fb] font-sans">
            <Head title="Edit Profil Akun" />
            
            <nav className="sticky top-0 z-50 border-b border-[#e2e4e6] bg-white">
                <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-8 lg:gap-16">
                        <Link
                            href={dashboard()}
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
                        <InitialsAvatar
                            name={userName}
                            photoUrl={(auth.user as any)?.photo_url}
                            className="size-9"
                        />
                        <button
                            type="button"
                            aria-label="Buka menu"
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

            <main className="mx-auto grid max-w-[1120px] grid-cols-1 gap-8 px-4 py-8 sm:px-8 md:py-12 lg:grid-cols-[0.9fr_1.1fr]">
                <section className="h-fit rounded-3xl bg-[#1464BC] p-8 text-white shadow-[0_18px_40px_-24px_rgba(0,93,167,0.55)]">
                    <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-white/15">
                        <Settings className="h-7 w-7" />
                    </div>
                    <p className="m-0 mb-3 text-sm font-bold tracking-widest text-blue-100 uppercase">
                        Pengaturan Akun
                    </p>
                    <h1 className="m-0 text-[34px] leading-tight font-black tracking-tight md:text-[44px]">
                        Lengkapi profil pribadi Anda.
                    </h1>
                    <p className="m-0 mt-5 text-base leading-relaxed font-medium text-blue-50">
                        Pastikan data diri Anda sudah benar. Data ini akan digunakan untuk kebutuhan rekam medis dan administrasi konsultasi Anda.
                    </p>

                    <div className="mt-10 flex flex-col gap-4">
                        <InfoPoint text="Data diri dijaga kerahasiaannya sesuai standar medis." />
                        <InfoPoint text="Alamat email digunakan sebagai identitas utama sehingga tidak dapat diubah." />
                        <InfoPoint text="Gunakan pas foto yang jelas dan terlihat sopan." />
                    </div>
                </section>

                <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                    <div className="mb-8">
                        <h2 className="m-0 text-2xl font-black text-[#191c1e]">
                            Detail Profil
                        </h2>
                        <p className="m-0 mt-2 text-sm leading-relaxed font-medium text-[#717783]">
                            Ubah informasi dasar dan foto profil Anda di sini.
                        </p>
                    </div>

                    <form onSubmit={submit} className="flex flex-col gap-5" encType="multipart/form-data">
                        
                        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#e2e4e6] bg-[#fdfdfd] p-5 shadow-xs">
                            <span className="ml-1 self-start text-[13px] font-semibold text-[#191c1e]">
                                Foto Profil
                            </span>
                            <div className="group relative">
                                {photoPreview ? (
                                    <img
                                        src={photoPreview}
                                        alt="Foto Profil Preview"
                                        className="size-28 rounded-full border-2 border-[#1464BC] object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="flex size-28 items-center justify-center rounded-full border border-[#e2e4e6] bg-[#f2f4f6] text-[#717783]">
                                        <UserIcon className="size-12" />
                                    </div>
                                )}
                            </div>
                            <div className="flex w-full flex-col items-center gap-1.5">
                                <label
                                    htmlFor="photo-upload"
                                    className="flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg border border-[#1464BC] bg-transparent px-4 text-sm font-semibold text-[#1464BC] transition-colors hover:bg-[#eef5fe]"
                                >
                                    {photoPreview ? 'Ubah Foto' : 'Pilih Foto'}
                                </label>
                                <input
                                    id="photo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoChange}
                                />
                                <span className="text-[11px] text-[#717783]">
                                    Format: JPG, PNG. Maksimal 2MB.
                                </span>
                                <InputError message={errors.photo} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                Nama Lengkap
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={data.name}
                                onChange={(e: any) => setData('name', e.target.value)}
                                className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                Alamat Email
                            </label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-[#f2f4f6] px-4 text-[15px] text-[#717783] shadow-sm outline-none cursor-not-allowed"
                            />
                            <span className="ml-1 text-[11px] text-[#717783]">Alamat email ini tidak dapat diubah.</span>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="phone" className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                    Nomor Telepon
                                </label>
                                <input
                                    id="phone"
                                    type="text"
                                    required
                                    value={data.phone}
                                    onChange={(e: any) => setData('phone', e.target.value)}
                                    className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="birthplace" className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                    Tempat Lahir
                                </label>
                                <input
                                    id="birthplace"
                                    type="text"
                                    required
                                    value={data.birthplace}
                                    onChange={(e: any) => setData('birthplace', e.target.value)}
                                    className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                />
                                <InputError message={errors.birthplace} />
                            </div>
                        </div>

                        <BirthdateField
                            day={birthDay}
                            month={birthMonth}
                            year={birthYear}
                            onDayChange={setBirthDay}
                            onMonthChange={setBirthMonth}
                            onYearChange={setBirthYear}
                            error={errors.birthdate}
                        />

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                Jenis Kelamin
                            </label>
                            <select
                                required
                                value={genderSelect}
                                onChange={(e) => setGenderSelect(e.target.value)}
                                className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                            >
                                <option value="" disabled hidden>Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                            {genderSelect === 'Lainnya' && (
                                <input
                                    type="text"
                                    placeholder="Sebutkan jenis kelamin"
                                    required
                                    value={customGender}
                                    onChange={(e) => setCustomGender(e.target.value)}
                                    className="mt-2 h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                />
                            )}
                            <InputError message={errors.gender} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                Alamat Lengkap
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={data.address}
                                onChange={(e: any) => setData('address', e.target.value)}
                                className="w-full resize-y rounded-[14px] border border-[#e2e4e6] bg-white px-4 py-3 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                            />
                            <InputError message={errors.address} />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1464BC] px-8 text-[15px] font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
                            >
                                {processing && <Spinner className="h-4 w-4" />}
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </section>
            </main>
            
            <MiniFooter />
        </div>
    );
}

const months = [
    { value: '01', label: 'Januari' }, { value: '02', label: 'Februari' }, { value: '03', label: 'Maret' },
    { value: '04', label: 'April' }, { value: '05', label: 'Mei' }, { value: '06', label: 'Juni' },
    { value: '07', label: 'Juli' }, { value: '08', label: 'Agustus' }, { value: '09', label: 'September' },
    { value: '10', label: 'Oktober' }, { value: '11', label: 'November' }, { value: '12', label: 'Desember' },
];

const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const years = Array.from({ length: 90 }, (_, i) => String(new Date().getFullYear() - i));

function BirthdateField({ day, month, year, onDayChange, onMonthChange, onYearChange, error }: any) {
    const maxDays = month && year ? new Date(Number(year), Number(month), 0).getDate() : 31;
    const availableDays = days.slice(0, maxDays);

    return (
        <div className="flex w-full flex-col gap-1.5">
            <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                Tanggal Lahir
            </label>
            <div className="grid grid-cols-[1fr_1.2fr_1.1fr] gap-3">
                <select required value={day} onChange={(e) => onDayChange(e.target.value)} className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-[#1464BC]">
                    <option value="">Tgl</option>
                    {availableDays.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select required value={month} onChange={(e) => onMonthChange(e.target.value)} className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-[#1464BC]">
                    <option value="">Bulan</option>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select required value={year} onChange={(e) => onYearChange(e.target.value)} className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-[#1464BC]">
                    <option value="">Tahun</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            <InputError message={error} />
        </div>
    );
}

import { Form, Head, Link, router } from '@inertiajs/react';
import { Calendar, LogOut, Phone, ShieldCheck, Smile } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';

export default function CompleteProfile() {
    const [birthDay, setBirthDay] = useState('');
    const [birthMonth, setBirthMonth] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [genderSelect, setGenderSelect] = useState('');
    const [customGender, setCustomGender] = useState('');
    const [birthplace, setBirthplace] = useState('');
    const [address, setAddress] = useState('');
    const birthdate =
        birthYear && birthMonth && birthDay
            ? `${birthYear}-${birthMonth}-${birthDay}`
            : '';

    const handleLogout = () => {
        router.flushAll();
    };

    return (
        <div
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-6 font-sans md:px-8"
            style={{
                backgroundImage:
                    'linear-gradient(135deg, #f0f6fc 0%, #e1eef9 100%)',
            }}
        >
            <Head title="Lengkapi Profil" />

            <div className="pointer-events-none absolute top-[-10%] left-[-5%] h-[40vw] w-[40vw] rounded-full bg-[#1464BC] opacity-[0.03] blur-[60px]" />
            <div className="pointer-events-none absolute right-[-5%] bottom-[-10%] h-[30vw] w-[30vw] rounded-full bg-[#1464BC] opacity-[0.04] blur-[60px]" />

            <div className="relative w-full max-w-[540px] rounded-[28px] border border-white/60 bg-white/85 p-8 shadow-[0px_24px_48px_-12px_rgba(0,93,167,0.14)] backdrop-blur-xl md:p-12">
                <div className="mb-8 flex flex-col items-center gap-3 text-center">
                    <div className="flex size-12 items-center justify-center rounded-[14px] bg-[#1464BC] text-white shadow-md shadow-blue-900/20">
                        <Smile className="h-7 w-7" />
                    </div>
                    <div>
                        <h1 className="m-0 text-[28px] font-black tracking-tight text-[#191c1e] md:text-[32px]">
                            Sikit lagi! Lengkapi data dirimu dulu ya.
                        </h1>
                        <p className="m-0 mt-2 text-[15px] leading-relaxed font-medium text-[#717783]">
                            Nomor telepon dan tanggal lahir membantu kami
                            menjaga keamanan akun serta menyiapkan layanan yang
                            lebih sesuai untukmu.
                        </p>
                    </div>
                </div>

                <Form
                    action="/complete-profile"
                    method="put"
                    transform={(data) => ({
                        ...data,
                        gender: genderSelect === 'Lainnya' ? customGender : genderSelect,
                        birthplace,
                        address,
                    })}
                    disableWhileProcessing
                    className="flex flex-col gap-5"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="phone"
                                    className="ml-1 flex items-center gap-2 text-[13px] font-semibold text-[#191c1e]"
                                >
                                    <Phone className="h-4 w-4 text-[#1464BC]" />
                                    No. Telepon
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    autoFocus
                                    autoComplete="tel"
                                    placeholder="08123456789"
                                    className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="birthplace"
                                    className="ml-1 text-[13px] font-semibold text-[#191c1e]"
                                >
                                    Tempat Lahir
                                </label>
                                <input
                                    id="birthplace"
                                    name="birthplace"
                                    type="text"
                                    required
                                    placeholder="Jakarta"
                                    value={birthplace}
                                    onChange={(e) => setBirthplace(e.target.value)}
                                    className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                />
                                <InputError message={errors.birthplace} />
                            </div>

                            <BirthdateField
                                day={birthDay}
                                month={birthMonth}
                                year={birthYear}
                                value={birthdate}
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
                                    aria-label="Jenis Kelamin"
                                    required
                                    value={genderSelect}
                                    onChange={(e) => setGenderSelect(e.target.value)}
                                    className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                >
                                    <option value="" disabled hidden>Pilih</option>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                    <option value="Lainnya">Lainnya (Isi sendiri)</option>
                                </select>
                                {genderSelect === 'Lainnya' && (
                                    <input
                                        type="text"
                                        placeholder="Sebutkan jenis kelamin"
                                        required
                                        value={customGender}
                                        onChange={(e) => setCustomGender(e.target.value)}
                                        className="mt-2 h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                    />
                                )}
                                <InputError message={errors.gender} />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="address" className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                    Alamat Lengkap
                                </label>
                                <textarea
                                    id="address"
                                    name="address"
                                    required
                                    placeholder="Alamat domisili saat ini"
                                    rows={3}
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full resize-y rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 py-3 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="flex items-start gap-3 rounded-2xl bg-[#eef5fe] p-4 text-[#1464BC]">
                                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
                                <p className="m-0 text-[13px] leading-relaxed font-semibold">
                                    Data ini hanya digunakan untuk kebutuhan
                                    layanan Psikologku dan tidak ditampilkan ke
                                    pengguna lain.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="mt-1 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-none bg-[#1464BC] text-base font-semibold text-white shadow-[0px_8px_24px_-8px_rgba(0,93,167,0.5)] transition-colors hover:bg-[#1053A0] disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing && <Spinner className="h-4 w-4" />}
                                Simpan & Lanjut
                            </button>

                            <Link
                                href={logout()}
                                as="button"
                                className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#e2e4e6] bg-white/80 text-sm font-semibold text-[#717783] transition-colors hover:bg-[#feecec] hover:text-[#b02a2a]"
                                onClick={handleLogout}
                                data-test="complete-profile-logout-button"
                            >
                                <LogOut className="h-4 w-4" />
                                Keluar dulu
                            </Link>
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}

CompleteProfile.layout = {};

const months = [
    { value: '01', label: 'Jan' },
    { value: '02', label: 'Feb' },
    { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' },
    { value: '05', label: 'Mei' },
    { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' },
    { value: '08', label: 'Agu' },
    { value: '09', label: 'Sep' },
    { value: '10', label: 'Okt' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Des' },
];

const days = Array.from({ length: 31 }, (_, index) =>
    String(index + 1).padStart(2, '0'),
);

const years = Array.from({ length: 90 }, (_, index) =>
    String(new Date().getFullYear() - index),
);

function BirthdateField({
    day,
    month,
    year,
    value,
    onDayChange,
    onMonthChange,
    onYearChange,
    error,
}: {
    day: string;
    month: string;
    year: string;
    value: string;
    onDayChange: (value: string) => void;
    onMonthChange: (value: string) => void;
    onYearChange: (value: string) => void;
    error?: string;
}) {
    const maxDays =
        month && year ? new Date(Number(year), Number(month), 0).getDate() : 31;
    const availableDays = days.slice(0, maxDays);
    const keepValidDay = (nextMonth: string, nextYear: string) => {
        const nextMaxDays =
            nextMonth && nextYear
                ? new Date(Number(nextYear), Number(nextMonth), 0).getDate()
                : 31;

        if (day && Number(day) > nextMaxDays) {
            onDayChange('');
        }
    };

    return (
        <div className="flex w-full flex-col gap-1.5">
            <label className="ml-1 flex items-center gap-2 text-[13px] font-semibold text-[#191c1e]">
                <Calendar className="h-4 w-4 text-[#1464BC]" />
                Tanggal Lahir
            </label>
            <input type="hidden" name="birthdate" value={value} />
            <div className="grid grid-cols-[0.9fr_1fr_1.1fr] gap-2">
                <select
                    aria-label="Tanggal lahir"
                    required
                    value={day}
                    onChange={(event) => onDayChange(event.target.value)}
                    className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white/90 px-3 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                >
                    <option value="">Tgl</option>
                    {availableDays.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
                <select
                    aria-label="Bulan lahir"
                    required
                    value={month}
                    onChange={(event) => {
                        keepValidDay(event.target.value, year);
                        onMonthChange(event.target.value);
                    }}
                    className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white/90 px-3 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                >
                    <option value="">Bln</option>
                    {months.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
                <select
                    aria-label="Tahun lahir"
                    required
                    value={year}
                    onChange={(event) => {
                        keepValidDay(month, event.target.value);
                        onYearChange(event.target.value);
                    }}
                    className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white/90 px-3 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                >
                    <option value="">Thn</option>
                    {years.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <InputError message={error} />
        </div>
    );
}

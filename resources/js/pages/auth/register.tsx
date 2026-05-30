import { Form, Head, Link } from '@inertiajs/react';
import { Eye, EyeOff, Smile } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    return (
        <div
            className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-6 md:px-8"
            style={{
                backgroundImage:
                    'linear-gradient(135deg, #f0f6fc 0%, #e1eef9 100%)',
            }}
        >
            <Head title="Register" />

            <div className="pointer-events-none absolute top-[-10%] left-[-5%] h-[40vw] w-[40vw] rounded-full bg-[#1464BC] opacity-[0.03] blur-[60px]" />
            <div className="pointer-events-none absolute right-[-5%] bottom-[-10%] h-[30vw] w-[30vw] rounded-full bg-[#1464BC] opacity-[0.04] blur-[60px]" />

            <div className="relative flex w-full max-w-[600px] flex-col items-center rounded-[28px] border border-white/60 bg-white/80 shadow-[0px_24px_48px_-12px_rgba(0,93,167,0.1)] backdrop-blur-xl">
                <div className="flex w-full flex-col justify-center p-8 md:p-12">
                    <div className="mb-7 flex w-full flex-col items-center gap-2 text-center">
                        <Link
                            href="/"
                            className="mb-2 flex size-12 items-center justify-center rounded-[14px] bg-[#1464BC] text-white no-underline shadow-md shadow-blue-900/20"
                        >
                            <Smile className="h-7 w-7" />
                        </Link>
                        <h1 className="m-0 text-[28px] font-black tracking-tight text-[#191c1e] md:text-[32px]">
                            Buat Akun Baru
                        </h1>
                        <p className="m-0 text-[15px] font-medium text-[#717783]">
                            Sudah punya akun?{' '}
                            <Link
                                href={login()}
                                className="font-semibold text-[#1464BC] transition-colors hover:text-[#1053A0] hover:underline"
                            >
                                Masuk di sini
                            </Link>
                        </p>
                    </div>

                    <Form
                        {...store.form({
                            query: undefined,
                            mergeQuery: undefined,
                        })}
                        transform={(data) => ({
                            ...data,
                            gender: genderSelect === 'Lainnya' ? customGender : genderSelect,
                            birthplace,
                            address,
                        })}
                        resetOnSuccess={['password', 'password_confirmation']}
                        disableWhileProcessing
                        className="flex w-full flex-col gap-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="flex w-full flex-col gap-4 md:flex-row">
                                    <Field
                                        id="name"
                                        name="name"
                                        label="Nama Lengkap"
                                        placeholder="John Doe"
                                        autoComplete="name"
                                        tabIndex={1}
                                        error={errors.name}
                                    />

                                    <Field
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="email"
                                        placeholder="name@example.com"
                                        autoComplete="email"
                                        tabIndex={2}
                                        error={errors.email}
                                    />
                                </div>

                                <div className="flex w-full flex-col gap-4 md:flex-row">
                                    <Field
                                        id="birthplace"
                                        name="birthplace"
                                        label="Tempat Lahir"
                                        placeholder="Jakarta"
                                        tabIndex={3}
                                        value={birthplace}
                                        onChange={(e) => setBirthplace(e.target.value)}
                                        error={errors.birthplace}
                                    />

                                    <BirthdateField
                                        day={birthDay}
                                        month={birthMonth}
                                        year={birthYear}
                                        value={birthdate}
                                        onDayChange={setBirthDay}
                                        onMonthChange={setBirthMonth}
                                        onYearChange={setBirthYear}
                                        tabIndexStart={4}
                                        error={errors.birthdate}
                                    />
                                </div>

                                <div className="flex w-full flex-col gap-4 md:flex-row">
                                    <div className="flex w-full flex-col gap-1.5 md:w-1/2">
                                        <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                            Jenis Kelamin
                                        </label>
                                        <select
                                            aria-label="Jenis Kelamin"
                                            required
                                            value={genderSelect}
                                            onChange={(e) => setGenderSelect(e.target.value)}
                                            tabIndex={6}
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

                                    <Field
                                        id="phone"
                                        name="phone"
                                        label="No. Telepon"
                                        type="tel"
                                        placeholder="08123456789"
                                        autoComplete="tel"
                                        tabIndex={7}
                                        error={errors.phone}
                                    />
                                </div>

                                <div className="flex w-full flex-col gap-1.5">
                                    <label htmlFor="address" className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                        Alamat Lengkap
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        required
                                        placeholder="Alamat domisili saat ini"
                                        rows={3}
                                        tabIndex={8}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full resize-y rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 py-3 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                    />
                                    <InputError message={errors.address} />
                                </div>



                                <div className="flex w-full flex-col gap-1.5">
                                    <label
                                        htmlFor="password"
                                        className="ml-1 text-[13px] font-semibold text-[#191c1e]"
                                    >
                                        Kata Sandi
                                    </label>
                                    <div className="relative w-full">
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="password"
                                            value={password}
                                            onChange={(event) =>
                                                setPassword(event.target.value)
                                            }
                                            placeholder="Minimal 8 karakter"
                                            required
                                            minLength={8}
                                            tabIndex={10}
                                            autoComplete="new-password"
                                            className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 pr-12 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                        />
                                        <input
                                            type="hidden"
                                            name="password_confirmation"
                                            value={password}
                                        />
                                        <button
                                            type="button"
                                            aria-label={
                                                showPassword
                                                    ? 'Sembunyikan kata sandi'
                                                    : 'Tampilkan kata sandi'
                                            }
                                            className="absolute top-1/2 right-3 flex h-full -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-transparent px-2 text-[#717783] transition-colors hover:text-[#191c1e]"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <label className="group mt-2 ml-1 flex cursor-pointer items-start gap-3 text-left">
                                    <input
                                        type="checkbox"
                                        required
                                        className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer rounded border-[#c1c7d3] accent-[#1464BC]"
                                    />
                                    <span className="text-[13px] leading-normal font-medium text-[#717783] transition-colors group-hover:text-[#414751]">
                                        Saya menyetujui{' '}
                                        <a
                                            href="#"
                                            className="font-semibold text-[#1464BC] hover:underline"
                                        >
                                            Syarat & Ketentuan
                                        </a>{' '}
                                        serta{' '}
                                        <a
                                            href="#"
                                            className="font-semibold text-[#1464BC] hover:underline"
                                        >
                                            Kebijakan Privasi
                                        </a>{' '}
                                        yang berlaku.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    className="mt-4 flex h-[52px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-none bg-[#1464BC] text-base font-semibold text-white shadow-[0px_8px_24px_-8px_rgba(0,93,167,0.5)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                                    disabled={processing}
                                    data-test="register-user-button"
                                    tabIndex={11}
                                >
                                    {processing && (
                                        <Spinner className="h-4 w-4" />
                                    )}
                                    Daftar Sekarang
                                </button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

Register.layout = {};

function Field({
    id,
    name,
    label,
    type = 'text',
    placeholder,
    autoComplete,
    tabIndex,
    error,
}: {
    id: string;
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    autoComplete?: string;
    tabIndex: number;
    error?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="flex w-full flex-col gap-1.5 md:w-1/2">
            <label
                htmlFor={id}
                className="ml-1 text-[13px] font-semibold text-[#191c1e]"
            >
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required
                autoComplete={autoComplete}
                tabIndex={tabIndex}
                value={value}
                onChange={onChange}
                className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white/90 px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
            />
            <InputError message={error} />
        </div>
    );
}

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
    tabIndexStart?: number;
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
        <div className="flex w-full flex-col gap-1.5 md:w-1/2">
            <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                Tanggal Lahir
            </label>
            <input type="hidden" name="birthdate" value={value} />
            <div className="grid grid-cols-[0.9fr_1fr_1.1fr] gap-2">
                <select
                    aria-label="Tanggal lahir"
                    required
                    value={day}
                    onChange={(event) => onDayChange(event.target.value)}
                    tabIndex={tabIndexStart}
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
                    tabIndex={tabIndexStart ? tabIndexStart + 1 : undefined}
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
                    tabIndex={tabIndexStart ? tabIndexStart + 2 : undefined}
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

import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Upload, User as UserIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Spinner } from '@/components/ui/spinner';
import { dashboard } from '@/routes';
import profile from '@/routes/profile';

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

export default function EditProfile({ user }: { user: User }) {
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
        post(profile.update(), {
            preserveScroll: true,
            onSuccess: () => {
                // Handle success
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#f0f6fc] p-4 md:p-8">
            <Head title="Edit Profil" />
            
            <div className="mx-auto max-w-3xl">
                <div className="mb-6 flex items-center gap-4">
                    <Link
                        href={dashboard()}
                        className="flex size-10 items-center justify-center rounded-xl bg-white text-[#191c1e] shadow-sm transition-all hover:bg-[#eef5fe] hover:text-[#1464BC]"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="m-0 text-2xl font-bold text-[#191c1e]">Edit Profil</h1>
                </div>

                <div className="rounded-[28px] border border-white/60 bg-white/80 p-6 shadow-sm backdrop-blur-xl md:p-8">
                    <form onSubmit={submit} className="flex flex-col gap-6" encType="multipart/form-data">
                        
                        <div className="flex flex-col items-center gap-4 border-b border-[#e2e4e6] pb-6 md:flex-row md:gap-6 md:pb-8">
                            <div className="relative group">
                                <div className="flex size-24 items-center justify-center overflow-hidden rounded-full bg-[#eef5fe] shadow-sm">
                                    {photoPreview ? (
                                        <img src={photoPreview} alt="Profile" className="h-full w-full object-cover" />
                                    ) : (
                                        <UserIcon className="h-10 w-10 text-[#1464BC]" />
                                    )}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-white bg-[#1464BC] text-white shadow-md transition-transform hover:scale-110"
                                >
                                    <Upload className="h-4 w-4" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="m-0 text-lg font-bold text-[#191c1e]">{user.name}</h3>
                                <p className="m-0 text-[15px] font-medium text-[#717783]">{user.email}</p>
                                <InputError message={errors.photo} className="mt-2" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Field
                                id="name"
                                label="Nama Lengkap"
                                value={data.name}
                                onChange={(e: any) => setData('name', e.target.value)}
                                error={errors.name}
                            />
                            
                            <div className="flex w-full flex-col gap-1.5">
                                <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-[#f2f4f6] px-4 text-[15px] text-[#717783] shadow-sm outline-none cursor-not-allowed"
                                />
                                <span className="ml-1 text-xs text-[#717783]">Email tidak dapat diubah.</span>
                            </div>

                            <Field
                                id="phone"
                                label="No. Telepon"
                                value={data.phone}
                                onChange={(e: any) => setData('phone', e.target.value)}
                                error={errors.phone}
                            />

                            <Field
                                id="birthplace"
                                label="Tempat Lahir"
                                value={data.birthplace}
                                onChange={(e: any) => setData('birthplace', e.target.value)}
                                error={errors.birthplace}
                            />

                            <BirthdateField
                                day={birthDay}
                                month={birthMonth}
                                year={birthYear}
                                onDayChange={setBirthDay}
                                onMonthChange={setBirthMonth}
                                onYearChange={setBirthYear}
                                error={errors.birthdate}
                            />

                            <div className="flex w-full flex-col gap-1.5">
                                <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                    Jenis Kelamin
                                </label>
                                <select
                                    required
                                    value={genderSelect}
                                    onChange={(e) => setGenderSelect(e.target.value)}
                                    className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
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
                                        className="mt-2 h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none placeholder:text-[#a0a5b1] focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                    />
                                )}
                                <InputError message={errors.gender} />
                            </div>

                            <div className="flex w-full flex-col gap-1.5 md:col-span-2">
                                <label className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                                    Alamat Lengkap
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full resize-y rounded-[14px] border border-[#e2e4e6] bg-white px-4 py-3 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
                                />
                                <InputError message={errors.address} />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1464BC] px-8 text-base font-semibold text-white shadow-md transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing && <Spinner className="h-4 w-4" />}
                                Simpan Perubahan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function Field({ id, label, value, onChange, error, type = 'text' }: any) {
    return (
        <div className="flex w-full flex-col gap-1.5">
            <label htmlFor={id} className="ml-1 text-[13px] font-semibold text-[#191c1e]">
                {label}
            </label>
            <input
                id={id}
                type={type}
                required
                value={value}
                onChange={onChange}
                className="h-12 w-full rounded-[14px] border border-[#e2e4e6] bg-white px-4 text-[15px] text-[#191c1e] shadow-sm transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-[#1464BC]"
            />
            <InputError message={error} />
        </div>
    );
}

const months = [
    { value: '01', label: 'Jan' }, { value: '02', label: 'Feb' }, { value: '03', label: 'Mar' },
    { value: '04', label: 'Apr' }, { value: '05', label: 'Mei' }, { value: '06', label: 'Jun' },
    { value: '07', label: 'Jul' }, { value: '08', label: 'Agu' }, { value: '09', label: 'Sep' },
    { value: '10', label: 'Okt' }, { value: '11', label: 'Nov' }, { value: '12', label: 'Des' },
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
            <div className="grid grid-cols-[0.9fr_1fr_1.1fr] gap-2">
                <select required value={day} onChange={(e) => onDayChange(e.target.value)} className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-[#1464BC]">
                    <option value="">Tgl</option>
                    {availableDays.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                <select required value={month} onChange={(e) => onMonthChange(e.target.value)} className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-[#1464BC]">
                    <option value="">Bln</option>
                    {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
                <select required value={year} onChange={(e) => onYearChange(e.target.value)} className="h-12 w-full cursor-pointer rounded-[14px] border border-[#e2e4e6] bg-white px-3 text-[15px] shadow-sm outline-none focus:ring-2 focus:ring-[#1464BC]">
                    <option value="">Thn</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            <InputError message={error} />
        </div>
    );
}

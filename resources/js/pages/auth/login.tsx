import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <div className="absolute top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] p-4 font-sans md:p-8">
            <Head title="Log in" />

            {/* Main Card Container */}
            <div className="relative flex w-full max-w-[1000px] flex-col overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-blue-900/5 md:flex-row">
                {/* --- KIRI: Panel Branding --- */}
                <div className="relative flex flex-col justify-between overflow-hidden bg-[#1464BC] p-8 text-white md:w-1/2 md:p-12">
                    <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/4 translate-y-1/2 rounded-full bg-blue-400 opacity-50 mix-blend-multiply blur-3xl filter"></div>

                    <div className="z-10 text-xl font-bold tracking-tight">
                        PSIKOLOGKU
                    </div>

                    {/* Placeholder Gambar Abstract */}
                    <div className="relative z-10 mx-auto my-10 w-full max-w-sm">
                        <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl shadow-black/10 backdrop-blur-md">
                            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-400">
                                <img
                                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop"
                                    alt="Abstract Flow"
                                    className="h-full w-full object-cover opacity-80 mix-blend-luminosity"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="z-10">
                        <h2 className="mb-3 text-3xl leading-tight font-bold tracking-tight md:text-4xl">
                            Your digital sanctuary awaits.
                        </h2>
                        <p className="mb-8 pr-4 text-sm font-light text-blue-100/90 md:text-base">
                            Join a community dedicated to mental clarity and
                            emotional resilience.
                        </p>

                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="h-8 w-8 overflow-hidden rounded-full border-2 border-[#1464BC] bg-white"
                                    >
                                        <img
                                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                                            alt="User"
                                        />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-medium tracking-wide text-blue-100/80">
                                Trusted by 10k+ members
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- KANAN: Form Login --- */}
                <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                    <h1 className="mb-2 text-[2rem] font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h1>

                    {canRegister && (
                        <p className="mb-8 text-sm text-gray-500">
                            New to PSIKOLOGKU?{' '}
                            <TextLink
                                href={register()}
                                className="font-semibold text-[#1464BC] hover:underline"
                            >
                                Create an account
                            </TextLink>
                        </p>
                    )}

                    {/* Social Login Buttons */}
                    <div className="mb-6 flex gap-3">
                        <a
                            href="/auth/google"
                            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-[#F8FAFC] py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </a>
                    </div>

                    <div className="mb-6 flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                        <span className="text-xs font-medium text-gray-400">
                            Or continue with email
                        </span>
                        <div className="h-[1px] flex-1 bg-gray-200"></div>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}

                    {/* Menggunakan Form bawaan dari project kamu */}
                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-5">
                                    {/* Input Email */}
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="email"
                                            className="font-bold text-gray-900"
                                        >
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="name@example.com"
                                            className="rounded-xl border-gray-200 bg-[#F8FAFC] px-4 py-6 text-gray-900 caret-[#1464BC] placeholder:text-gray-400 focus-visible:ring-[#1464BC]"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Input Password */}
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label
                                                htmlFor="password"
                                                className="font-bold text-gray-900"
                                            >
                                                Password
                                            </Label>
                                            {canResetPassword && (
                                                <TextLink
                                                    href={request()}
                                                    className="ml-auto text-xs font-semibold text-[#1464BC] hover:underline"
                                                    tabIndex={5}
                                                >
                                                    Forgot password?
                                                </TextLink>
                                            )}
                                        </div>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="current-password"
                                            placeholder="••••••••"
                                            className="rounded-xl border-gray-200 bg-[#F8FAFC] px-4 py-6 text-gray-900 caret-[#1464BC] placeholder:text-gray-400 focus-visible:ring-[#1464BC]"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Checkbox Remember Me */}
                                    <div className="mt-1 flex items-center space-x-3">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-gray-300 data-[state=checked]:border-[#1464BC] data-[state=checked]:bg-[#1464BC]"
                                        />
                                        <Label
                                            htmlFor="remember"
                                            className="cursor-pointer font-medium text-gray-600"
                                        >
                                            Remember me for 30 days
                                        </Label>
                                    </div>

                                    {/* Tombol Submit */}
                                    <Button
                                        type="submit"
                                        className="mt-2 w-full rounded-xl bg-[#1464BC] py-6 font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#1053A0]"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && (
                                            <Spinner className="mr-2 h-4 w-4" />
                                        )}
                                        Sign in to Dashboard
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    {/* Footer Terms */}
                    <p className="mt-8 text-center text-[11px] text-gray-500">
                        By continuing, you agree to PSIKOLOGKU's{' '}
                        <a
                            href="#"
                            className="font-semibold text-gray-900 hover:underline"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            href="#"
                            className="font-semibold text-gray-900 hover:underline"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>

            {/* Float Badge: Systems Operational */}
            <div className="absolute right-6 bottom-6 hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm md:flex">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                Systems Operational
            </div>
        </div>
    );
}

// Biarkan layout bawaannya kosong agar desain full screen kita tidak tertimpa kotak dari layout parent
Login.layout = {};

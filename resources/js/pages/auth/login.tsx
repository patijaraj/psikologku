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
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 md:p-8 font-sans w-full absolute top-0 left-0 z-50">
            <Head title="Log in" />

            {/* Main Card Container */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 w-full max-w-[1000px] flex flex-col md:flex-row overflow-hidden relative">
                
                {/* --- KIRI: Panel Branding --- */}
                <div className="bg-[#1464BC] text-white p-8 md:p-12 md:w-1/2 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/2 -translate-x-1/4"></div>

                    <div className="text-xl font-bold tracking-tight z-10">
                        PSIKOLOGKU
                    </div>

                    {/* Placeholder Gambar Abstract */}
                    <div className="my-10 relative z-10 w-full max-w-sm mx-auto">
                        <div className="bg-white/10 p-4 rounded-3xl backdrop-blur-md border border-white/10 shadow-2xl shadow-black/10">
                            <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-400 rounded-2xl overflow-hidden relative">
                                <img 
                                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop" 
                                    alt="Abstract Flow" 
                                    className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-3 leading-tight tracking-tight">
                            Your digital sanctuary awaits.
                        </h2>
                        <p className="text-blue-100/90 text-sm md:text-base mb-8 font-light pr-4">
                            Join a community dedicated to mental clarity and emotional resilience.
                        </p>
                        
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1464BC] overflow-hidden bg-white">
                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm font-medium text-blue-100/80 tracking-wide">
                                Trusted by 10k+ members
                            </span>
                        </div>
                    </div>
                </div>

                {/* --- KANAN: Form Login --- */}
                <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-[2rem] font-bold text-gray-900 mb-2 tracking-tight">Welcome back</h1>
                    
                    {canRegister && (
                        <p className="text-gray-500 text-sm mb-8">
                            New to PSIKOLOGKU?{' '}
                            <TextLink href={register()} className="text-[#1464BC] font-semibold hover:underline">
                                Create an account
                            </TextLink>
                        </p>
                    )}

                    {/* Social Login Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm py-2.5 rounded-xl font-medium transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Google
                        </button>
                        <button type="button" className="flex-1 flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-gray-100 border border-gray-200 text-gray-700 text-sm py-2.5 rounded-xl font-medium transition-colors">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.15 2.95.97 3.67 2.12-3.44 2.14-2.82 6.78.64 8.04-.84 1.33-1.66 2.65-2.96 2.85M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25"/>
                            </svg>
                            Apple
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
                        <span className="text-xs font-medium text-gray-400">Or continue with email</span>
                        <div className="flex-1 h-[1px] bg-gray-200"></div>
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
                                        <Label htmlFor="email" className="font-bold text-gray-900">Email address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="email"
                                            placeholder="name@example.com"
                                            className="bg-[#F8FAFC] border-gray-200 focus-visible:ring-[#1464BC] rounded-xl px-4 py-6"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Input Password */}
                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="password" className="font-bold text-gray-900">Password</Label>
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
                                            className="bg-[#F8FAFC] border-gray-200 focus-visible:ring-[#1464BC] rounded-xl px-4 py-6"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Checkbox Remember Me */}
                                    <div className="flex items-center space-x-3 mt-1">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            tabIndex={3}
                                            className="border-gray-300 data-[state=checked]:bg-[#1464BC] data-[state=checked]:border-[#1464BC]"
                                        />
                                        <Label htmlFor="remember" className="font-medium text-gray-600 cursor-pointer">
                                            Remember me for 30 days
                                        </Label>
                                    </div>

                                    {/* Tombol Submit */}
                                    <Button
                                        type="submit"
                                        className="mt-2 w-full bg-[#1464BC] hover:bg-[#1053A0] text-white font-semibold py-6 rounded-xl transition-all shadow-lg shadow-blue-900/20"
                                        tabIndex={4}
                                        disabled={processing}
                                        data-test="login-button"
                                    >
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        Sign in to Dashboard
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>

                    {/* Footer Terms */}
                    <p className="mt-8 text-center text-[11px] text-gray-500">
                        By continuing, you agree to PSIKOLOGKU's{' '}
                        <a href="#" className="text-gray-900 font-semibold hover:underline">Terms of Service</a> and{' '}
                        <a href="#" className="text-gray-900 font-semibold hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>

            {/* Float Badge: Systems Operational */}
            <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-xs font-semibold text-gray-700 border border-gray-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Systems Operational
            </div>
        </div>
    );
}

// Biarkan layout bawaannya kosong agar desain full screen kita tidak tertimpa kotak dari layout parent
Login.layout = {};
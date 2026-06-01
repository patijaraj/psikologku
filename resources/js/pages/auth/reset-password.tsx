import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <div className="absolute top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] p-4 font-sans md:p-8">
            <Head title="Reset password" />

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
                            Create a new password.
                        </h2>
                        <p className="mb-8 pr-4 text-sm font-light text-blue-100/90 md:text-base">
                            Secure your account with a strong password to continue your journey.
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

                {/* --- KANAN: Form Reset Password --- */}
                <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                    <h1 className="mb-2 text-[2rem] font-bold tracking-tight text-gray-900">
                        Reset Password
                    </h1>

                    <p className="mb-8 text-sm text-gray-500">
                        Please enter your new password below.
                    </p>

                    <Form
                        {...update.form()}
                        transform={(data) => ({ ...data, token, email })}
                        resetOnSuccess={['password', 'password_confirmation']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-5">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className="font-bold text-gray-900">
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            value={email}
                                            readOnly
                                            className="rounded-xl border-gray-200 bg-[#F8FAFC] px-4 py-6 text-gray-500 caret-[#1464BC] focus-visible:ring-[#1464BC] opacity-70"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password" className="font-bold text-gray-900">
                                            New Password
                                        </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            autoComplete="new-password"
                                            autoFocus
                                            placeholder="••••••••"
                                            className="rounded-xl border-gray-200 bg-[#F8FAFC] px-4 py-6 text-gray-900 caret-[#1464BC] placeholder:text-gray-400 focus-visible:ring-[#1464BC]"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation" className="font-bold text-gray-900">
                                            Confirm New Password
                                        </Label>
                                        <PasswordInput
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            className="rounded-xl border-gray-200 bg-[#F8FAFC] px-4 py-6 text-gray-900 caret-[#1464BC] placeholder:text-gray-400 focus-visible:ring-[#1464BC]"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full rounded-xl bg-[#1464BC] py-6 font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#1053A0]"
                                        disabled={processing}
                                        data-test="reset-password-button"
                                    >
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        Reset Password
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

ResetPassword.layout = {};

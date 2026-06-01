import { Form, Head } from '@inertiajs/react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="absolute top-0 left-0 z-50 flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] p-4 font-sans md:p-8">
            <Head title="Verify Email" />

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
                            Verify your identity.
                        </h2>
                        <p className="mb-8 pr-4 text-sm font-light text-blue-100/90 md:text-base">
                            We just need to make sure it's really you. Please check your inbox for a verification link.
                        </p>
                    </div>
                </div>

                {/* --- KANAN: Form Verification --- */}
                <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                    <h1 className="mb-2 text-[2rem] font-bold tracking-tight text-gray-900">
                        Verify Email
                    </h1>

                    <p className="mb-8 text-sm text-gray-500">
                        Please verify your email address by clicking on the link we just emailed to you. If you didn't receive the email, we will gladly send you another.
                    </p>

                    {status === 'verification-link-sent' && (
                        <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
                            A new verification link has been sent to the email address you provided during registration.
                        </div>
                    )}

                    <Form {...send.form()} className="flex flex-col gap-6">
                        {({ processing }) => (
                            <>
                                <div className="grid gap-5">
                                    <Button
                                        type="submit"
                                        className="w-full rounded-xl bg-[#1464BC] py-6 font-semibold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#1053A0]"
                                        disabled={processing}
                                    >
                                        {processing && <Spinner className="mr-2 h-4 w-4" />}
                                        Resend Verification Email
                                    </Button>

                                    <div className="mt-4 text-center">
                                        <TextLink
                                            href={logout()}
                                            className="text-sm font-semibold text-gray-500 hover:text-gray-900 hover:underline"
                                        >
                                            Log out
                                        </TextLink>
                                    </div>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}

VerifyEmail.layout = {};

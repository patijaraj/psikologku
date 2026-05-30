import { Link } from '@inertiajs/react';

export function MiniFooter() {
    return (
        <div className="mt-12 mb-6 flex flex-col items-center justify-center gap-2 border-t border-[#e2e4e6] pt-6 text-sm font-medium text-[#717783] sm:flex-row sm:justify-between">
            <p className="m-0">© {new Date().getFullYear()} Psikologku. All rights reserved.</p>
            <div className="flex items-center gap-4">
                <Link href="#" className="transition-colors hover:text-[#1464BC]">Pusat Bantuan</Link>
                <Link href="#" className="transition-colors hover:text-[#1464BC]">Syarat & Ketentuan</Link>
                <Link href="#" className="transition-colors hover:text-[#1464BC]">Kebijakan Privasi</Link>
            </div>
        </div>
    );
}

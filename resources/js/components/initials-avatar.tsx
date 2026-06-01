import { cn } from '@/lib/utils';

export function getInitials(name?: string | null) {
    const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

    if (parts.length === 0) {
        return 'U';
    }

    const first = parts[0]?.[0] ?? '';
    const second = parts.length > 1 ? parts[parts.length - 1]?.[0] : '';

    return `${first}${second}`.toUpperCase();
}

export function InitialsAvatar({
    name,
    photoUrl,
    className,
}: {
    name?: string | null;
    photoUrl?: string | null;
    className?: string;
}) {
    if (photoUrl) {
        return (
            <img
                src={photoUrl}
                alt={name ?? 'Avatar'}
                className={cn(
                    'shrink-0 rounded-full border border-[#e2e4e6] bg-white object-cover',
                    className,
                )}
            />
        );
    }

    return (
        <div
            className={cn(
                'flex shrink-0 items-center justify-center rounded-full bg-[#1464BC] text-sm font-black tracking-wide text-white shadow-sm shadow-blue-900/20',
                className,
            )}
        >
            {getInitials(name)}
        </div>
    );
}

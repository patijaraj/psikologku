import { AppHeader } from '@/components/app-header';
import type { BreadcrumbItem } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItem[];
}) {
    return <AppHeader breadcrumbs={breadcrumbs} />;
}

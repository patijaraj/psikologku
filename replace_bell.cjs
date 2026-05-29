const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') && !fullPath.includes('notification-dropdown') && !fullPath.includes('notifications.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Import NotificationDropdown if not present
            if (!content.includes('NotificationDropdown')) {
                // Find last import
                const lastImportIndex = content.lastIndexOf('import ');
                const endOfLastImport = content.indexOf('\n', lastImportIndex);
                
                content = content.substring(0, endOfLastImport + 1) + 
                          "import { NotificationDropdown } from '@/components/notification-dropdown';\n" + 
                          content.substring(endOfLastImport + 1);
                modified = true;
            }

            // Desktop Bell button (typically looks like this):
            // <button ... aria-label="Notifikasi" ...>
            //     <Bell className="h-[22px] w-[22px]" />
            //     <span ... ring-2 ring-white" />
            // </button>
            // or without the span
            const desktopBellRegex1 = /<button[^>]*aria-label="Notifikasi"[^>]*>[\s\S]*?<Bell className="h-\[22px\] w-\[22px\]" \/>[\s\S]*?<\/button>/g;
            const desktopBellRegex2 = /<button[^>]*aria-label="Notifikasi"[^>]*>[\s\S]*?<Bell className="h-6 w-6" \/>[\s\S]*?<\/button>/g;
            
            if (desktopBellRegex1.test(content)) {
                content = content.replace(desktopBellRegex1, '<NotificationDropdown />');
                modified = true;
            }
            if (desktopBellRegex2.test(content)) {
                content = content.replace(desktopBellRegex2, '<NotificationDropdown />');
                modified = true;
            }

            // Mobile Bell button (in dashboard.tsx):
            // <button type="button" className="flex cursor-pointer flex-col items-center gap-1 border-none bg-transparent text-[#717783]">
            //     <Bell className="h-6 w-6" />
            //     <span className="text-xs">Notifikasi</span>
            // </button>
            const mobileBellRegex = /<button[^>]*>[\s\S]*?<Bell className="h-6 w-6" \/>\s*<span className="text-xs">Notifikasi<\/span>[\s\S]*?<\/button>/g;
            if (mobileBellRegex.test(content)) {
                content = content.replace(mobileBellRegex, '<NotificationDropdown />');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log('Modified', fullPath);
            }
        }
    }
}

processDir('resources/js/pages');
console.log('Done');

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationSidebarProps {
    currentPath?: string;
}

export function NavigationSidebar({ currentPath }: NavigationSidebarProps) {
    const pathname = usePathname();
    const activePath = currentPath || pathname;

    const isActive = (path: string) => activePath?.startsWith(path);

    const navItems = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="7" height="9" x="3" y="3" rx="1" />
                    <rect width="7" height="5" x="14" y="3" rx="1" />
                    <rect width="7" height="9" x="14" y="12" rx="1" />
                    <rect width="7" height="5" x="3" y="16" rx="1" />
                </svg>
            ),
        },
        {
            label: 'Chat',
            href: '/chat',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                </svg>
            ),
        },
        {
            label: 'Rituals',
            href: '/survey',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            ),
        },
    ];

    return (
        <nav className="hidden md:flex flex-col w-64 h-screen border-r border-white/10 bg-background-dark p-4 fixed left-0 top-0 z-fixed">
            <div className="mb-8 px-4">
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-highlight bg-clip-text text-transparent">
                    Re:MirAI
                </h1>
            </div>

            <div className="space-y-2">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${active
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                                }
              `}
                        >
                            <span className={`transition-colors ${active ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'}`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.label}</span>
                            {active && (
                                <div className="ml-auto w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(0,201,167,0.6)]" />
                            )}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-auto px-4 py-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-highlight" />
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary">User</span>
                        <span className="text-xs text-text-muted">Free Plan</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}

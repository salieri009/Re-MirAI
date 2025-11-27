'use client';

import { NavigationSidebar } from '../organisms/NavigationSidebar';

interface AppShellProps {
    children: React.ReactNode;
    showNav?: boolean;
    showSidebar?: boolean;
    sidebarContent?: React.ReactNode;
    className?: string;
}

export function AppShell({
    children,
    showNav = true,
    showSidebar = false,
    sidebarContent,
    className = ''
}: AppShellProps) {
    return (
        <div className="min-h-screen bg-background-dark flex">
            {/* Left Navigation Sidebar - Fixed width on desktop, hidden on mobile */}
            {showNav && (
                <aside className="w-64 shrink-0 hidden md:block z-fixed">
                    <NavigationSidebar />
                </aside>
            )}

            {/* Main Content Area */}
            <main className={`flex-1 min-w-0 flex flex-col relative ${className}`}>
                {/* Mobile Header Placeholder (can be expanded later) */}
                {showNav && (
                    <div className="md:hidden h-16 border-b border-white/10 flex items-center px-4 sticky top-0 bg-background-dark/80 backdrop-blur z-sticky">
                        <span className="font-display font-bold text-lg text-primary">Re:MirAI</span>
                    </div>
                )}

                <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
                    {children}
                </div>
            </main>

            {/* Right Context Sidebar - Optional */}
            {showSidebar && sidebarContent && (
                <aside className="w-80 shrink-0 border-l border-white/10 bg-background-dark/50 hidden xl:block h-screen sticky top-0 overflow-y-auto">
                    {sidebarContent}
                </aside>
            )}
        </div>
    );
}

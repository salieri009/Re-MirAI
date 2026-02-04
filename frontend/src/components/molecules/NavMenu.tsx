import React from 'react';

interface NavLink {
    label: string;
    href: string;
}

interface NavMenuProps {
    links: NavLink[];
    className?: string; // For layout control (e.g., hidden sm:flex)
}

export const NavMenu: React.FC<NavMenuProps> = ({ links, className = '' }) => {
    return (
        <div className={`items-center gap-9 ${className}`}>
            {links.map((link) => (
                <a
                    key={link.label}
                    href={link.href}
                    className="text-white text-sm font-medium leading-normal hover:text-[#c197ff] transition-colors"
                >
                    {link.label}
                </a>
            ))}
        </div>
    );
};

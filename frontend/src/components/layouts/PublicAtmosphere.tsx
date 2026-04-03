import React from 'react';

interface PublicAtmosphereProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicAtmosphere({ children, className = '' }: PublicAtmosphereProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-background-dark text-text-primary ${className}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="public-orb-a absolute -left-24 -top-24 h-72 w-72 rounded-full" />
        <div className="public-orb-b absolute -right-20 top-[18%] h-96 w-96 rounded-full" />
        <div className="public-orb-c absolute bottom-[-120px] left-[35%] h-80 w-80 rounded-full" />
      </div>

      <div className="public-grid-overlay pointer-events-none absolute inset-0 opacity-[0.17]" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}

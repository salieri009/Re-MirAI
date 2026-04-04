import React from 'react';

export const SiteFooter: React.FC = () => {
    return (
        <footer className="text-center py-8 mt-10 border-t border-solid border-white/10">
            <p className="text-accent/70 text-sm">© 2024 Re:MirAI. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
                <a className="text-accent/75 hover:text-accent transition-colors text-sm" href="#">Privacy Policy</a>
                <a className="text-accent/75 hover:text-accent transition-colors text-sm" href="#">Terms of Service</a>
            </div>
        </footer>
    );
};

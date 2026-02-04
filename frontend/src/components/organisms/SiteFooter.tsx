import React from 'react';

export const SiteFooter: React.FC = () => {
    return (
        <footer className="text-center py-8 mt-10 border-t border-solid border-white/10">
            <p className="text-[#c197ff]/50 text-sm">© 2024 Re:MirAI. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-4">
                <a className="text-[#c197ff]/70 hover:text-[#c197ff] transition-colors text-sm" href="#">Privacy Policy</a>
                <a className="text-[#c197ff]/70 hover:text-[#c197ff] transition-colors text-sm" href="#">Terms of Service</a>
            </div>
        </footer>
    );
};

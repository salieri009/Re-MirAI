import React from 'react';
import { Button } from '@/components/atoms/Button';

export const CTASection: React.FC = () => {
    // Placeholder function for CTA action, waiting for full auth integration
    const handleJoin = () => {
        document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div id="join" className="@container">
            <div className="flex flex-col justify-end gap-6 px-4 py-10 @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20 text-center items-center">
                <div className="flex flex-col gap-2 max-w-[720px]">
                    <h2 className="text-white tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                        Ready to Meet Your Reflection?
                    </h2>
                    <p className="text-[#c197ff] text-base font-normal leading-normal">
                        Begin your journey of self-discovery today and see the persona you cast in the eyes of others.
                    </p>
                </div>
                <div className="flex flex-1 justify-center w-full">
                    <div className="flex justify-center w-full">
                        <Button
                            onClick={handleJoin}
                            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 !bg-[#00c9a7] text-[#0A0112] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] grow hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#00c9a7] focus:ring-offset-2 focus:ring-offset-[#0A0112] border-none"
                        >
                            <span className="truncate">Summon Your Persona</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

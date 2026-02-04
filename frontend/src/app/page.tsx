'use client';

import React from 'react';
import { SiteHeader } from '@/components/organisms/SiteHeader';
import { HeroSection } from '@/components/organisms/HeroSection';
import { StepsSection } from '@/components/organisms/StepsSection';
import { CTASection } from '@/components/organisms/CTASection';
import { SiteFooter } from '@/components/organisms/SiteFooter';

export default function LandingPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display bg-background-light dark:bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 flex flex-col">
          <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <SiteHeader />
              <div className="py-5">
                <HeroSection />
              </div>
              <StepsSection />
              <CTASection />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

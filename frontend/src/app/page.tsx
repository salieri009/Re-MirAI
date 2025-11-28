import React from 'react';
import { Hero } from '@/components/organisms/Hero';
import { FeatureCard } from '@/components/molecules/FeatureCard';
import { WaitlistForm } from '@/components/molecules/WaitlistForm';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background-dark text-text-primary selection:bg-accent/30">
      <Hero />

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              The Mirror <span className="text-accent">Reveals All</span>
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Three simple steps to uncover the hidden patterns in your social interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Connect"
              description="Securely link your social accounts. We analyze patterns, not private messages."
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              }
              delay={0}
            />
            <FeatureCard
              title="Analyze"
              description="Our AI engine processes thousands of data points to construct your digital persona."
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              delay={200}
            />
            <FeatureCard
              title="Reveal"
              description="Meet your AI twin. Chat with it, ask it questions, and see yourself through their eyes."
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              }
              delay={400}
            />
          </div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-accent-purple/5 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* Waitlist Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Meet <span className="text-primary">Yourself?</span>
          </h2>
          <p className="text-text-muted text-lg mb-10">
            Join the waitlist for early access to the beta.
          </p>
          <WaitlistForm />
        </div>

        {/* Footer */}
        <footer className="absolute bottom-0 w-full py-8 text-center text-text-muted/30 text-sm">
          &copy; {new Date().getFullYear()} Re:MirAI. All rights reserved.
        </footer>
      </section>
    </main>
  );
}

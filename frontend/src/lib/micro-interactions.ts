/**
 * Re:MirAI Micro-Interactions Library
 * Purpose-specific animations supporting emotional journeys
 * 
 * Organized by page purpose:
 * - Conversion (Landing)
 * - Trust (Login, Survey)
 * - Guidance (Dashboard, Ritual Hub)
 * - Connection (Chat, Persona Room)
 * - Delight (Summoning)
 */

import gsap from 'gsap';
import { tokens } from './design-tokens';

/**
 * 1. CONVERSION Interactions (Landing Page)
 * Purpose: Transform curiosity into commitment
 */
export const conversionInteractions = {
    /**
     * Mirror Hover - Invite Exploration
     * Emotion: Curiosity → Intrigue
     */
    mirrorHover: (element: HTMLElement) => {
        gsap.to(element, {
            y: -4,
            boxShadow: tokens.shadow.glow,
            duration: tokens.duration.normal / 1000,
            ease: tokens.easing.calm,
        });
    },

    /**
     * Mirror Hover Exit - Return to Rest
     */
    mirrorHoverExit: (element: HTMLElement) => {
        gsap.to(element, {
            y: 0,
            boxShadow: tokens.shadow.md,
            duration: tokens.duration.normal / 1000,
            ease: tokens.easing.calm,
        });
    },

    /**
     * Mirror Shatter - Demonstrate Value
     * Emotion: Intrigue → Wonder
     */
    mirrorShatter: (element: HTMLElement) => {
        const tl = gsap.timeline();

        // Stage 1: Shake
        tl.to(element, {
            x: '+=5',
            yoyo: true,
            repeat: 5,
            duration: 0.05,
        });

        // Stage 2: Crack appears
        tl.to('.mirror-crack', {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: tokens.easing.calm,
        });

        // Stage 3: Fragments scatter
        tl.to('.mirror-fragment', {
            x: (i) => gsap.utils.random(-300, 300),
            y: (i) => gsap.utils.random(-300, 300),
            rotation: (i) => gsap.utils.random(-180, 180),
            opacity: 0,
            duration: 0.6,
            stagger: 0.02,
            ease: tokens.easing.smooth,
        });

        return tl;
    },

    /**
     * CTA Button Pulse - Drive Action
     * Emotion: Wonder → Commitment
     */
    ctaPulse: (button: HTMLElement) => {
        gsap.to(button, {
            boxShadow: tokens.shadow.glow,
            scale: 1.02,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    },
};

/**
 * 2. TRUST Interactions (Login, Survey)
 * Purpose: Build confidence and reduce anxiety
 */
export const trustInteractions = {
    /**
     * Rotating Status Messages - Reduce Anxiety
     * Emotion: Uncertainty → Trust
     */
    loadingStates: (
        element: HTMLElement,
        messages: string[],
        interval: number = 2000
    ): (() => void) => {
        let index = 0;
        const timer = setInterval(() => {
            gsap.to(element, {
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    element.textContent = messages[index % messages.length];
                    gsap.to(element, { opacity: 1, duration: 0.2 });
                    index++;
                },
            });
        }, interval);

        // Return cleanup function
        return () => clearInterval(timer);
    },

    /**
     * Privacy Badge Pulse - Reinforce Anonymity
     * Emotion: Skepticism → Trust
     */
    privacyBadgePulse: (badge: HTMLElement) => {
        gsap.to(badge, {
            scale: 1.05,
            opacity: 1,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    },

    /**
     * Button Glow on Hover - Show Safety
     */
    buttonGlow: (button: HTMLElement) => {
        gsap.to(button, {
            boxShadow: tokens.shadow.glowBlue,
            scale: 1.02,
            duration: tokens.duration.fast / 1000,
            ease: tokens.easing.calm,
        });
    },
};

/**
 * 3. GUIDANCE Interactions (Dashboard, Ritual Hub)
 * Purpose: Direct attention to next action
 */
export const guidanceInteractions = {
    /**
     * Progress Bar Shimmer - Make Progress Tangible
     * Emotion: Control → Progress
     */
    progressShimmer: (fill: HTMLElement) => {
        gsap.to(fill, {
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            backgroundSize: '200% 100%',
            backgroundPosition: '200% center',
            duration: 2,
            repeat: -1,
            ease: 'linear',
        });
    },

    /**
     * Action Button Pulse - Guide to Next Step
     * Emotion: Anticipation → Action
     */
    actionPulse: (button: HTMLElement) => {
        gsap.to(button, {
            boxShadow: `0 0 20px ${tokens.emotions.curiosity.primary}`,
            scale: 1.02,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    },

    /**
     * State Transition - Smooth State Changes
     */
    stateTransition: (element: HTMLElement, onComplete?: () => void) => {
        const tl = gsap.timeline({ onComplete });
        tl.to(element, {
            opacity: 0,
            scale: 0.95,
            duration: 0.2,
            ease: tokens.easing.calm,
        })
            .set(element, { display: 'none' })
            .set(element, { display: 'block' })
            .to(element, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: tokens.easing.smooth,
            });

        return tl;
    },

    /**
     * Echo Counter Animation - Celebrate Progress
     */
    echoCountUp: (element: HTMLElement, from: number, to: number) => {
        const obj = { count: from };
        gsap.to(obj, {
            count: to,
            duration: 0.8,
            ease: tokens.easing.smooth,
            onUpdate: () => {
                element.textContent = Math.round(obj.count).toString();
            },
        });
    },
};

/**
 * 4. CONNECTION Interactions (Chat, Persona Room)
 * Purpose: Build emotional bonds
 */
export const connectionInteractions = {
    /**
     * Typing Indicator - Create Presence
     * Emotion: Curiosity → Engagement
     */
    typingIndicator: (container: HTMLElement) => {
        const dots = container.querySelectorAll('.dot');
        gsap.to(dots, {
            y: -10,
            duration: 0.6,
            stagger: 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
        });
    },

    /**
     * Bond Level Up - Celebrate Connection
     * Emotion: Intimacy → Connection
     */
    bondLevelUp: (badge: HTMLElement, confettiCallback?: () => void) => {
        const tl = gsap.timeline();

        tl.to(badge, {
            scale: 1.3,
            rotation: 10,
            filter: 'brightness(1.5)',
            duration: 0.3,
            ease: tokens.easing.bounce,
        })
            .to(badge, {
                scale: 1,
                rotation: 0,
                filter: 'brightness(1)',
                duration: 0.3,
                ease: tokens.easing.bounce,
                onComplete: confettiCallback,
            });

        return tl;
    },

    /**
     * Message Entrance - Natural Flow
     */
    messageEnter: (message: HTMLElement, sender: 'user' | 'ai') => {
        const direction = sender === 'user' ? 20 : -20;

        gsap.fromTo(message,
            {
                opacity: 0,
                x: direction,
            },
            {
                opacity: 1,
                x: 0,
                duration: tokens.duration.normal / 1000,
                ease: tokens.easing.smooth,
            }
        );
    },

    /**
     * Heart Reaction Burst
     */
    heartReaction: (element: HTMLElement) => {
        gsap.fromTo(element,
            {
                scale: 0,
                y: 0,
                opacity: 1,
            },
            {
                scale: 1.5,
                y: -40,
                opacity: 0,
                duration: 0.8,
                ease: tokens.easing.elastic,
            }
        );
    },
};

/**
 * 5. DELIGHT Interactions (Summoning)
 * Purpose: Create awe and wonder
 */
export const delightInteractions = {
    /**
     * Particle System - Create Magical Atmosphere
     * Emotion: Anticipation → Awe
     */
    particleSystem: (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return () => { };

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            alpha: number;
        }> = [];

        // Generate particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                radius: Math.random() * 3 + 1,
                alpha: Math.random(),
            });
        }

        function animate() {
            ctx!.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw particle
                ctx!.fillStyle = `rgba(167, 139, 250, ${p.alpha})`;
                ctx!.beginPath();
                ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx!.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();

        return () => { }; // Cleanup function
    },

    /**
     * Magic Circle Rotation
     */
    magicCircleRotate: (element: HTMLElement) => {
        gsap.to(element, {
            rotation: 360,
            duration: 2,
            ease: 'linear',
            onComplete: function () {
                this.restart();
            },
        });
    },

    /**
     * Persona Reveal - Climactic Entrance
     * Emotion: Awe → Joy
     */
    personaReveal: (card: HTMLElement, onComplete?: () => void) => {
        const tl = gsap.timeline({ onComplete });

        tl.from(card, {
            scale: 0.5,
            opacity: 0,
            y: 50,
            filter: 'blur(20px)',
            duration: 1.5,
            ease: tokens.easing.elastic,
        })
            .to(card, {
                boxShadow: tokens.shadow.glow,
                duration: 0.5,
            });

        return tl;
    },
};

/**
 * Utility: Stop All Animations
 */
export function killAllAnimations() {
    gsap.killTweensOf('*');
}

/**
 * Utility: Respect Reduced Motion Preference
 */
export function shouldReduceMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Utility: Conditional Animation
 */
export function animateIfAllowed<T>(
    animationFn: () => T,
    fallbackFn?: () => void
): T | void {
    if (shouldReduceMotion()) {
        fallbackFn?.();
        return;
    }
    return animationFn();
}

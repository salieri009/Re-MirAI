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
import { tokens } from '../design-tokens';

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
            boxShadow: tokens.shadow.glowPrimary,
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
        const crackElements = element.querySelectorAll<SVGElement>('.mirror-crack');
        const fragmentElements = element.querySelectorAll<SVGElement>('.mirror-fragment');

        if (!crackElements.length || !fragmentElements.length) {
            return tl;
        }

        // Stage 1: Shake
        tl.to(element, {
            x: '+=5',
            yoyo: true,
            repeat: 5,
            duration: 0.05,
        });

        // Stage 2: Crack appears
        tl.to(crackElements, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: tokens.easing.calm,
        });

        // Stage 3: Fragments scatter
        tl.to(fragmentElements, {
            x: () => gsap.utils.random(-300, 300),
            y: () => gsap.utils.random(-300, 300),
            rotation: () => gsap.utils.random(-180, 180),
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
            boxShadow: tokens.shadow.glowPrimary,
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
        elementOrSetState: HTMLElement | ((msg: string) => void),
        messages: string[],
        interval: number = 2000
    ): (() => void) => {
        let index = 0;
        const timer = setInterval(() => {
            if (typeof elementOrSetState === 'function') {
                elementOrSetState(messages[index % messages.length]);
                index++;
            } else {
                gsap.to(elementOrSetState, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        elementOrSetState.textContent = messages[index % messages.length];
                        gsap.to(elementOrSetState, { opacity: 1, duration: 0.2 });
                        index++;
                    },
                });
            }
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
            boxShadow: tokens.shadow.glowPrimary, // Changed from glowBlue which doesn't exist
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

    /**
     * Topic Suggestion Glow - Proactive Engagement
     */
    topicGlow: (element: HTMLElement) => {
        gsap.to(element, {
            boxShadow: tokens.shadow.glowPrimary,
            scale: 1.02,
            duration: 0.4,
            yoyo: true,
            repeat: 1,
            ease: tokens.easing.smooth,
        });
    },
};

/**
 * 5. DELIGHT Interactions (Summoning)
 * Purpose: Create awe and wonder
 */
export const delightInteractions = {
    /**
     * Graphic Particle System - Enhanced with connections and gradients
     * Emotion: Anticipation → Awe
     * Features: Particle connections, gradient effects, interactive mouse response
     */
    particleSystem: (
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: { 
            count?: number; 
            color?: string; 
            speed?: number;
            connectDistance?: number;
            showConnections?: boolean;
        } = {}
    ) => {
        if (!ctx) return () => { };

        const { 
            count = 50, 
            color = '#ffffff', 
            speed = 1,
            connectDistance = 100,
            showConnections = true
        } = options;

        interface Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            alpha: number;
            baseAlpha: number;
        }

        const particles: Particle[] = [];

        // Generate particles with varied properties
        for (let i = 0; i < count; i++) {
            const baseAlpha = 0.3 + Math.random() * 0.4;
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * speed * 2,
                vy: (Math.random() - 0.5) * speed * 2,
                radius: 1 + Math.random() * 2,
                alpha: baseAlpha,
                baseAlpha,
            });
        }

        // Mouse/touch tracking for interactive effects
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;
        let isMouseActive = false;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            isMouseActive = true;
        };

        const handleMouseLeave = () => {
            isMouseActive = false;
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        let animationId: number;

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Interactive response to mouse
                if (isMouseActive) {
                    const dx = mouseX - p.x;
                    const dy = mouseY - p.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const maxDistance = 150;
                    
                    if (distance < maxDistance) {
                        const force = (maxDistance - distance) / maxDistance;
                        p.vx += (dx / distance) * force * 0.1;
                        p.vy += (dy / distance) * force * 0.1;
                        p.alpha = Math.min(1, p.baseAlpha + force * 0.3);
                    } else {
                        p.alpha = p.baseAlpha;
                    }
                } else {
                    p.alpha = p.baseAlpha;
                }

                // Draw particle with gradient
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
                // Handle both hex and rgb colors
                let transparentColor = color;
                if (color.startsWith('#')) {
                    // Convert hex to rgba
                    const hex = color.replace('#', '');
                    const r = parseInt(hex.substr(0, 2), 16);
                    const g = parseInt(hex.substr(2, 2), 16);
                    const b = parseInt(hex.substr(4, 2), 16);
                    transparentColor = `rgba(${r}, ${g}, ${b}, 0)`;
                } else if (color.includes('rgb')) {
                    transparentColor = color.replace(')', ', 0)').replace('rgb', 'rgba');
                }
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, transparentColor);
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
            });

            // Draw connections between nearby particles
            if (showConnections) {
                ctx.strokeStyle = color;
                ctx.lineWidth = 0.5;
                
                for (let i = 0; i < particles.length; i++) {
                    for (let j = i + 1; j < particles.length; j++) {
                        const p1 = particles[i];
                        const p2 = particles[j];
                        const dx = p2.x - p1.x;
                        const dy = p2.y - p1.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < connectDistance) {
                            const opacity = (1 - distance / connectDistance) * 0.2;
                            ctx.globalAlpha = opacity;
                            ctx.beginPath();
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };
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
                boxShadow: tokens.shadow.glowPrimary,
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

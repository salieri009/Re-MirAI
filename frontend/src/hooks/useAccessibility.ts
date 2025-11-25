/**
 * Accessibility Hooks
 * React hooks for WCAG 2.1 AA compliance
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * Hook: useReducedMotion
 * Detects user's motion preference
 * 
 * @returns {boolean} true if user prefers reduced motion
 * 
 * Usage:
 * ```tsx
 * const prefersReduced = useReducedMotion();
 * if (!prefersReduced) {
 *   // Run animations
 * }
 * ```
 */
export function useReducedMotion(): boolean {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReduced;
}

/**
 * Hook: useHighContrast
 * Detects user's contrast preference
 * 
 * @returns {boolean} true if user prefers high contrast
 */
export function useHighContrast(): boolean {
    const [prefersHighContrast, setPrefersHighContrast] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-contrast: high)');
        setPrefersHighContrast(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersHighContrast(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersHighContrast;
}

/**
 * Hook: useKeyboardNavigation
 * Enhanced keyboard navigation support
 * 
 * @param {Object} handlers - Keyboard event handlers
 * 
 * Usage:
 * ```tsx
 * useKeyboardNavigation({
 *   'Escape': closeModal,
 *   'ArrowLeft': previousItem,
 *   'ArrowRight': nextItem,
 * });
 * ```
 */
export function useKeyboardNavigation(
    handlers: Record<string, (event: KeyboardEvent) => void>
) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const handler = handlers[event.key];
            if (handler) {
                handler(event);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlers]);
}

/**
 * Hook: useFocusTrap
 * Traps focus within a container (useful for modals)
 * 
 * @param {React.RefObject<HTMLElement>} containerRef - Container element ref
 * @param {boolean} isActive - Whether trap is active
 */
export function useFocusTrap(
    containerRef: React.RefObject<HTMLElement>,
    isActive: boolean
) {
    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        container.addEventListener('keydown', handleTabKey);
        firstElement?.focus();

        return () => {
            container.removeEventListener('keydown', handleTabKey);
        };
    }, [containerRef, isActive]);
}

/**
 * Hook: useAnnouncement
 * Screen reader announcements via aria-live regions
 * 
 * @returns {function} announce - Function to make announcements
 * 
 * Usage:
 * ```tsx
 * const announce = useAnnouncement();
 * announce('Form submitted successfully', 'polite');
 * ```
 */
export function useAnnouncement(): (
    message: string,
    priority?: 'polite' | 'assertive'
) => void {
    const [announcer, setAnnouncer] = useState<HTMLDivElement | null>(null);

    useEffect(() => {
        const div = document.createElement('div');
        div.setAttribute('role', 'status');
        div.setAttribute('aria-live', 'polite');
        div.setAttribute('aria-atomic', 'true');
        div.style.position = 'absolute';
        div.style.left = '-10000px';
        div.style.width = '1px';
        div.style.height = '1px';
        div.style.overflow = 'hidden';

        document.body.appendChild(div);
        setAnnouncer(div);

        return () => {
            document.body.removeChild(div);
        };
    }, []);

    const announce = useCallback((
        message: string,
        priority: 'polite' | 'assertive' = 'polite'
    ) => {
        if (!announcer) return;

        announcer.setAttribute('aria-live', priority);
        announcer.textContent = message;

        // Clear after announcement
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }, [announcer]);

    return announce;
}

/**
 * Hook: useAccessibility
 * Combined accessibility preferences
 * 
 * @returns {Object} accessibility preferences
 */
export function useAccessibility() {
    const reducedMotion = useReducedMotion();
    const highContrast = useHighContrast();

    return {
        reducedMotion,
        highContrast,
        shouldAnimate: !reducedMotion,
        shouldUseHighContrast: highContrast,
    };
}

/**
 * Utility: Skip to Content Link
 * Allows keyboard users to skip navigation
 * 
 * Usage in App:
 * ```tsx
 * <SkipToContent targetId="main-content" />
 * <main id="main-content">...</main>
 * ```
 */
export function SkipToContent({ targetId }: { targetId: string }) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.getElementById(targetId);
        target?.focus();
        target?.scrollIntoView();
    };

    return (
        <a
            href= {`#${targetId}`
}
onClick = { handleClick }
style = {{
    position: 'absolute',
        left: '-10000px',
            top: 'auto',
                width: '1px',
                    height: '1px',
                        overflow: 'hidden',
            }}
onFocus = {(e) => {
    e.currentTarget.style.position = 'fixed';
    e.currentTarget.style.top = '0';
    e.currentTarget.style.left = '0';
    e.currentTarget.style.width = 'auto';
    e.currentTarget.style.height = 'auto';
    e.currentTarget.style.overflow = 'visible';
    e.currentTarget.style.zIndex = '9999';
    e.currentTarget.style.padding = '8px 16px';
    e.currentTarget.style.background = '#000';
    e.currentTarget.style.color = '#fff';
}}
onBlur = {(e) => {
    e.currentTarget.style.position = 'absolute';
    e.currentTarget.style.left = '-10000px';
    e.currentTarget.style.width = '1px';
    e.currentTarget.style.height = '1px';
    e.currentTarget.style.overflow = 'hidden';
}}
        >
    Skip to main content
        </a>
    );
}

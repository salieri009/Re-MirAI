/**
 * Accessibility Hooks
 * React hooks for WCAG 2.1 AA compliance
 */

import { useEffect, useState, useCallback } from 'react';
import type { CSSProperties, MouseEvent, RefObject } from 'react';

export function useReducedMotion(): boolean {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReduced(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => setPrefersReduced(event.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReduced;
}

export function useHighContrast(): boolean {
    const [prefersHighContrast, setPrefersHighContrast] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-contrast: high)');
        setPrefersHighContrast(mediaQuery.matches);

        const handler = (event: MediaQueryListEvent) => setPrefersHighContrast(event.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersHighContrast;
}

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

export function useFocusTrap(
    containerRef: RefObject<HTMLElement>,
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

        const handleTabKey = (event: KeyboardEvent) => {
            if (event.key !== 'Tab') return;

            if (event.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    event.preventDefault();
                }
            } else if (document.activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        };

        container.addEventListener('keydown', handleTabKey);
        firstElement?.focus();

        return () => {
            container.removeEventListener('keydown', handleTabKey);
        };
    }, [containerRef, isActive]);
}

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

        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }, [announcer]);

    return announce;
}

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

export function SkipToContent({ targetId }: { targetId: string }) {
    const [isFocused, setIsFocused] = useState(false);

    const hiddenStyles: CSSProperties = {
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
    };

    const visibleStyles: CSSProperties = {
        position: 'fixed',
        top: '0',
        left: '0',
        width: 'auto',
        height: 'auto',
        overflow: 'visible',
        zIndex: 9999,
        padding: '0.75rem 1.5rem',
        background: '#000',
        color: '#fff',
        fontWeight: 600,
        borderBottomRightRadius: '0.5rem',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    };

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const target = document.getElementById(targetId);
        target?.focus({ preventScroll: false });
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <a
            href={`#${targetId}`}
            onClick={handleClick}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={isFocused ? visibleStyles : hiddenStyles}
        >
            Skip to main content
        </a>
    );
}


'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useAccessibility';

export type SummoningStage = 'PRE_SYNTHESIS' | 'ALCHEMIC_MODE' | 'REVEAL';

interface UseSummoningAnimationOptions {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onStageChange?: (stage: SummoningStage) => void;
  autoStart?: boolean;
}

interface SummoningAnimationState {
  stage: SummoningStage;
  progress: number;
  particleCount: number;
  particleColor: string;
}

export function useSummoningAnimation({
  canvasRef,
  onStageChange,
  autoStart = false,
}: UseSummoningAnimationOptions) {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<SummoningAnimationState>({
    stage: 'PRE_SYNTHESIS',
    progress: 0,
    particleCount: 50,
    particleColor: '#845EC2', // Primary Purple
  });
  const animationRef = useRef<(() => void) | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Stage 1: Pre-Synthesis (ambient particles)
  useEffect(() => {
    if (state.stage !== 'PRE_SYNTHESIS' || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set particle system for PRE_SYNTHESIS
    setState((prev) => ({
      ...prev,
      particleCount: 50,
      particleColor: '#845EC2', // Primary Purple
    }));

    // Auto-transition to ALCHEMIC_MODE after 4 seconds if autoStart
    if (autoStart) {
      const timer = setTimeout(() => {
        transitionToAlchemicMode();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [state.stage, reducedMotion, autoStart]);

  // Stage 2: Alchemic Mode (vortex/converge particles)
  useEffect(() => {
    if (state.stage !== 'ALCHEMIC_MODE' || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Increase particle density and switch to converge mode
    setState((prev) => ({
      ...prev,
      particleCount: 80,
      particleColor: '#845EC2', // Can be customized per archetype
    }));

    // Start progress animation
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.progress >= 100) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
          }
          transitionToReveal();
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev.progress + 5 };
      });
    }, 250);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [state.stage, reducedMotion]);

  // Stage 3: Reveal (explosion particles)
  useEffect(() => {
    if (state.stage !== 'REVEAL' || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Maximum particle density for reveal
    setState((prev) => ({
      ...prev,
      particleCount: 100,
      particleColor: '#C197FF', // Highlight Lavender for celebration
    }));

    // Trigger reveal animation (2.5 second climactic sequence)
    const timeline = gsap.timeline();

    timeline
      .to(canvas, {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out',
      })
      .to(canvas, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.in',
      })
      .to(canvas, {
        opacity: 0.8,
        duration: 1.5,
        ease: 'power2.inOut',
      });

    animationRef.current = () => timeline.kill();

    return () => {
      if (animationRef.current) {
        animationRef.current();
      }
    };
  }, [state.stage, reducedMotion]);

  const transitionToAlchemicMode = useCallback(() => {
    setState((prev) => ({ ...prev, stage: 'ALCHEMIC_MODE', progress: 0 }));
    onStageChange?.('ALCHEMIC_MODE');
  }, [onStageChange]);

  const transitionToReveal = useCallback(() => {
    setState((prev) => ({ ...prev, stage: 'REVEAL', progress: 100 }));
    onStageChange?.('REVEAL');
  }, [onStageChange]);

  const skipToReveal = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    transitionToReveal();
  }, [transitionToReveal]);

  return {
    stage: state.stage,
    progress: state.progress,
    particleCount: state.particleCount,
    particleColor: state.particleColor,
    transitionToAlchemicMode,
    transitionToReveal,
    skipToReveal,
  };
}


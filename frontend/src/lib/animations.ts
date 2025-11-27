import gsap from 'gsap';

type KillFn = () => void;

export const spinnerVariants = {
  outer: { duration: 5, ease: 'linear' },
  inner: { duration: 6, ease: 'linear' },
};

export const revealVariants = {
  enter: { duration: 1.5, ease: 'power2.out' },
  pulse: { duration: 0.6, repeat: 1, yoyo: true },
};

export function startSpinnerAnimation(
  outer: HTMLElement | null,
  inner: HTMLElement | null,
): KillFn {
  if (!outer || !inner) {
    return () => undefined;
  }

  const outerTween = gsap.to(outer, {
    rotate: 360,
    duration: spinnerVariants.outer.duration,
    ease: spinnerVariants.outer.ease,
    repeat: -1,
  });

  const innerTween = gsap.to(inner, {
    rotate: -360,
    duration: spinnerVariants.inner.duration,
    ease: spinnerVariants.inner.ease,
    repeat: -1,
  });

  return () => {
    outerTween.kill();
    innerTween.kill();
  };
}

export function animateReveal(
  node: HTMLElement | null,
  options: { onComplete?: () => void } = {},
): KillFn {
  if (!node) {
    return () => undefined;
  }

  const timeline = gsap.timeline({ onComplete: options.onComplete });

  timeline
    .fromTo(
      node,
      { opacity: 0, scale: 0.8, y: 24, filter: 'blur(12px)' },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: revealVariants.enter.duration,
        ease: revealVariants.enter.ease,
      },
    )
    .to(node, {
      boxShadow: '0 0 48px rgba(132, 94, 194, 0.65)',
      duration: revealVariants.pulse.duration,
      yoyo: revealVariants.pulse.yoyo ?? true,
      repeat: revealVariants.pulse.repeat ?? 1,
    }, '-=0.5');

  return () => timeline.kill();
}


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

// Fade animations
export const fadeVariants = {
  in: { duration: 0.4, ease: 'power2.out' },
  out: { duration: 0.3, ease: 'power2.in' },
};

// Slide animations
export const slideVariants = {
  up: { duration: 0.5, ease: 'power2.out' },
  down: { duration: 0.5, ease: 'power2.out' },
  left: { duration: 0.5, ease: 'power2.out' },
  right: { duration: 0.5, ease: 'power2.out' },
};

// Stagger animations for lists
export const staggerVariants = {
  container: { duration: 0.6, ease: 'power2.out' },
  item: { duration: 0.3, ease: 'power2.out' },
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

export function fadeIn(
  node: HTMLElement | null,
  options: { onComplete?: () => void } = {},
): KillFn {
  if (!node) return () => undefined;

  const tween = gsap.fromTo(
    node,
    { opacity: 0 },
    {
      opacity: 1,
      duration: fadeVariants.in.duration,
      ease: fadeVariants.in.ease,
      onComplete: options.onComplete,
    },
  );

  return () => tween.kill();
}

export function fadeOut(
  node: HTMLElement | null,
  options: { onComplete?: () => void } = {},
): KillFn {
  if (!node) return () => undefined;

  const tween = gsap.to(node, {
    opacity: 0,
    duration: fadeVariants.out.duration,
    ease: fadeVariants.out.ease,
    onComplete: options.onComplete,
  });

  return () => tween.kill();
}

export function slideIn(
  node: HTMLElement | null,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options: { onComplete?: () => void } = {},
): KillFn {
  if (!node) return () => undefined;

  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 24, y: 0 },
    right: { x: -24, y: 0 },
  };

  const { x, y } = directions[direction];

  const tween = gsap.fromTo(
    node,
    { opacity: 0, x, y },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: slideVariants[direction].duration,
      ease: slideVariants[direction].ease,
      onComplete: options.onComplete,
    },
  );

  return () => tween.kill();
}

export function staggerIn(
  nodes: HTMLElement[] | NodeListOf<HTMLElement> | null,
  options: { onComplete?: () => void } = {},
): KillFn {
  if (!nodes || nodes.length === 0) return () => undefined;

  const timeline = gsap.timeline({ onComplete: options.onComplete });

  timeline.fromTo(
    Array.from(nodes),
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: staggerVariants.item.duration,
      ease: staggerVariants.item.ease,
      stagger: 0.1,
    },
  );

  return () => timeline.kill();
}


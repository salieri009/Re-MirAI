/**
 * Atomic Design: ATOMS
 * 
 * Atoms are the basic building blocks of the UI. They are the smallest,
 * most fundamental components that cannot be broken down further without
 * losing their meaning.
 * 
 * Examples:
 * - Button (interactive element)
 * - Logo (branding element)
 * - LoadingSpinner (feedback element)
 * - LoadingSkeleton (placeholder element)
 * - Text/Badge (semantic elements)
 * - Icon components (visual elements)
 * 
 * Key characteristics:
 * - Single responsibility (one job)
 * - Highly reusable
 * - No dependencies on other components (except other atoms)
 * - Presentational (dumb components)
 */

export { default as Button } from './Button.vue'
export { default as Logo } from './Logo.vue'
export { default as LoadingSpinner } from './LoadingSpinner.vue'
export { default as LoadingSkeleton } from './LoadingSkeleton.vue'
export { default as IconMirror } from './IconMirror.vue'
export { default as IconChat } from './IconChat.vue'
export { default as IconRobot } from './IconRobot.vue'
export { default as IconMenu } from './IconMenu.vue'
export { default as IconUser } from './IconUser.vue'
export { default as Label } from './Label.vue'
export { default as Input } from './Input.vue'
export { default as ErrorText } from './ErrorText.vue'

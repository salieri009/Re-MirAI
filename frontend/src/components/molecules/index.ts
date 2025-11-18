/**
 * Atomic Design: MOLECULES
 * 
 * Molecules are groups of atoms bonded together to form small,
 * functional units. They are simple combinations that form the
 * basic building blocks of more complex UIs.
 * 
 * Examples:
 * - ShareButton (Button + Icon + Logic)
 * - Card (Container + Content structure)
 * - FormField (Label + Input + Error message)
 * - Header (Logo + Navigation + Auth button)
 * 
 * Key characteristics:
 * - Composed of atoms
 * - Reusable functional units
 * - Still mostly presentational
 * - Handle simple logic (e.g., toggle visibility)
 */

export { default as ShareButton } from './ShareButton.vue'

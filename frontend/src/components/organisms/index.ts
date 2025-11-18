/**
 * Atomic Design: ORGANISMS
 * 
 * Organisms are more complex components composed of molecules
 * and/or atoms. They can be relatively simple or very complex,
 * and they perform specific functions or display major sections
 * of a UI.
 * 
 * Examples:
 * - DynamicPersonaCard (persona display with animation)
 * - SurveyForm (complex form with multiple fields)
 * - Navigation (full navigation system)
 * - PersonaStats (persona statistics display)
 * 
 * Key characteristics:
 * - Composed of molecules and atoms
 * - Complex, feature-rich components
 * - Handle business logic and data fetching
 * - Often connected to state management (Pinia stores)
 * - Require more sophisticated prop/event interfaces
 */

export { default as DynamicPersonaCard } from './DynamicPersonaCard.vue'

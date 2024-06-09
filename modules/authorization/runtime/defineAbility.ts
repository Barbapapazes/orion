/**
 * Pure and available on both the client and server.
 */

import type { AbilityFunction, AbilityFunctionWithGuest, BouncerAbility } from '../src/types'

/**
 * Define an ability that does not allow guests.
 */
export function defineAbility<T>(ability: AbilityFunction<T>, options?: { allowGuest: false }): BouncerAbility<T>
/**
 * Define an ability that allows guests.
 */
export function defineAbility<T>(ability: AbilityFunctionWithGuest<T>, options: { allowGuest: true }): BouncerAbility<T>
/**
 * Define an ability that you can use to check if a user can perform an action.
 */
export function defineAbility<T>(ability: AbilityFunction<T> | AbilityFunctionWithGuest<T>, options?: { allowGuest: boolean }) {
  return {
    execute: ability,
    allowGuest: options?.allowGuest || false,
  }
}

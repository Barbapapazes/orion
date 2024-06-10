import type { User } from '#auth-utils'

/**
 * Callback function that defines if a user can perform an action.
 */
export type AbilityFunction<T> = (user: User, data: T) => boolean
/**
 * Callback function that defines if a user can perform an action when the user is not defined (guest).
 */
export type AbilityFunctionWithGuest<T> = (user: User | null, data: T
) => boolean

/**
 * If the allowGuest option is set to true, the execute function will receive an undefined user.
 * Otherwise, the user will always be defined.
 */
export type Ability<T, AllowGuest extends boolean | undefined> = AllowGuest extends true ? AbilityFunctionWithGuest<T> : AbilityFunction<T>

/**
 * Ability format for the bouncer.
 */
export type BouncerAbility<T> = {
  execute: AbilityFunction<T>
  allowGuest: false
} | {
  execute: AbilityFunctionWithGuest<T>
  allowGuest: true
}

export interface User {}

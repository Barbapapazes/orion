import type { BouncerAbility } from './types'

/**
 * Pure function to check if a user can perform an action.
 *
 * Agnostic to the user session and the client/server environment.
 */
export function allows<User, Data>(ability: BouncerAbility<Data>, user: User, data?: Data): boolean {
  const allowGuest = ability.allowGuest
  // Avoid type errors because the expect error could not break if the execute function name is changed
  const execute = ability.execute

  if (!user && !allowGuest) {
    return false
  }

  // @ts-expect-error - If the user is not defined, the developer will handle it thanks to the type of the `execute` function emitted to the parent component.
  return execute(user, data)
}

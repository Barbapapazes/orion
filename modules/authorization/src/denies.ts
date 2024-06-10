import type { BouncerAbility } from "./types";
import { allows } from "./allows";

/**
 * Pure function to check if a user cannot perform an action.
 *
 * Agnostic to the user session and the client/server environment.
 */
export function denies<User, Data>(ability: BouncerAbility<Data>, user: User, data?: Data): boolean {
  return !allows(ability, user, data)
}

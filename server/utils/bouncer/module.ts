import type { User } from '#auth-utils'

export const listModules = defineAbility({ allowGuest: true }, () => true)

export const syncModules = defineAbility((user: User) => {
  /**
   * Only admins can create modules.
   */
  return user.roleType === 'admin'
})

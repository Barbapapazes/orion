import type { User } from '#auth-utils'

export const listUsers = defineAbility((user: User) => {
  /**
   * Only admins can list users.
   */
  return user.roleType === 'admin'
})

export const banUser = defineAbility((user: User) => {
  /**
   * Only admins can ban users.
   */
  return user.roleType === 'admin'
})

export const unbanUser = defineAbility((user: User) => {
  /**
   * Only admins can unban users.
   */
  return user.roleType === 'admin'
})

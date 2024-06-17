export const listUsers = defineAbility((user) => {
  /**
   * Only admins can list users.
   */
  return user.roleType === 'admin'
})

export const banUser = defineAbility((user) => {
  /**
   * Only admins can ban users.
   */
  return user.roleType === 'admin'
})

export const unbanUser = defineAbility((user) => {
  /**
   * Only admins can unban users.
   */
  return user.roleType === 'admin'
})

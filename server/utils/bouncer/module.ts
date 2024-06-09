export const listModules = defineAbility(() => true, { allowGuest: true })

export const syncModules = defineAbility((user) => {
  /**
   * Only admins can create modules.
   */
  return user.roleType === 'admin'
})

/**
 * Everyone can list categories.
 */
export const listCategories = defineAbility(() => true, { allowGuest: true })

export const createCategory = defineAbility((user) => {
  /**
   * Only admins can create categories.
   */
  return user.roleType === 'admin'
})

export const updateCategory = defineAbility((user) => {
  /**
   * Only admins can update categories.
   */
  return user.roleType === 'admin'
})

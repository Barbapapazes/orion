import type { User } from '#auth-utils'

/**
 * Everyone can list categories.
 */
export const listCategories = defineAbility({ allowGuest: true }, () => true)

export const createCategory = defineAbility((user: User) => {
  /**
   * Only admins can create categories.
   */
  return user.roleType === 'admin'
})

export const updateCategory = defineAbility((user: User) => {
  /**
   * Only admins can update categories.
   */
  return user.roleType === 'admin'
})

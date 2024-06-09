import type { User } from '#auth-utils'

export const listTemplates = defineAbility(() => true, { allowGuest: true })

export const viewTemplate = defineAbility((user, template: Pick<Template, 'status' | 'creatorId'> | undefined) => {
  if (template === undefined) {
    return false
  }

  /**
   * The template is public and available for everyone to view.
   */
  if (template.status === 'validated') {
    return true
  }

  /**
   * Logged in user must be an admin.
   */
  if (user && user.roleType === 'admin') {
    return true
  }

  /**
   * Or the logged in user must be the creator of the template.
   */
  if (user && user.id === template.creatorId) {
    return true
  }

  return false
}, { allowGuest: true })

export const createTemplate = defineAbility(() => true)

export const updateTemplate = defineAbility((user: User | undefined, template: Pick<Template, 'status' | 'creatorId'> | undefined): boolean => {
  if (template === undefined) {
    return false
  }

  if (user === undefined) {
    return false
  }

  /**
   * Only an admin can update a template.
   */
  if (user.roleType === 'admin') {
    return true
  }

  /**
   * Or the creator of the template can update it.
   */
  if (user.id === template.creatorId) {
    return true
  }

  return false
})

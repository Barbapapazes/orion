import type { User } from '#auth-utils'
import { deny as _deny } from '#imports'

export const listTemplates = defineAbility({ allowGuest: true }, () => true)

export const viewTemplate = defineAbility({ allowGuest: true }, (user: User | null, template: Pick<Template, 'status' | 'creatorId'> | undefined) => {
  const deny = () => _deny({ statusCode: 404, message: 'Template not found' })

  if (template === undefined) {
    return deny()
  }

  /**
   * The template is public and available for everyone to view.
   */
  if (template.status === 'validated') {
    return allow()
  }

  /**
   * Logged in user must be an admin.
   */
  if (user && user.roleType === 'admin') {
    return allow()
  }

  /**
   * Or the logged in user must be the creator of the template.
   */
  if (user && user.id === template.creatorId) {
    return allow()
  }

  return deny()
})

export const createTemplate = defineAbility(() => true)

export const updateTemplate = defineAbility((user: User, template: Pick<Template, 'status' | 'creatorId'> | undefined) => {
  if (template === undefined) {
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

export const updateTemplateStatus = defineAbility((user: User, template: Pick<Template, 'status' | 'creatorId'> | undefined) => {
  if (template === undefined) {
    return false
  }

  /**
   * Only an admin can update the status of a template.
   */
  if (user.roleType === 'admin') {
    return true
  }

  return false
})

import type { User } from '#auth-utils'
import type { Template } from '~/server/utils/drizzle'

export const viewNonPublicTemplate = defineAbility((user: User, template: Pick<Template, 'creatorId' | 'status'>) => {
  // Non-public templates are only viewable by the creator or an admin
  if (template.status !== 'validated' && (user.roleType === 'admin' || user.id === template.creatorId)) {
    return true
  }

  return false
})

export const editTemplate = defineAbility((user: User, template: Pick<Template, 'creatorId'>) => {
  if (user.roleType === 'admin') {
    return true
  }

  if (template && user.id === template.creatorId) {
    return true
  }

  return false
})

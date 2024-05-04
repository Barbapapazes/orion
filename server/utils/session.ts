import { type H3Event } from 'h3'
import { type UserSessionRequired } from '#auth-utils'

/**
 * Require an admin user
 */
export async function requireAdminUser(event: H3Event): Promise<UserSessionRequired> {
  const userSession = await getUserSession(event)

  if (!userSession.user || userSession.user.roleType !== 'admin') {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  return userSession as UserSessionRequired
}

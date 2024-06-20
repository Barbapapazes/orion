import { number, object } from 'zod'
import { unbanUser } from '~/utils'

export default defineEventHandler(async (event) => {
  await authorize(event, unbanUser)

  const params = await getValidatedRouterParams(event, object({
    id: number({ coerce: true }),
  }).parse)

  await useDrizzle().update(tables.users)
    .set({ roleType: 'creator' })
    .where(eq(tables.users.id, params.id)).catch((error) => {
      console.error(error)
      sendDiscordNotification(event, 'Failed to unban user', { level: 'error', message: error.message})
      throw createError({
        status: 500,
        message: 'Failed to unban user',
      })
    })

  sendDiscordNotification(event, `User ${params.id} banned`, { level: 'success' })

  return sendNoContent(event, 204)
})

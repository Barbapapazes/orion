import { number, object } from 'zod'
import { banUser } from '~/utils'

export default defineEventHandler(async (event) => {
  await authorize(event, banUser)

  const params = await getValidatedRouterParams(event, object({
    id: number({ coerce: true }),
  }).parse)

  await useDrizzle().update(tables.users)
    .set({ roleType: 'banned' })
    .where(eq(tables.users.id, params.id)).catch((error) => {
      console.error(error)
      sendDiscordNotification(event, 'Failed to ban user', { level: 'error', message: error.message })
      throw createError({
        status: 500,
        message: 'Failed to ban user',
      })
    })

  sendDiscordNotification(event, `User ${params.id} banned`, { level: 'success' })

  return sendNoContent(event, 204)
})

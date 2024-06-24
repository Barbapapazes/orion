import { object, string, enum as zEnum } from 'zod'
import { TEMPLATE_STATUS } from '~/utils/constants'
import { updateTemplateStatus } from '~/utils'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, object({
    hash: string(),
  }).parse)

  const body = await readValidatedBody(event, object({
    status: zEnum(TEMPLATE_STATUS, { message: 'Invalid status' }),
  }).parse)

  const template = await useDrizzle().query.templates.findFirst({
    where: eq(tables.templates.hash, params.hash),
    columns: {
      id: true,
      status: true,
      creatorId: true,
    },
  })

  if (!template) {
    sendDiscordNotification(event, 'Template not found', { level: 'error' })
    throw createError({
      statusCode: 404,
      message: 'Template not found',
    })
  }

  await authorize(event, updateTemplateStatus, template)

  await useDrizzle().update(tables.templates).set({
    status: body.status,
  })
    .where(and(eq(tables.templates.hash, params.hash)))
    .execute().catch((error) => {
      console.error(error)
      sendDiscordNotification(event, 'Failed to update template status', { level: 'error', message: error.message })
      throw createError({
        status: 500,
        message: 'Failed to update template status',
      })
    })

  return sendNoContent(event, 204)
})

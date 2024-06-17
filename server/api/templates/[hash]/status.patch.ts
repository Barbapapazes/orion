import { object, string, enum as zEnum } from 'zod'
import { TEMPLATE_STATUS } from '~/utils/constants'

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
    .execute()

  return sendNoContent(event, 204)
})

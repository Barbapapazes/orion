import { object, string } from 'zod'
import { editTemplateContentValidator } from '~/utils/validators'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, object({
    hash: string(),
  }).parse)
  const body = await readValidatedBody(event, editTemplateContentValidator.parse)

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

  await authorize(event, updateTemplate, template)

  const [updatedTemplate] = await useDrizzle().update(tables.templates).set({
    slug: useSlugify(body.title),
    title: body.title,
    categoryId: body.categoryId,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    shortDescription: body.shortDescription,
    description: body.description,
  })
    .where(and(eq(tables.templates.hash, params.hash)))
    .returning({
      id: tables.templates.id,
    })

  if (body.moduleIds) {
    await useDrizzle().delete(tables.modulesToTemplates)
      .where(eq(tables.modulesToTemplates.templateId, updatedTemplate.id))
      .execute()

    await useDrizzle().insert(tables.modulesToTemplates)
      .values(body.moduleIds.map(id => ({ moduleId: id, templateId: updatedTemplate.id })),
      ).execute()
  }

  return sendNoContent(event, 204)
})

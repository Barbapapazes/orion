import { object, string } from 'zod'
import { editTemplateContentValidator } from '~/utils/validators'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const params = await getValidatedRouterParams(event, object({
    hash: string(),
  }).parse)
  const body = await readValidatedBody(event, editTemplateContentValidator.parse)

  const [template] = await useDrizzle().update(tables.templates).set({
    slug: useSlugify(body.title),
    title: body.title,
    categoryId: body.categoryId,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    shortDescription: body.shortDescription,
    description: body.description,
  })
    .where(and(eq(tables.templates.hash, params.hash), eq(tables.templates.creatorId, user.id)))
    .returning({
      id: tables.templates.id,
    })

  if (body.moduleIds) {
    await useDrizzle().delete(tables.modulesToTemplates)
      .where(eq(tables.modulesToTemplates.templateId, template.id))
      .execute()

    await useDrizzle().insert(tables.modulesToTemplates)
      .values(body.moduleIds.map(id => ({ moduleId: id, templateId: template.id })),
      ).execute()
  }

  return sendNoContent(event, 204)
})

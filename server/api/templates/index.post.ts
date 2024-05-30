import sanitizeHtml from 'sanitize-html'
import { createTemplateValidator } from '~/utils/validators'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const body = await readValidatedBody(event, createTemplateValidator.parse)

  const [template] = await useDrizzle().insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    title: body.title,
    categoryId: body.categoryId,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    shortDescription: body.shortDescription,
    description: body.description ? sanitizeHtml(body.description) : null,
    creatorId: user.id,
  }).returning({
    id: tables.templates.id,
  })

  if (body.moduleIds) {
  // TODO: check if this is the better way to do it
    await useDrizzle().insert(tables.modulesToTemplates).values(body.moduleIds.map(id => ({ moduleId: id, templateId: template.id }))).execute()
  }

  return sendNoContent(event, 201)
})

import { number, object, string, enum as zEnum } from 'zod'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const body = await readValidatedBody(event, object({
    title: string(),
    paidStatus: zEnum(['free', 'paid']),
    categoryId: number(),
    liveUrl: string().optional(),
    accessUrl: string(),
    description: string().max(1000),
  }).parse)

  await useDrizzle().insert(tables.templates).values({
    hash: useHash(),
    slug: useSlugify(body.title),
    title: body.title,
    categoryId: body.categoryId,
    paidStatus: body.paidStatus,
    liveUrl: body.liveUrl,
    accessUrl: body.accessUrl,
    description: body.description,
    descriptionHTML: useMarkdownToHTML(body.description),
    userId: user.id,
  }).execute()

  return sendNoContent(event, 201)
})

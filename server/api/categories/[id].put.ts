import { number, object, string } from 'zod'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const params = await getValidatedRouterParams(event, object({
      id: number({ coerce: true }).int().positive(),
    }).parse
  )
  const body = await readValidatedBody(event, object({
    name: string()
  }).parse)

  // TODO: Return the DB error to the client (actually, it's just a 500 error handle by Nitro)
  await useDrizzle().update(tables.categories).set({
    slug: useSlugify(body.name),
    name: body.name,
  })
    .where(eq(tables.categories.id, params.id))
    .execute()

  return sendNoContent(event, 200)
})

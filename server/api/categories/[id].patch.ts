import { number, object } from 'zod'
import { updateCategoryValidator } from '~/utils/validators'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const params = await getValidatedRouterParams(event, object({
    id: number({ coerce: true }),
  }).parse,
  )
  const body = await readValidatedBody(event, updateCategoryValidator.parse)

  // TODO: Return the DB error to the client (actually, it's just a 500 error handle by Nitro)
  await useDrizzle().update(tables.categories).set({
    slug: useSlugify(body.name),
    name: body.name,
  })
    .where(eq(tables.categories.id, params.id))
    .execute()

  return sendNoContent(event, 204)
})

import { createCategoryValidator } from '~/utils/validators'

export default defineEventHandler(async (event) => {
  await authorize(event, createCategory)

  const body = await readValidatedBody(event, createCategoryValidator.parse)

  // TODO: Return the DB error to the client (actually, it's just a 500 error handle by Nitro)
  await useDrizzle().insert(tables.categories).values({
    slug: useSlugify(body.name),
    name: body.name,
  }).execute()

  return sendNoContent(event, 201)
})

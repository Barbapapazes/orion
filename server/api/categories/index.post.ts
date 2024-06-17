import { createCategory, createCategoryValidator } from '~/utils'

export default defineEventHandler(async (event) => {
  await authorize(event, createCategory)

  const body = await readValidatedBody(event, createCategoryValidator.parse)

  const category = await useDrizzle().query.categories.findFirst({
    where: eq(tables.categories.slug, useSlugify(body.name)),
  })

  if (category) {
    throw createError({
      statusCode: 409,
      message: 'Category already exists',
    })
  }

  await useDrizzle().insert(tables.categories).values({
    slug: useSlugify(body.name),
    name: body.name,
  }).execute().catch((error) => {
    if (error instanceof Error) {
      throw createError({
        status: 500,
        message: error.message,
      })
    }
  })

  // Remove cache to force a refresh
  await deleteCachedCategories()

  return sendNoContent(event, 201)
})

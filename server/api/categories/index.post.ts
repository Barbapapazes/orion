import { createCategory, createCategoryValidator } from '~/utils'

export default defineEventHandler(async (event) => {
  await authorize(event, createCategory)

  const body = await readValidatedBody(event, createCategoryValidator.parse)

  const category = await useDrizzle().query.categories.findFirst({
    where: eq(tables.categories.slug, useSlugify(body.name)),
  })

  if (category) {
    sendDiscordNotification(event, 'Category already exists', { level: 'error' })
    throw createError({
      statusCode: 409,
      message: 'Category already exists',
    })
  }

  await useDrizzle().insert(tables.categories).values({
    slug: useSlugify(body.name),
    name: body.name,
  }).execute().catch(async (error) => {
    if (error instanceof Error) {
      sendDiscordNotification(event, 'Failed to create category', { level: 'error' })
      throw createError({
        status: 500,
        message: error.message,
      })
    }
  })

  sendDiscordNotification(event, `Category ${body.name} created`, { level: 'success' })

  // Remove cache to force a refresh
  deleteCachedCategories(event)

  return sendNoContent(event, 201)
})

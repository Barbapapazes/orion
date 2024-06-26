import { number, object } from 'zod'
import { editCategoryValidator, updateCategory } from '~/utils'

export default defineEventHandler(async (event) => {
  await authorize(event, updateCategory)

  const params = await getValidatedRouterParams(event, object({
    id: number({ coerce: true }),
  }).parse,
  )
  const body = await readValidatedBody(event, editCategoryValidator.parse)

  const category = await useDrizzle().query.categories.findFirst({
    // Do not fetch the current category
    where: and(eq(tables.categories.slug, useSlugify(body.name)), ne(tables.categories.id, params.id)),
  })

  if (category) {
    throw createError({
      statusCode: 409,
      message: 'Category already exists',
    })
  }

  await useDrizzle().update(tables.categories).set({
    slug: useSlugify(body.name),
    name: body.name,
  })
    .where(eq(tables.categories.id, params.id))
    .execute().catch((error) => {
      console.error(error)
      sendDiscordNotification(event, 'Failed to update category', { level: 'error', message: error.message })
      throw createError({
        status: 500,
        message: 'Failed to update category',
      })
    })

  // Remove cache to force a refresh
  deleteCachedCategories(event)

  sendDiscordNotification(event, `Category ${body.name} updated`, { level: 'success' })

  return sendNoContent(event, 204)
})

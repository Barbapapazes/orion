import type { H3Event } from 'h3'

export const cachedCategoriesName = 'categories'
export const cachedCategoriesKey = 'categories'

export const cachedCategories = defineCachedFunction(async (_event: H3Event) => {
  const categories = await useDrizzle().select({
    id: tables.categories.id,
    slug: tables.categories.slug,
    name: tables.categories.name,
  }).from(tables.categories).execute()

  return categories
}, {
  maxAge: 60 * 60 * 8, // 8 hours
  name: cachedCategoriesName,
  getKey: () => cachedCategoriesKey,
})

export default defineEventHandler(async (event) => {
  await authorize(event, listCategories)

  const categories = await useDrizzle().select({
    id: tables.categories.id,
    slug: tables.categories.slug,
    name: tables.categories.name,
  }).from(tables.categories)

  return categories
})

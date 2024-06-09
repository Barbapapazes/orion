export default defineEventHandler(async (event) => {
  await authorize(event, getKPIs)

  const [{ count: creatorCount }] = await useDrizzle().select({ count: countDistinct(tables.templates.creatorId) })
    .from(tables.templates)
    .where(eq(tables.templates.status, 'validated'))
    .execute()

  const [{ count: templatesCount }] = await useDrizzle().select({ count: count() })
    .from(tables.templates)
    .where(eq(tables.templates.status, 'validated'))
    .execute()

  const [{ count: categoriesCount }] = await useDrizzle().select({ count: count() }).from(tables.categories).execute()

  return {
    creators: {
      count: creatorCount,
    },
    categories: {
      count: categoriesCount,
    },
    templates: {
      count: templatesCount,
    },
  }
})

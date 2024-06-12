import type { H3Event } from 'h3'

export default defineEventHandler(async (event) => {
  await authorize(event, getKPIs)

  const { creatorsCount, categoriesCount, templatesCount } = await cachedKPIs(event)

  return {
    creators: {
      count: creatorsCount,
    },
    categories: {
      count: categoriesCount,
    },
    templates: {
      count: templatesCount,
    },
  }
})

const cachedKPIs = defineCachedFunction(async (event: H3Event) => {
  const [creatorsCount, categoriesCount, templatesCount] = await Promise.all([
    cachedCreatorsCount(event),
    cachedCategoriesCount(event),
    cachedTemplatesCount(event),
  ])

  return {
    creatorsCount,
    templatesCount,
    categoriesCount,
  }
}, {
  maxAge: 60 * 60 * 8, // 8 hours
  name: 'kpis',
  getKey: () => 'kpis',
})

const cachedCreatorsCount = defineCachedFunction(async (_event: H3Event) => {
  const [{ count: creatorsCount }] = await useDrizzle().select({ count: countDistinct(tables.templates.creatorId) })
    .from(tables.templates)
    .where(eq(tables.templates.status, 'validated'))
    .execute()

  return creatorsCount
}, {
  maxAge: 60 * 60 * 8, // 8 hours
  name: 'kpis_creators_count',
  getKey: () => 'kpis_creators_count',
})

const cachedCategoriesCount = defineCachedFunction(async (_event: H3Event) => {
  const [{ count: categoriesCount }] = await useDrizzle().select({ count: count() }).from(tables.categories).execute()

  return categoriesCount
}, {
  maxAge: 60 * 60 * 8, // 8 hours
  name: 'kpis_categories_count',
  getKey: () => 'kpis_categories_count',
})

const cachedTemplatesCount = defineCachedFunction(async (_event: H3Event) => {
  const [{ count: templatesCount }] = await useDrizzle().select({ count: count() })
    .from(tables.templates)
    .where(eq(tables.templates.status, 'validated'))
    .execute()

  return templatesCount
}, {
  maxAge: 60 * 60 * 8, // 8 hours
  name: 'kpis_templates_count',
  getKey: () => 'kpis_templates_count',
})

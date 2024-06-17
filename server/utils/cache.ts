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

export const deleteCachedCategories = async () => {
  await useStorage('cache').removeItem(`nitro:functions:${cachedCategoriesName}:${cachedCategoriesKey}.json`)
}

export const cachedModulesName = 'modules'
export const cachedModulesKey = 'modules'

export const cachedModules = defineCachedFunction(async (_event: H3Event) => {
  const modules = await useDrizzle().select({
    id: tables.modules.id,
    slug: tables.modules.slug,
    name: tables.modules.name,
    type: tables.modules.type,
    icon: tables.modules.icon,
  }).from(tables.modules)
    .orderBy(asc(tables.modules.name), desc(tables.modules.type))

  return modules
}, {
  maxAge: 60 * 60 * 8, // 8 hours
  name: cachedModulesName,
  getKey: () => cachedModulesKey,
})

export const deleteCachedModules = async () => {
  await useStorage('cache').removeItem(`nitro:functions:${cachedModulesName}:${cachedModulesKey}.json`)
}

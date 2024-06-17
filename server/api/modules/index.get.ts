export default defineEventHandler(async (event) => {
  await authorize(event, listModules)

  const modules = await useDrizzle().select({
    id: tables.modules.id,
    slug: tables.modules.slug,
    name: tables.modules.name,
    type: tables.modules.type,
    icon: tables.modules.icon,
  }).from(tables.modules)
    .orderBy(asc(tables.modules.name), desc(tables.modules.type))

  return modules
})

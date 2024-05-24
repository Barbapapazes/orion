export default defineEventHandler(async () => {
  const modules = await useDrizzle().select({
    id: tables.modules.id,
    slug: tables.modules.slug,
    name: tables.modules.name,
    type: tables.modules.type,
    icon: tables.modules.icon,
  }).from(tables.modules)

  return modules
})

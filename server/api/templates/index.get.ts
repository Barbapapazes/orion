export default defineEventHandler(async () => {
  // const templates = await useDrizzle().select({
  //   id: tables.templates.id,
  //   title: tables.templates.title,
  //   shortDescription: tables.templates.shortDescription,
  //   description: tables.templates.description,
  //   status: tables.templates.status,
  //   paidStatus: tables.templates.paidStatus,
  //   liveUrl: tables.templates.liveUrl,
  //   accessUrl: tables.templates.accessUrl,
  //   user: {
  //     name: tables.users.name,
  //     login: tables.users.login,
  //     avatarUrl: tables.users.avatarUrl,
  //   },
  //   // group modules from the same template to an array (you are using sqlite
  //   // so you can't use the `arrayAgg` function)
  //   modules:
  //   category: {
  //     /**
  //      * The `name` field is aliased to `c_name` to avoid conflicts with the `name` field from the `templates` table. Issue in D1.
  //      *
  //      * https://github.com/cloudflare/workers-sdk/issues/3160
  //      */
  //     name: sql<string>`${tables.categories.name}`.as('c_name'),
  //   },
  // }).from(tables.modulesToTemplates)
  //   .leftJoin(tables.templates, eq(tables.templates.id, tables.modulesToTemplates.templateId))
  //   .leftJoin(tables.modules, eq(tables.modules.id, tables.modulesToTemplates.moduleId))
  //   .leftJoin(tables.users, eq(tables.templates.creatorId, tables.users.id))
  //   .leftJoin(tables.categories, eq(tables.templates.categoryId, tables.categories.id))
  const templates = await useDrizzle().query.templates.findMany({
    with: {
      category: true,
      creator: true,
      modules: {
        with: {
          module: true
        } ,
      },
    },
  })

  return templates
})

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)

  const templates = await useDrizzle().query.templates.findMany({
    where: eq(tables.templates.creatorId, user.user.id),
    columns: {
      id: true,
      hash: true,
      slug: true,
      status: true,
      featuredImage: true,
      title: true,
      paidStatus: true,
      accessUrl: true,
      liveUrl: true,
      shortDescription: true,
      description: true,
    },
    with: {
      category: {
        columns: {
          id: true,
          slug: true,
          name: true,
        },
      },
      creator: {
        columns: {
          id: true,
          name: true,
          login: true,
          avatarUrl: true,
        },
      },
      modules: {
        columns: {
          templateId: false,
          moduleId: false,
        },
        with: {
          module: {
            columns: {
              id: true,
              name: true,
              slug: true,
              icon: true,
            },
          },
        },
      },
    },
  })

  return templates
})

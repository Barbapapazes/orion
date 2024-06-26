import { object, string } from 'zod'
import { viewTemplate } from '~/utils'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, object({
    hash: string().length(12),
  }).parse)

  const { hash } = params

  const template = await useDrizzle().query.templates.findFirst({
    where: eq(tables.templates.hash, hash),
    columns: {
      id: true,
      slug: true,
      hash: true,
      featuredImage: true,
      additionalImages: true,
      title: true,
      paidStatus: true,
      accessUrl: true,
      liveUrl: true,
      shortDescription: true,
      description: true,
      status: true,
      creatorId: true,
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
          login: true,
          name: true,
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
              slug: true,
              name: true,
              icon: true,
            },
          },
        },
      },
    },
  })

  await authorize(event, viewTemplate, template)

  return template
})

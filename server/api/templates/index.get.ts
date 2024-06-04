import { number, object } from 'zod'
import { getPagination } from '~/server/utils/pagination'

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, object({
    limit: number({ coerce: true }).default(10),
    page: number({ coerce: true }).default(1),
  }).parse)

  const templates = await useDrizzle().query.templates.findMany({
    limit: query.limit,
    offset: getOffset(query),
    columns: {
      id: true,
      slug: true,
      hash: true,
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
          name: true,
          slug: true,
        },
      },
      creator: {
        columns: {
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
              name: true,
              icon: true,
            },
          },
        },
      },
    },
  })

  const meta = await useDrizzle().select({ count: count() }).from(tables.templates)

  return getPagination(templates, {
    total: meta[0].count,
    ...query,
  })
})

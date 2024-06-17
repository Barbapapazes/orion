import { number, object, enum as zEnum } from 'zod'
import { TEMPLATE_PAID_STATUS, TEMPLATE_STATUS } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  const user = await requireUserSession(event)

  const query = await getValidatedQuery(event, object({
    page: number({ coerce: true }).default(1),
    limit: number({ coerce: true }).default(12),
    status: zEnum(TEMPLATE_STATUS, { message: 'Invalid status' }).optional(),
    paidStatus: zEnum(TEMPLATE_PAID_STATUS, { message: 'Invalid paid status' }).optional(),
  }).parse)

  const filters = [
    eq(tables.templates.creatorId, user.user.id),
  ]

  if (query.status) {
    filters.push(eq(tables.templates.status, query.status))
  }

  if (query.paidStatus) {
    filters.push(eq(tables.templates.paidStatus, query.paidStatus))
  }

  const where = and(...filters)

  const templates = await useDrizzle().query.templates.findMany({
    where,
    offset: getOffset(query),
    limit: query.limit,
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

  const [{ total }] = await useDrizzle().select({ total: count() }).from(tables.templates).where(where).execute()

  return getPagination(templates, {
    total,
    limit: query.limit,
    page: query.page,
  })
})

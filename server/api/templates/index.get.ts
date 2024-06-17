import { array, number, object, string, enum as zEnum } from 'zod'
import { ORDER, TEMPLATE_PAID_STATUS, TEMPLATE_STATUS } from '~/utils/constants'
import { listTemplates } from '~/utils'

export default defineEventHandler(async (event) => {
  await authorize(event, listTemplates)

  const query = await getValidatedQuery(event, object({
    limit: number({ coerce: true }).default(10),
    page: number({ coerce: true }).default(1),
    order: zEnum(ORDER, { message: 'Invalid order' }).optional(),
    orderBy: string().optional(),
    status: zEnum(TEMPLATE_STATUS, { message: 'Invalid status' }).optional(),
    paidStatus: zEnum(TEMPLATE_PAID_STATUS, { message: 'Invalid paid status' }).optional(),
    categoryId: number({ coerce: true }).optional(),
    search: string().optional(),
    creator: number({ coerce: true }).optional(),
    fields: array(string()).optional(),
  }).parse)

  const { user } = await getUserSession(event)

  const filters = []

  // If the user is not an admin, only show validated templates
  if ((!user || user.roleType !== 'admin') && query.status !== 'validated') {
    filters.push(eq(tables.templates.status, 'validated'))
  }
  else if (query.status) {
    filters.push(eq(tables.templates.status, query.status))
  }

  if (query.paidStatus) {
    filters.push(eq(tables.templates.paidStatus, query.paidStatus))
  }

  if (query.categoryId) {
    filters.push(eq(tables.templates.categoryId, query.categoryId))
  }

  if (query.creator) {
    filters.push(eq(tables.templates.creatorId, query.creator))
  }

  if (query.search) {
    filters.push(or(
      like(tables.templates.title, `%${query.search}%`),
      like(tables.templates.shortDescription, `%${query.search}%`),
    ))
  }

  const where = and(...filters)

  const orderBy = query.orderBy
    ? (query.order === 'asc'
        ? asc(tables.templates[query.orderBy as keyof Template])
        : desc(tables.templates[query.orderBy as keyof Template]))
    : undefined

  function allowField(field: string) {
    if (!user) return false
    if (user.roleType !== 'admin') return false

    // User is an admin
    if (query.fields?.includes(field)) {
      return true
    }

    return false
  }

  const templates = await useDrizzle().query.templates.findMany({
    limit: query.limit,
    offset: getOffset(query),
    orderBy,
    where,
    columns: {
      id: true,
      slug: true,
      hash: true,
      featuredImage: true,
      title: true,
      status: true,
      paidStatus: true,
      accessUrl: true,
      liveUrl: true,
      shortDescription: true,
      description: false,
      updatedAt: allowField('updatedAt'),
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
          email: allowField('creator.email'),
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

  const [{ total }] = await useDrizzle().select({ total: count() }).from(tables.templates).where(where).execute()

  return getPagination(templates, {
    total,
    ...query,
  })
})

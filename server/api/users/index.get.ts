import { number, object, string, enum as zEnum } from 'zod'
import { getPaginationMeta } from '~/server/utils/pagination'
import { ORDER, USER_ROLE_TYPE } from '~/utils/constants'

export default defineEventHandler(async (event) => {
  await authorize(event, listUsers)

  const query = await getValidatedQuery(event, object({
    limit: number({ coerce: true }).default(10),
    page: number({ coerce: true }).default(1),
    order: zEnum(ORDER, { message: 'Invalid order' }).optional(),
    orderBy: string().optional(),
    roleType: zEnum(USER_ROLE_TYPE, { message: 'Invalid role type' }).optional(),
    search: string().optional(),
  }).parse)

  const filters = []

  if (query.roleType) {
    filters.push(eq(tables.users.roleType, query.roleType))
  }

  if (query.search) {
    filters.push(or(
      like(tables.users.name, `%${query.search}%`),
      like(tables.users.login, `%${query.search}%`),
      like(tables.users.email, `%${query.search}%`),
    ))
  }

  const where = and(...filters)

  const dbQuery = useDrizzle().select({
    id: tables.users.id,
    githubId: tables.users.githubId,
    avatarUrl: tables.users.avatarUrl,
    login: tables.users.login,
    email: tables.users.email,
    name: tables.users.name,
    roleType: tables.users.roleType,
  }).from(tables.users)
    .where(where)
    .limit(query.limit)
    .offset(getOffset(query))

  if (query.order === 'asc') {
    dbQuery.orderBy(asc(tables.users[query.orderBy as keyof User ?? tables.users.createdAt]))
  }
  else {
    dbQuery.orderBy(desc(tables.users[query.orderBy as keyof User ?? tables.users.createdAt]))
  }

  const users = await dbQuery

  const meta = await useDrizzle().select({ count: count() }).from(tables.users).where(where).execute()

  return getPagination(users, getPaginationMeta({ total: meta[0].count, ...query }))
})

import { number, object } from 'zod'
import { getPaginationMeta } from '~/server/utils/pagination'

export default defineEventHandler(async (event) => {
  await authorize(event, listUsers)

  const query = await getValidatedQuery(event, object({
    limit: number({ coerce: true }).default(10),
    page: number({ coerce: true }).default(1),
  }).parse)

  const users = await useDrizzle().select({
    id: tables.users.id,
    githubId: tables.users.githubId,
    avatarUrl: tables.users.avatarUrl,
    login: tables.users.login,
    email: tables.users.email,
    name: tables.users.name,
    roleType: tables.users.roleType,
  }).from(tables.users)
    .limit(query.limit)
    .offset(getOffset(query))

  const meta = await useDrizzle().select({ count: count() }).from(tables.users)

  return getPagination(users, getPaginationMeta({ total: meta[0].count, ...query }))
})

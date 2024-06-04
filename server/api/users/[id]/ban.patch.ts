import { number, object } from 'zod'

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const params = await getValidatedRouterParams(event, object({
    id: number({ coerce: true }),
  }).parse)

  await useDrizzle().update(tables.users)
    .set({ roleType: 'banned' })
    .where(eq(tables.users.id, params.id))

  return sendNoContent(event, 204)
})

import { number, object } from 'zod'

export default defineEventHandler(async (event) => {
  await authorize(event, unbanUser)

  const params = await getValidatedRouterParams(event, object({
    id: number({ coerce: true }),
  }).parse)

  await useDrizzle().update(tables.users)
    .set({ roleType: 'creator' })
    .where(eq(tables.users.id, params.id))

  return sendNoContent(event, 204)
})

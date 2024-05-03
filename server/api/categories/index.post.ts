export default defineEventHandler(async (event) => {
  // TODO: only for user admin

  const body = await readBody(event)

  // TODO: validate body

  // TODO: handle db error (send to client)
  await useDrizzle().insert(tables.categories).values({
    slug: useSlugify(body.name),
    name: body.name,
  }).execute()

  return body
})

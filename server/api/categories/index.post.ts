export default defineEventHandler(async (event) => {
  // TODO: only for user admin

  const body = await readBody(event)

  // TODO: validate body

  // TODO: Return the DB error to the client (actually, it's just a 500 error handle by Nitro)
  await useDrizzle().insert(tables.categories).values({
      slug: useSlugify(body.name),
      name: body.name,
    }).execute()

  return sendNoContent(event, 201)
})

import { object, string } from "zod"

export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const body = await readValidatedBody(event, object({
    name: string()
  }).parse)

  // TODO: Return the DB error to the client (actually, it's just a 500 error handle by Nitro)
  await useDrizzle().insert(tables.categories).values({
      slug: useSlugify(body.name),
      name: body.name,
    }).execute()

  return sendNoContent(event, 201)
})

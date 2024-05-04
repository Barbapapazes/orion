export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const users = await useDrizzle().select({
    id: tables.users.id,
    githubId: tables.users.githubId,
    username: tables.users.username,
    roleType: tables.users.roleType
  }).from(tables.users)

  return users
})

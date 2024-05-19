export default defineEventHandler(async (event) => {
  await requireAdminUser(event)

  const users = await useDrizzle().select({
    id: tables.users.id,
    githubId: tables.users.githubId,
    avatarUrl: tables.users.avatarUrl,
    login: tables.users.login,
    email: tables.users.email,
    name: tables.users.name,
    roleType: tables.users.roleType
  }).from(tables.users)

  return users
})

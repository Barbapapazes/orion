import type { User } from '~/server/utils/drizzle'

export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, result) {
    const { user: ghUser } = result

    const githubId = ghUser.id

    let user: User | undefined

    user = await useDrizzle().select().from(tables.users).where(eq(tables.users.githubId, githubId)).get()

    if (user?.roleType === 'banned') {
      throw createError({
        status: 403,
        message: 'Your cannot access to the application.',
      })
    }

    /**
     * If the user is not in the database or their data has changed, update the user data.
     * A write is more expensive than a read, so we only write if necessary.
     */
    if (!user || userDataChanged(user, ghUser)) {
      user = await useDrizzle().insert(tables.users).values({
        githubId,
        login: ghUser.login,
        email: ghUser.email,
        name: ghUser.name,
        avatarUrl: ghUser.avatar_url,
      })
        .onConflictDoUpdate({
          target: tables.users.githubId,
          set: {
            login: ghUser.login,
            email: ghUser.email,
            name: ghUser.name,
            avatarUrl: ghUser.avatar_url,
          },
        })
        .returning().get()
    }

    await setUserSession(event, {
      user: {
        id: user.id!,
        login: ghUser.login,
        email: ghUser.email,
        name: ghUser.name,
        avatarUrl: ghUser.avatar_url,
        roleType: user.roleType || 'creator',
      },
    })

    return sendRedirect(event, '/profile')
  },
})

interface GitHubUser {
  id: number
  login: string
  email: string
  name: string
  avatar_url: string
}

function userDataChanged(user: User, ghUser: GitHubUser) {
  return user.login !== ghUser.login
    || user.email !== ghUser.email
    || user.name !== ghUser.name
    || user.avatarUrl !== ghUser.avatar_url
}

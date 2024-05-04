export default oauth.githubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user, tokens }) {
    const savedUser = await useDrizzle()
      .insert(tables.users)
      .values({
        githubId: user.id,
        username: user.login,
        avatarUrl: user.avatar_url,
      })
      .onConflictDoUpdate({
        target: tables.users.githubId,
        set: { username: user.login, avatarUrl: user.avatar_url },
      }).returning().get();

    await setUserSession(event, {
      user: {
        githubId: savedUser.githubId,
        username: savedUser.username,
        avatarUrl: savedUser.avatarUrl,
        roleType: savedUser.roleType,
      },
    });

    return sendRedirect(event, "/");
  },
});

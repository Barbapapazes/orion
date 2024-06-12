export default defineNitroPlugin((nitroApp) => {
  nitroApp.$authorization = {
    resolveServerUser: async (event) => {
      const session = await getUserSession(event)
      return session.user ?? null
    },
  }
})

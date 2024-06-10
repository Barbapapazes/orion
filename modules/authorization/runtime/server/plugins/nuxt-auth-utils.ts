import { defineNitroPlugin, getUserSession } from '#imports'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.$authorization = {
    resolveServerUser: getUserSession,
  }
})

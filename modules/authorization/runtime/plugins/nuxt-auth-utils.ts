import { defineNuxtPlugin } from '#app'
import { useUserSession } from '#imports'

export default defineNuxtPlugin({
  name: 'authorization-nuxt-auth-utils',
  parallel: true,
  setup() {
    return {
      provide: {
        authorization: {
          resolveClientUser: useUserSession,
        },
      },
    }
  },
})

import type { User } from '../src/types'

declare module '#app' {
  interface NuxtApp {
    $authorization: {
      resolveClientUser: () => Promise<User | null>
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $authorization: {
      resolveClientUser: () => Promise<User | null>
    }
  }
}

export {}

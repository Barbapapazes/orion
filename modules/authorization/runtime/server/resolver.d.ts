import type { H3Event } from 'h3'
import type { User } from '../../src/types'

declare module 'nitropack' {
  interface NitroApp {
    $authorization: {
      resolveServerUser: (event: H3Event) => Promise<User | null>
    }
  }
}

export {}

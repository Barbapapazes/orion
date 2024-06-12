import type { ROLE_TYPE } from './utils/constants'

declare module '#auth-utils' {
  interface User {
    id: number
    login: string
    email: string
    name: string
    avatarUrl: string
    roleType: typeof ROLE_TYPE[number]
  }

  interface UserSession {
    // Add your own fields
  }
}

export {}

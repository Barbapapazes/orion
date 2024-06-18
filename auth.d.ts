import type { UserRoleType } from '~/types'

declare module '#auth-utils' {
  interface User {
    id: number
    login: string
    email: string
    name: string
    avatarUrl: string
    roleType: UserRoleType
  }

  interface UserSession {
    // Add your own fields
  }
}

export {}

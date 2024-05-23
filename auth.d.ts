// auth.d.ts
declare module '#auth-utils' {
  interface User {
    id: number
    login: string
    email: string
    name: string
    avatarUrl: string
    roleType: 'admin' | 'creator'
  }

  interface UserSession {
    // Add your own fields
  }
}

export {}

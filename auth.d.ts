// auth.d.ts
declare module "#auth-utils" {
  interface User {
    githubId: number;
    username: string;
    avatarUrl: string;
    roleType: 'admin' | 'creator'
  }

  interface UserSession {
    // Add your own fields
  }
}

export {};

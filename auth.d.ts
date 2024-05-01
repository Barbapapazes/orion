// auth.d.ts
declare module "#auth-utils" {
  interface User {
    githubId: string;
    username: string;
    avatarUrl: string;
  }

  interface UserSession {
    // Add your own fields
  }
}

export {};

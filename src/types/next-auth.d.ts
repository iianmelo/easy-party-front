import 'next-auth';

declare module 'next-auth' {
  interface User {
    demo?: boolean;
    role?: string;
  }

  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      demo?: boolean;
      role?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      demo?: boolean;
      role?: string;
    };
  }
}

import NextAuth from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    hashedPassword: string | null;
    image: string | null;
    familyName: string;
    money: number;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    // add other custom fields if needed
    codes: string[];
    hints: string[];
    disadventages: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User
    // add other custom fields if needed
  }
}

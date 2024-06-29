import { Role } from "@prisma/client";

export default interface User {
    id: string;
    name: string;
    email: string | null;
    emailVerified: Date | null;
    hashedPassword: string | null;
    image: string | null;
    familyName: string;
    money: number;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    // add other custom fields if needed
  }

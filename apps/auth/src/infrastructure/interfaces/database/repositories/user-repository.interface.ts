import type { User } from '@prisma/client';

export interface IAuthUserRepository {
  findByEmailAsync(email: string): Promise<User | undefined>;
  findByUsernameAsync(username: string): Promise<User | undefined>;
  updateLastLogin(id: string): Promise<User>;
  updateRefreshTokenAsync(id: string, hashRefreshToken: string): Promise<User>;
}

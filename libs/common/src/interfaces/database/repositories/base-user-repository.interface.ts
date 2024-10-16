import type { Prisma, User } from '@prisma/client';

export interface IBaseUserRepository {
  findAllAsync(): Promise<User[]>;
  findByIdAsync(id: string): Promise<User>;
  createAsync(entity: Prisma.UserCreateInput): Promise<User>;
  updateAsync(entity: Prisma.UserUpdateInput, id: string): Promise<User>;
  deleteAsync(id: string): Promise<void>;
}

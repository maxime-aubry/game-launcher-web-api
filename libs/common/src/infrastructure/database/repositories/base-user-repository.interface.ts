import type { Prisma } from '@prisma/client';
import type { CreateUserEntity, UserEntity } from '../../../domain/entities';

export interface IBaseUserRepository {
  findAllAsync(): Promise<UserEntity[]>;
  findByIdAsync(id: string): Promise<UserEntity>;
  createAsync(entity: CreateUserEntity): Promise<UserEntity>;
  updateAsync(entity: Prisma.UserUpdateInput, id: string): Promise<UserEntity>;
  deleteAsync(id: string): Promise<void>;
}

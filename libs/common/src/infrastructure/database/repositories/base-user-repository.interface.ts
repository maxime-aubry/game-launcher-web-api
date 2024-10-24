import type { CreateUserEntity, UpdateUserEntity, UserEntity } from '../../../domain/entities';

export interface IBaseUserRepository {
  findAllAsync(): Promise<UserEntity[]>;
  findByIdAsync(id: string): Promise<UserEntity>;
  createAsync(entity: CreateUserEntity): Promise<UserEntity>;
  updateAsync(entity: UpdateUserEntity, id: string): Promise<UserEntity>;
  deleteAsync(id: string): Promise<void>;
}

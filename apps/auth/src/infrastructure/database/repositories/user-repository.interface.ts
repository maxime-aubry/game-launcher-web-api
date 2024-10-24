import type { UserEntity } from '@app/common/domain/entities';
import type { IBaseUserRepository } from '@app/common/infrastructure/database';

export interface IAuthUserRepository extends IBaseUserRepository {
  findByEmailAsync(email: string): Promise<UserEntity | null>;
  updateLastLogin(id: string): Promise<UserEntity>;
  updateRefreshTokenAsync(id: string, hashRefreshToken: string): Promise<UserEntity>;
}

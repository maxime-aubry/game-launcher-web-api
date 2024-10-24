import type { TokensBundle } from '@app/nestjs-microservices-tools/services/jwt';
import type { CreateUserModel, CreatedUserModel, UserModel } from 'apps/auth/src/domain/models';

export interface IUserService {
  checkInexistingUserWithEmailAsync(email: string): Promise<void>;
  findByIdAsync(id: string): Promise<UserModel>;
  findByEmailAsync(emailOrUsername: string): Promise<UserModel>;
  createUserWithLocalCredentialsAsync(user: CreateUserModel): Promise<CreatedUserModel>;
  actualizeRefreshToken(existingUser: UserModel, refreshToken: string): Promise<TokensBundle>;
  authenticateUser(existingUser: UserModel): Promise<TokensBundle>;
}

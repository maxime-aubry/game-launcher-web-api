import type { UserModel } from 'apps/auth/src/domain/models';
import type { ExistingUserDto, SignUpWithLocalCredentialsDto } from '../../dtos/local-auth';

export interface IUserService {
  checkInexistingUserAsync(email: string): Promise<void>;
  findByEmailOrUsernameAsync(emailOrUsername: string): Promise<UserModel>;
  createUserWithLocalCredentialsAsync(dto: SignUpWithLocalCredentialsDto): Promise<UserModel>;
  getExistingUser(existingUser: UserModel): ExistingUserDto;
}

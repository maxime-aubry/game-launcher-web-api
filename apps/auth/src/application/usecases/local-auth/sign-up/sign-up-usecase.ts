import { Exception } from '@app/nestjs-microservices-tools/exceptions';
import { type ILoggerService, LoggerService } from '@app/nestjs-microservices-tools/services/logger';
import { Inject } from '@nestjs/common';
import type { UserModel } from 'apps/auth/src/domain/models';
import type { ExistingUserDto, SignUpWithLocalCredentialsDto } from '../../../dtos/local-auth';
import { type IUserService, UserService } from '../../../services/user';
import type { ISignUpUseCase } from './sign-up-usecase.interface';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(LoggerService) private readonly loggerService: ILoggerService,
  ) {}

  public async executeAsync(request: SignUpWithLocalCredentialsDto): Promise<ExistingUserDto> {
    try {
      await this.userService.checkInexistingUserAsync(request.email);
      const userModel: UserModel = await this.userService.createUserWithLocalCredentialsAsync(request);
      return this.userService.getExistingUser(userModel);
    } catch (e) {
      if (e instanceof Exception) this.loggerService.error('SignUpUseCase', e.message, e.name);
      throw e;
    }
  }
}

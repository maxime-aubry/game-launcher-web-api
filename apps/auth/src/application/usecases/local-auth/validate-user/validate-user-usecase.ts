import { Exception } from '@app/nestjs-microservices-tools/exceptions';
import { type ILoggerService, LoggerService } from '@app/nestjs-microservices-tools/services/logger';
import { Inject } from '@nestjs/common';
import type { UserModel } from 'apps/auth/src/domain/models';
import type { ExistingUserDto, ValidateUserDto } from '../../../dtos/local-auth';
import { type ILocalCredentialsService, LocalCredentialsService } from '../../../services/local-credentials';
import { type IUserService, UserService } from '../../../services/user';
import type { IValidateUserUseCase } from './validate-user-usecase.interface';

export class ValidateUserUseCase implements IValidateUserUseCase {
  constructor(
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(LocalCredentialsService) private readonly localCredentialsService: ILocalCredentialsService,
    @Inject(LoggerService) private readonly loggerService: ILoggerService,
  ) {}

  public async executeAsync(request: ValidateUserDto): Promise<ExistingUserDto> {
    try {
      const userModel: UserModel = await this.userService.findByEmailOrUsernameAsync(request.emailOrUsername);
      this.localCredentialsService.checkCredentialsAsync(userModel.credentials.hashedPassword, request.password);
      return this.userService.getExistingUser(userModel);
    } catch (e) {
      if (e instanceof Exception) this.loggerService.error('ValidateUserUseCase', e.message, e.name);
      throw e;
    }
  }
}

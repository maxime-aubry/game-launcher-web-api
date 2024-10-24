import { type ILoggerService, LoggerService } from '@app/nestjs-microservices-tools/services/logger';
import { BadRequestException, Inject } from '@nestjs/common';
import type { UserModel } from 'apps/auth/src/domain/models';
import { type ILocalCredentialsService, LocalCredentialsService } from '../../../services/local-credentials';
import { type IUserService, UserService } from '../../../services/user';
import type { ValidateUserUseCaseRequestDto } from './validate-user-usecase-request.dto';
import { ValidateUserUseCaseResponseDto } from './validate-user-usecase-response.dto';
import type { IValidateUserUseCase } from './validate-user-usecase.interface';

export class ValidateUserUseCase implements IValidateUserUseCase {
  constructor(
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(LocalCredentialsService) private readonly localCredentialsService: ILocalCredentialsService,
    @Inject(LoggerService) private readonly loggerService: ILoggerService,
  ) {}

  public async executeAsync(request?: ValidateUserUseCaseRequestDto): Promise<ValidateUserUseCaseResponseDto> {
    try {
      if (!request) throw new BadRequestException('Email and password not provided.');
      const userModel: UserModel = await this.userService.findByEmailAsync(request.email);
      this.localCredentialsService.checkCredentialsAsync(userModel.credentials.hashedPassword, request.clearedPassword);
      const response: ValidateUserUseCaseResponseDto = new ValidateUserUseCaseResponseDto(
        userModel.id,
        userModel.email,
      );
      return response;
    } catch (e) {
      if (e instanceof Error) this.loggerService.error('ValidateUserUseCase', e.message, e.name);
      throw e;
    }
  }
}

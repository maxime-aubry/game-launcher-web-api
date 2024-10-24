import { type ILoggerService, LoggerService } from '@app/nestjs-microservices-tools/services/logger';
import { BadRequestException, Inject } from '@nestjs/common';
import { CreateUserModel, type CreatedUserModel, LocalCredentialsModel } from 'apps/auth/src/domain/models';
import { type IUserService, UserService } from '../../../services/user';
import type { SignUpUseCaseRequestDto } from './sign-up-usecase-request.dto';
import { SignUpUseCaseResponseDto } from './sign-up-usecase-response.dto';
import type { ISignUpUseCase } from './sign-up-usecase.interface';

export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(LoggerService) private readonly loggerService: ILoggerService,
  ) {}

  public async executeAsync(request?: SignUpUseCaseRequestDto): Promise<SignUpUseCaseResponseDto> {
    try {
      if (!request) throw new BadRequestException('Email and password not provided.');
      await this.userService.checkInexistingUserWithEmailAsync(request.email);
      const user: CreateUserModel = this.getUserToCreate(request);
      const createdUserModel: CreatedUserModel = await this.userService.createUserWithLocalCredentialsAsync(user);
      const { accessTokenCookie, refreshTokenCookie } = await this.userService.authenticateUser(createdUserModel);
      const response: SignUpUseCaseResponseDto = new SignUpUseCaseResponseDto(
        createdUserModel.id,
        createdUserModel.email,
        accessTokenCookie,
        refreshTokenCookie,
      );
      return response;
    } catch (e) {
      if (e instanceof Error) this.loggerService.error('SignUpUseCase', e.message, e.name);
      throw e;
    }
  }

  private getUserToCreate(request: SignUpUseCaseRequestDto): CreateUserModel {
    const credentials: LocalCredentialsModel = new LocalCredentialsModel(request.clearedPassword);
    const user: CreateUserModel = new CreateUserModel(request.email, credentials);
    return user;
  }
}

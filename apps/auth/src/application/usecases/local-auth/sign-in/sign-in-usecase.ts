import { type ILoggerService, LoggerService } from '@app/nestjs-microservices-tools/services/logger';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { UserModel } from 'apps/auth/src/domain/models';
import { type ILocalCredentialsService, LocalCredentialsService } from '../../../services/local-credentials';
import { type IUserService, UserService } from '../../../services/user';
import type { SignInUseCaseRequestDto } from './sign-in-usecase-request.dto';
import { SignInUseCaseResponseDto } from './sign-in-usecase-response.dto';
import type { ISignInUseCase } from './sign-in-usecase.interface';

@Injectable()
export class SignInUseCase implements ISignInUseCase {
  constructor(
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(LocalCredentialsService) private readonly localCredentialsService: ILocalCredentialsService,
    @Inject(LoggerService) private readonly loggerService: ILoggerService,
  ) {}

  public async executeAsync(request?: SignInUseCaseRequestDto): Promise<SignInUseCaseResponseDto> {
    try {
      if (!request) throw new BadRequestException('Email and password not provided.');

      const existingUser: UserModel = await this.userService.findByEmailAsync(request.email);
      await this.localCredentialsService.checkCredentialsAsync(
        existingUser.credentials.hashedPassword,
        request.clearedPassword,
      );
      const { accessTokenCookie, refreshTokenCookie } = await this.userService.authenticateUser(existingUser);
      const response: SignInUseCaseResponseDto = new SignInUseCaseResponseDto(
        existingUser.id,
        existingUser.email,
        accessTokenCookie,
        refreshTokenCookie,
      );
      return response;
    } catch (e) {
      if (e instanceof Error) this.loggerService.error('SignInUseCase', e.message, e.name);
      throw e;
    }
  }
}

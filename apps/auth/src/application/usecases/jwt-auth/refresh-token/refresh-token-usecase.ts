import { type ILoggerService, LoggerService } from '@app/nestjs-microservices-tools/services/logger';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserModel } from 'apps/auth/src/domain/models';
import { type IUserService, UserService } from '../../../services/user';
import type { RefreshTokenUseCaseRequestDto } from './refresh-token-usecase-request.dto';
import { RefreshTokenUseCaseResponseDto } from './refresh-token-usecase-response.dto';
import type { IRefreshTokenUseCase } from './refresh-token-usecase.interface';

@Injectable()
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(
    @Inject(UserService) private readonly userService: IUserService,
    @Inject(LoggerService) private readonly loggerService: ILoggerService,
  ) {}

  public async executeAsync(
    request?: RefreshTokenUseCaseRequestDto | undefined,
  ): Promise<RefreshTokenUseCaseResponseDto> {
    try {
      if (!request) throw new BadRequestException('User ID and Refresh Token are not provided.');
      const existingUser: UserModel = await this.userService.findByIdAsync(request.id);
      const { accessToken, refreshToken } = await this.userService.actualizeRefreshToken(existingUser, request.refreshToken);
      const response: RefreshTokenUseCaseResponseDto = new RefreshTokenUseCaseResponseDto(accessToken, refreshToken);
      return response;
    } catch (e) {
      if (e instanceof Error) this.loggerService.error('RefreshTokenUseCase', e.message, e.name);
      throw e;
    }
  }
}

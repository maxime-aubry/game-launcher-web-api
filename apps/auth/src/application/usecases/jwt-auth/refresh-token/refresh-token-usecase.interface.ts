import type { IUseCaseAsync } from '@app/nestjs-microservices-tools/usecases';
import type { RefreshTokenUseCaseRequestDto } from './refresh-token-usecase-request.dto';
import type { RefreshTokenUseCaseResponseDto } from './refresh-token-usecase-response.dto';

export interface IRefreshTokenUseCase
  extends IUseCaseAsync<RefreshTokenUseCaseRequestDto, RefreshTokenUseCaseResponseDto> {}

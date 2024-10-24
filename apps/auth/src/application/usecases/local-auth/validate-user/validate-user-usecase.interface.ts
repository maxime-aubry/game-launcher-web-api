import type { IUseCaseAsync } from '@app/nestjs-microservices-tools/usecases';
import type { ValidateUserUseCaseRequestDto } from './validate-user-usecase-request.dto';
import type { ValidateUserUseCaseResponseDto } from './validate-user-usecase-response.dto';

export interface IValidateUserUseCase
  extends IUseCaseAsync<ValidateUserUseCaseRequestDto, ValidateUserUseCaseResponseDto> {}

import type { IUseCaseAsync } from '@app/nestjs-microservices-tools/usecases';
import type { SignUpUseCaseRequestDto } from './sign-up-usecase-request.dto';
import type { SignUpUseCaseResponseDto } from './sign-up-usecase-response.dto';

export interface ISignUpUseCase extends IUseCaseAsync<SignUpUseCaseRequestDto, SignUpUseCaseResponseDto> {}

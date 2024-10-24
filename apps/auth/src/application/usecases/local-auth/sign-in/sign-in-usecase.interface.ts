import type { IUseCaseAsync } from '@app/nestjs-microservices-tools/usecases';
import type { SignInUseCaseRequestDto } from './sign-in-usecase-request.dto';
import type { SignInUseCaseResponseDto } from './sign-in-usecase-response.dto';

export interface ISignInUseCase extends IUseCaseAsync<SignInUseCaseRequestDto, SignInUseCaseResponseDto> {}

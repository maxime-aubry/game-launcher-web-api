import type { IUseCase } from '@app/nestjs-microservices-tools/usecases';
import type { SignOutUseCaseResponseDto } from './sign-out-usecase-response.dto';

export interface ISignOutUseCase extends IUseCase<undefined, SignOutUseCaseResponseDto> {}

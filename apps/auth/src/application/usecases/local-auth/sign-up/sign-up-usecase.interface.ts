import type { IUseCaseAsync } from '@app/nestjs-microservices-tools/usecases';
import type { ExistingUserDto, SignUpWithLocalCredentialsDto } from '../../../dtos/local-auth';

export interface ISignUpUseCase extends IUseCaseAsync<SignUpWithLocalCredentialsDto, ExistingUserDto> {}

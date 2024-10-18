import type { IUseCaseAsync } from '@app/nestjs-microservices-tools/usecases';
import type { ExistingUserDto, ValidateUserDto } from '../../../dtos/local-auth';

export interface IValidateUserUseCase extends IUseCaseAsync<ValidateUserDto, ExistingUserDto> {}

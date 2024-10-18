import type { IUseCase } from '@app/nestjs-microservices-tools/usecases';
import type { SignOutCookiesDto } from '../../../dtos/common';

export interface ISignOutUseCase extends IUseCase<undefined, SignOutCookiesDto> {}

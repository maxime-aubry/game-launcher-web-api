import type { IPresenter } from '@app/nestjs-microservices-tools/presenters';
import type { ExistingUserDto, SignUpWithLocalCredentialsDto } from '../../../dtos/local-auth';

export interface ISignUpPresenter extends IPresenter<SignUpWithLocalCredentialsDto, ExistingUserDto> {}

import type { IPresenter } from '@app/nestjs-microservices-tools/presenters';
import type { UserModel } from 'apps/auth/src/domain/models';
import type { ExistingUserDto } from '../../../dtos/local-auth';

export interface IValidateUserPresenter extends IPresenter<UserModel, ExistingUserDto> {}

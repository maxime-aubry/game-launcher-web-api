import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { UserModel } from 'apps/auth/src/domain/models';
import { ExistingUserDto } from '../../../dtos/local-auth';
import type { IValidateUserPresenter } from './validate-user.presenter.interface';

export class ValidateUserPresenter implements IValidateUserPresenter {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  public getOutput(input: UserModel): ExistingUserDto {
    const output: ExistingUserDto = this.mapper.map(input, UserModel, ExistingUserDto);
    return output;
  }
}

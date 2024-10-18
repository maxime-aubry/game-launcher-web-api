import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ExistingUserDto, SignUpWithLocalCredentialsDto } from '../../../dtos/local-auth';
import type { ISignUpPresenter } from './sign-up.presenter.interface';

export class SignUpPresenter implements ISignUpPresenter {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  public getOutput(input: SignUpWithLocalCredentialsDto): ExistingUserDto {
    const output: ExistingUserDto = this.mapper.map(input, SignUpWithLocalCredentialsDto, ExistingUserDto);
    return output;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  type IValidateUserUseCase,
  ValidateUserUseCase,
  ValidateUserUseCaseRequestDto,
  type ValidateUserUseCaseResponseDto,
} from 'apps/auth/src/application/usecases/local-auth/validate-user';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(ValidateUserUseCase) private readonly validateUserUseCase: IValidateUserUseCase) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(email: string, password: string): Promise<ValidateUserUseCaseResponseDto> {
    const request: ValidateUserUseCaseRequestDto = new ValidateUserUseCaseRequestDto(email, password);
    return await this.validateUserUseCase.executeAsync(request);
  }
}

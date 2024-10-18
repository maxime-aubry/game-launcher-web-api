import { Injectable } from '@nestjs/common';
import { SignOutCookiesDto } from '../../../dtos/common';
import type { ISignOutUseCase } from './sign-out-usecase.interface';

@Injectable()
export class SignOutUseCase implements ISignOutUseCase {
  public execute(): SignOutCookiesDto {
    const response: SignOutCookiesDto = new SignOutCookiesDto([
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ]);
    return response;
  }
}

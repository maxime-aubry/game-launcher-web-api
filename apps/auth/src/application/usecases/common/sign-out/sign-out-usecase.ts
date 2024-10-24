import { Injectable } from '@nestjs/common';
import { SignOutUseCaseResponseDto } from './sign-out-usecase-response.dto';
import type { ISignOutUseCase } from './sign-out-usecase.interface';

@Injectable()
export class SignOutUseCase implements ISignOutUseCase {
  public execute(): SignOutUseCaseResponseDto {
    const response: SignOutUseCaseResponseDto = new SignOutUseCaseResponseDto([
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ]);
    return response;
  }
}

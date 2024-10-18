import { HashService, type IHashService } from '@app/nestjs-microservices-tools/services/hash';
import { Inject } from '@nestjs/common';
import { LocalCredentialsException } from '../../exceptions';
import type { ILocalCredentialsService } from './local-credentials.interface';

export class LocalCredentialsService implements ILocalCredentialsService {
  constructor(@Inject(HashService) private readonly hashService: IHashService) {}

  public async generateCredentialsAsync(clearedPassword: string): Promise<string> {
    return await this.hashService.hashAsync(clearedPassword);
  }

  public async checkCredentialsAsync(hashedPassword: string, clearedPassword: string): Promise<void> {
    const doesPasswordMatch: boolean = await this.hashService.compareAsync(clearedPassword, hashedPassword);
    if (!doesPasswordMatch) throw new LocalCredentialsException('Invalid password.');
  }
}

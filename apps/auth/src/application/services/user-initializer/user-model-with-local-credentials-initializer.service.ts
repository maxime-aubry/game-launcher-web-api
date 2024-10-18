import { Inject, Injectable } from '@nestjs/common';
import { CreateUserModel, LocalCredentialsModel } from 'apps/auth/src/domain/models';
import type { SignUpWithLocalCredentialsDto } from '../../dtos/local-auth';
import { type ILocalCredentialsService, LocalCredentialsService } from '../local-credentials';
import type { IUserModelInitializer } from './user-model-initializer.interface';

@Injectable()
export class UserModelWithLocalCredentialsInitializer
  implements IUserModelInitializer<SignUpWithLocalCredentialsDto, CreateUserModel>
{
  constructor(@Inject(LocalCredentialsService) private readonly localCredentialsService: ILocalCredentialsService) {}

  public async initializeAsync(dto: SignUpWithLocalCredentialsDto): Promise<CreateUserModel> {
    const hashedPassword: string = await this.localCredentialsService.generateCredentialsAsync(dto.password);
    const credentialsModel: LocalCredentialsModel = new LocalCredentialsModel(hashedPassword);
    const createUserModel: CreateUserModel = new CreateUserModel(dto.email, credentialsModel);
    return createUserModel;
  }
}

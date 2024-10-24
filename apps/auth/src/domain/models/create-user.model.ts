import { CreateUserEntity } from '@app/common/domain/entities';
import { AutoMap } from '@automapper/classes';
import type { InputJsonValue } from '@prisma/client/runtime/library';
import type { LocalCredentialsModel } from './local-credentials.model';

export class CreateUserModel {
  constructor(email: string, credentials: LocalCredentialsModel) {
    this.email = email;
    this.credentials = credentials;
  }

  @AutoMap()
  public email: string;

  @AutoMap()
  public credentials: LocalCredentialsModel;

  public toCreateUserEntity(): CreateUserEntity {
    const credentials: InputJsonValue = this.credentials.toJsonInputValue();
    const createUserEntity: CreateUserEntity = new CreateUserEntity(this.email, credentials);
    return createUserEntity;
  }
}

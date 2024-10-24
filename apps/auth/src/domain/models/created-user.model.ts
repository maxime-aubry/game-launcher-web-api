import { AutoMap } from '@automapper/classes';
import type { LocalCredentialsModel } from './local-credentials.model';

export class CreatedUserModel {
  constructor(id: string, email: string, credentials: LocalCredentialsModel) {
    this.id = id;
    this.email = email;
    this.credentials = credentials;
  }

  @AutoMap()
  id: string;

  @AutoMap()
  email: string;

  @AutoMap()
  credentials: LocalCredentialsModel;
}

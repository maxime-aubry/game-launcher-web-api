import { AutoMap } from '@automapper/classes';
import { CreatedUserModel } from './created-user.model';
import type { LocalCredentialsModel } from './local-credentials.model';

export class UserModel extends CreatedUserModel {
  constructor(
    id: string,
    firstname: string | null,
    lastname: string | null,
    email: string,
    username: string | null,
    refreshToken: string | null,
    credentials: LocalCredentialsModel,
  ) {
    super(id, email, credentials);
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.refreshToken = refreshToken;
  }

  @AutoMap()
  firstname?: string | null;

  @AutoMap()
  lastname?: string | null;

  @AutoMap()
  username?: string | null;

  refreshToken?: string | null;
}

import type { LocalCredentialsModel } from './local-credentials.model';

export class CreateUserModel {
  constructor(email: string, credentials: LocalCredentialsModel) {
    this.email = email;
    this.credentials = credentials;
  }

  public email: string;
  public credentials: LocalCredentialsModel;
}

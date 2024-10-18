import { CredentialsModel } from './credentials.model';

export class LocalCredentialsModel extends CredentialsModel {
  constructor(hashedPassword: string) {
    super('local');
    this.hashedPassword = hashedPassword;
  }

  public hashedPassword: string;
}

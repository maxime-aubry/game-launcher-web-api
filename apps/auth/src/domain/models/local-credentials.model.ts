import type { InputJsonValue } from '@prisma/client/runtime/library';
import { CredentialsModel } from './credentials.model';

export class LocalCredentialsModel extends CredentialsModel {
  constructor(hashedPassword: string) {
    super('local');
    this.hashedPassword = hashedPassword;
  }

  public hashedPassword: string;

  public toJsonInputValue(): InputJsonValue {
    return this as object as InputJsonValue;
  }
}

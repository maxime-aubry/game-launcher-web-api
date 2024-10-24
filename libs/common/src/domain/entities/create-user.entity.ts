import { AutoMap } from '@automapper/classes';
import type { Prisma } from '@prisma/client';

export class CreateUserEntity implements Prisma.UserCreateInput {
  constructor(email: string, credentials: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue) {
    this.email = email;
    this.credentials = credentials;
  }

  @AutoMap()
  email: string;

  @AutoMap()
  credentials: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;
}

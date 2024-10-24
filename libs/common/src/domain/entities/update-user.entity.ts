import { AutoMap } from '@automapper/classes';
import type { Prisma } from '@prisma/client';

export class UpdateUserEntity implements Prisma.UserUpdateInput {
  constructor(
    firstname: string | null | undefined,
    lastname: string | null | undefined,
    email: string | undefined,
    username: string | null | undefined,
    hashRefreshToken: string | null | undefined,
    credentials: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue | undefined,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.hashRefreshToken = hashRefreshToken;
    this.credentials = credentials;
  }

  @AutoMap()
  firstname?: string | null | undefined;

  @AutoMap()
  lastname?: string | null | undefined;

  @AutoMap()
  email?: string;

  @AutoMap()
  username?: string | null | undefined;

  @AutoMap()
  hashRefreshToken?: string | null | undefined;

  @AutoMap()
  credentials?: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;
}

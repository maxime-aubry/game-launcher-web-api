import { AutoMap } from '@automapper/classes';
import type { Prisma } from '@prisma/client';

export class CreateUserEntity implements Prisma.UserCreateInput {
  constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    lastLogin: Date,
    hashRefreshToken: string,
    credentials: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.lastLogin = lastLogin;
    this.hashRefreshToken = hashRefreshToken;
    this.credentials = credentials;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @AutoMap()
  id: string;

  @AutoMap()
  firstname: string;

  @AutoMap()
  lastname: string;

  @AutoMap()
  email: string;

  @AutoMap()
  username: string;

  @AutoMap()
  lastLogin: Date;

  @AutoMap()
  hashRefreshToken: string;

  @AutoMap()
  credentials: Prisma.NullTypes.JsonNull | Prisma.InputJsonValue;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}

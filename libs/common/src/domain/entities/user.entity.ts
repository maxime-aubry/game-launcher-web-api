import { AutoMap } from '@automapper/classes';
import type { User } from '@prisma/client';
import type { JsonValue } from '@prisma/client/runtime/library';

export class UserEntity implements User {
  constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    lastLogin: Date,
    hashRefreshToken: string,
    credentials: JsonValue,
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
  credentials: JsonValue;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}

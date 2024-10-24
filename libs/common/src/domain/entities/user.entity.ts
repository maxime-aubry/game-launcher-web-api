import { AutoMap } from '@automapper/classes';
import type { User } from '@prisma/client';
import type { JsonValue } from '@prisma/client/runtime/library';

export class UserEntity implements User {
  constructor(
    id: string,
    firstname: null,
    lastname: string | null,
    email: string,
    username: string | null,
    lastLogin: Date | null,
    hashRefreshToken: string | null,
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
  firstname: string | null;

  @AutoMap()
  lastname: string | null;
  email: string;

  @AutoMap()
  username: string | null;

  @AutoMap()
  lastLogin: Date | null;

  @AutoMap()
  hashRefreshToken: string | null;

  @AutoMap()
  credentials: JsonValue;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}
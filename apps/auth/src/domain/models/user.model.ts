import { AutoMap } from '@automapper/classes';
import type { LocalCredentialsModel } from './local-credentials.model';

export class UserModel {
  constructor(
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    credentials: LocalCredentialsModel,
    lastLogin: Date,
    hashRefreshToken: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.credentials = credentials;
    this.lastLogin = lastLogin;
    this.hashRefreshToken = hashRefreshToken;
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
  credentials: LocalCredentialsModel;

  @AutoMap()
  lastLogin: Date;

  @AutoMap()
  hashRefreshToken: string;

  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;
}

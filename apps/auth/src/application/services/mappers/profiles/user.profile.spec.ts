import { beforeEach, describe, expect, it } from 'bun:test';
import { UserEntity } from '@app/common/domain/entities';
import { classes } from '@automapper/classes';
import { type Mapper, createMapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Test, type TestingModule } from '@nestjs/testing';
import { UserWithPassword } from 'apps/auth/src/application/dtos';
import { LocalCredentialsModel } from 'apps/auth/src/domain/models/local-credentials.model';
import { AuthMappersModule } from '../auth-mappers.module';
import { UserProfile } from './user.profile';

describe('UserProfile', () => {
  let mapper: Mapper;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthMappersModule],
      providers: [
        {
          provide: getMapperToken(),
          useValue: createMapper({
            strategyInitializer: classes(),
          }),
        },
        UserProfile,
      ],
    }).compile();
    mapper = app.get<Mapper>(getMapperToken());
  });

  it('should map a user with local credentials', () => {
    const credentials: LocalCredentialsModel = new LocalCredentialsModel('hashedPassword');
    const source: UserEntity = new UserEntity(
      'id',
      'firstname',
      'lastname',
      'email',
      'username',
      new Date(),
      'hashRefreshToken',
      credentials as object,
      new Date(),
      new Date(),
    );
    const dto: UserWithPassword = mapper.map(source, UserEntity, UserWithPassword);
    expect(dto.id).toEqual(source.id);
    expect(dto.firstname).toEqual(source.firstname);
    expect(dto.lastname).toEqual(source.lastname);
    expect(dto.email).toEqual(source.email);
    expect(dto.username).toEqual(source.username);
    expect(dto.hashedPassword).toEqual(credentials.hashedPassword);
    expect(dto.hashRefreshToken).toEqual(source.hashRefreshToken);
    expect(dto.createdAt).toEqual(source.createdAt);
    expect(dto.updatedAt).toEqual(source.updatedAt);
  });
});

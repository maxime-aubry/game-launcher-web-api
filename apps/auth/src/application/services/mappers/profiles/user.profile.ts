import { CreateUserEntity, UserEntity } from '@app/common/domain/entities';
import { type Converter, type Mapper, type MappingProfile, convertUsing, createMap, forMember } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import type { JsonValue } from '@prisma/client/runtime/library';
import { ExistingUserDto } from 'apps/auth/src/application/dtos/local-auth';
import { CreateUserModel, CredentialsModel, LocalCredentialsModel, UserModel } from 'apps/auth/src/domain/models';
import { plainToClass } from 'class-transformer';
import { AuthMapperException } from '../../../exceptions';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        UserEntity,
        UserModel,
        forMember(
          (destination) => destination.credentials,
          convertUsing(jsonValueToCredentialsConverter, (source) => source.credentials),
        ),
      );

      createMap(
        mapper,
        CreateUserModel,
        CreateUserEntity,
        forMember(
          (destination) => destination.credentials,
          convertUsing(credentialsToJsonValueConverter, (source) => source.credentials),
        ),
      );

      createMap(mapper, UserModel, ExistingUserDto);
    };
  }
}

export const jsonValueToCredentialsConverter: Converter<JsonValue, LocalCredentialsModel> = {
  convert(source: JsonValue): LocalCredentialsModel {
    const credentials: CredentialsModel = plainToClass(CredentialsModel, source);

    if (credentials.strategy === 'local') {
      const destination: LocalCredentialsModel = plainToClass(LocalCredentialsModel, source);
      return destination;
    }

    throw new AuthMapperException('Invalid credentials.');
  },
};

export const credentialsToJsonValueConverter: Converter<CredentialsModel, JsonValue> = {
  convert: (source: CredentialsModel): JsonValue => {
    const destination: JsonValue = source as object;
    return destination;
  },
};

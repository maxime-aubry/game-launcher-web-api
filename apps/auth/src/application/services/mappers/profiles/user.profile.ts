import { UserEntity } from '@app/common/domain/entities';
import { type Converter, type Mapper, type MappingProfile, convertUsing, createMap, forMember } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ExistingUserDto, SignUpWithLocalCredentialsDto } from 'apps/auth/src/application/dtos/local-auth';
import { CreateUserModel, CreatedUserModel, LocalCredentialsModel, UserModel } from 'apps/auth/src/domain/models';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        SignUpWithLocalCredentialsDto,
        CreateUserModel,
        forMember(
          (destination) => destination.credentials,
          convertUsing(clearedPasswordToLocalCredentialsConverter, (source) => source.password),
        ),
      );

      createMap(mapper, UserEntity, CreatedUserModel);
      createMap(mapper, UserModel, ExistingUserDto);
    };
  }
}

export const clearedPasswordToLocalCredentialsConverter: Converter<string, LocalCredentialsModel> = {
  convert: (source: string): LocalCredentialsModel => {
    const destination: LocalCredentialsModel = new LocalCredentialsModel(source);
    return destination;
  },
};

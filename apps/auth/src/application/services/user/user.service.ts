import { CreateUserEntity, UserEntity } from '@app/common/domain/entities';
import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserModel, UserModel } from 'apps/auth/src/domain/models';
import { AuthUserRepository, type IAuthUserRepository } from 'apps/auth/src/infrastructure/database';
import { ExistingUserDto, type SignUpWithLocalCredentialsDto } from '../../dtos/local-auth';
import { UserServiceException } from '../../exceptions';
import { type IUserModelInitializer, UserModelWithLocalCredentialsInitializer } from '../user-initializer';
import type { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(AuthUserRepository) private readonly authUserRepository: IAuthUserRepository,
    @Inject(UserModelWithLocalCredentialsInitializer)
    private readonly userModelWithLocalCredentialsInitializer: IUserModelInitializer<
      SignUpWithLocalCredentialsDto,
      CreateUserModel
    >,
    @InjectMapper() private readonly authMapper: Mapper,
  ) {}

  public async checkInexistingUserAsync(email: string): Promise<void> {
    const existingUserEntity: UserEntity | null = await this.authUserRepository.findByEmailAsync(email);
    if (existingUserEntity) throw new UserServiceException(`User with email "${email}" already exists.`);
  }

  public async findByEmailOrUsernameAsync(emailOrUsername: string): Promise<UserModel> {
    const existingUserEntity: UserEntity | null =
      await this.authUserRepository.findByEmailOrUsernameAsync(emailOrUsername);
    if (!existingUserEntity)
      throw new UserServiceException(`User with email or username "${emailOrUsername}" does not exist.`);
    const existingUserModel: UserModel = this.authMapper.map(existingUserEntity, UserEntity, UserModel);
    return existingUserModel;
  }

  public async createUserWithLocalCredentialsAsync(dto: SignUpWithLocalCredentialsDto): Promise<UserModel> {
    const createUserModel: CreateUserModel = await this.userModelWithLocalCredentialsInitializer.initializeAsync(dto);
    const createUserEntity: CreateUserEntity = this.authMapper.map(createUserModel, CreateUserModel, CreateUserEntity);
    const createdUserEntity: UserEntity = await this.authUserRepository.createAsync(createUserEntity);
    const createdUserModel: UserModel = this.authMapper.map(createdUserEntity, UserEntity, UserModel);
    return createdUserModel;
  }

  public getExistingUser(existingUser: UserModel): ExistingUserDto {
    const existingUserDto: ExistingUserDto = this.authMapper.map(existingUser, UserModel, ExistingUserDto);
    return existingUserDto;
  }
}

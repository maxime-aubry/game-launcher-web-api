import { type CreateUserEntity, UserEntity } from '@app/common/domain/entities';
import { JwtPayload, JwtService, type TokensBundle } from '@app/nestjs-microservices-tools/services/jwt';
import type { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { type CreateUserModel, CreatedUserModel, UserModel } from 'apps/auth/src/domain/models';
import { AuthUserRepository, type IAuthUserRepository } from 'apps/auth/src/infrastructure/database';
import type { IUserService } from './user.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(AuthUserRepository) private readonly userRepository: IAuthUserRepository,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @InjectMapper() private readonly authMapper: Mapper,
  ) {}

  public async checkInexistingUserWithEmailAsync(email: string): Promise<void> {
    const existingUserEntity: UserEntity | null = await this.userRepository.findByEmailAsync(email);
    if (existingUserEntity) throw new ForbiddenException(`Access Denied. User with email "${email}" already exists.`);
  }

  public async findByIdAsync(id: string): Promise<UserModel> {
    const existingUserEntity: UserEntity | null = await this.userRepository.findByIdAsync(id);
    if (!existingUserEntity) throw new ForbiddenException(`Access Denied. User with ID "${id}" does not exist.`);
    if (!existingUserEntity.hashRefreshToken) throw new ForbiddenException(`Access Denied. User with ID "${id}" does not have refresh token.`);
    const existingUserModel: UserModel = this.authMapper.map(existingUserEntity, UserEntity, UserModel);
    return existingUserModel;
  }

  public async findByEmailAsync(email: string): Promise<UserModel> {
    const existingUserEntity: UserEntity | null = await this.userRepository.findByEmailAsync(email);
    if (!existingUserEntity) throw new ForbiddenException(`Access Denied. User with email "${email}" does not exist.`);
    const existingUserModel: UserModel = this.authMapper.map(existingUserEntity, UserEntity, UserModel);
    return existingUserModel;
  }

  public async createUserWithLocalCredentialsAsync(user: CreateUserModel): Promise<CreatedUserModel> {
    const createUserEntity: CreateUserEntity = user.toCreateUserEntity();
    const createdUserEntity: UserEntity = await this.userRepository.createAsync(createUserEntity);
    const createdUserModel: CreatedUserModel = this.authMapper.map(createdUserEntity, UserEntity, CreatedUserModel);
    return createdUserModel;
  }

  public async actualizeRefreshToken(existingUser: UserModel, refreshToken: string): Promise<TokensBundle> {
    await this.verifyRefreshToken(refreshToken);
    const tokensBundle: TokensBundle = await this.authenticateUser(existingUser);
    return tokensBundle;
  }

  private async verifyRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.jwtService.checkRefreshTokenAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Access Denied. Refresh Token is not valid.');
    }
  }

  public async authenticateUser(existingUser: UserModel): Promise<TokensBundle> {
    const payload: JwtPayload = new JwtPayload(existingUser.id, existingUser.email);
    const tokensAndCookies: TokensBundle = this.jwtService.getTokensBundle(payload);
    await this.userRepository.updateRefreshTokenAsync(existingUser.id, tokensAndCookies.refreshToken);
    await this.userRepository.updateLastLogin(existingUser.id);
    return tokensAndCookies;
  }
}

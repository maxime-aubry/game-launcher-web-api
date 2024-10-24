import type { UserEntity } from '@app/common/domain/entities';
import { BaseUserRepository } from '@app/common/infrastructure/database';
import { PrismaService } from '@app/nestjs-microservices-tools/database';
import { Inject, Injectable } from '@nestjs/common';
import type { IAuthUserRepository } from './user-repository.interface';

@Injectable()
export class AuthUserRepository extends BaseUserRepository implements IAuthUserRepository {
  constructor(@Inject(PrismaService) protected readonly prisma: PrismaService) {
    super(prisma);
  }

  public async findByEmailAsync(email: string): Promise<UserEntity | null> {
    const user: UserEntity | null = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  public async updateLastLogin(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        lastLogin: new Date().toISOString(),
      },
    });
    return user;
  }

  public async updateRefreshTokenAsync(id: string, hashRefreshToken: string): Promise<UserEntity> {
    const user: UserEntity = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        hashRefreshToken,
      },
    });
    return user;
  }
}

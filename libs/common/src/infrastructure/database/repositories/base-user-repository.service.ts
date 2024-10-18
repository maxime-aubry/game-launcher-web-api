import type { PrismaService } from '@app/nestjs-microservices-tools/database';
import type { Prisma } from '@prisma/client';
import type { CreateUserEntity, UserEntity } from '../../../domain/entities';
import type { IBaseUserRepository } from './base-user-repository.interface';

export class BaseUserRepository implements IBaseUserRepository {
  constructor(protected readonly prisma: PrismaService) {}

  public async findAllAsync(): Promise<UserEntity[]> {
    const users: UserEntity[] = await this.prisma.user.findMany();
    return users;
  }

  public async findByIdAsync(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return user;
  }

  public async createAsync(entity: CreateUserEntity): Promise<UserEntity> {
    const user: UserEntity = await this.prisma.user.create({
      data: entity,
    });
    return user;
  }

  public async updateAsync(entity: Prisma.UserUpdateInput, id: string): Promise<UserEntity> {
    const user: UserEntity = await this.prisma.user.update({
      data: entity,
      where: {
        id,
      },
    });
    return user;
  }

  public async deleteAsync(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}

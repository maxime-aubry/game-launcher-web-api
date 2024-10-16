import type { IBaseUserRepository } from '@app/common/interfaces/database/repositories/base-user-repository.interface';
import type { Prisma, User } from '@prisma/client';
import type { PrismaService } from '../../../../nestjs-microservices-tools/src/database/prisma.service';

export class BaseUserRepository implements IBaseUserRepository {
  constructor(protected readonly prisma: PrismaService) {}

  public async findAllAsync(): Promise<User[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users;
  }

  public async findByIdAsync(id: string): Promise<User> {
    const user: User = await this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return user;
  }

  public async createAsync(entity: Prisma.UserCreateInput): Promise<User> {
    const user: User = await this.prisma.user.create({
      data: entity,
    });
    return user;
  }

  public async updateAsync(entity: Prisma.UserUpdateInput, id: string): Promise<User> {
    const user: User = await this.prisma.user.update({
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

import { BaseUserRepository } from '@app/common/database/repositories/base-user-repository.service';
import { Injectable } from '@nestjs/common';
import type { User } from '@prisma/client';
import type { IAuthUserRepository } from '../../interfaces/database/repositories/user-repository.interface';

@Injectable()
export class AuthUserRepository extends BaseUserRepository implements IAuthUserRepository {
  public async findByEmailAsync(email: string): Promise<User | undefined> {
    const user: User | undefined = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  public async findByUsernameAsync(username: string): Promise<User | undefined> {
    const user: User | undefined = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  }

  public async updateLastLogin(id: string): Promise<User> {
    const user: User = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        lastLogin: new Date().toISOString(),
      },
    });
    return user;
  }

  public async updateRefreshTokenAsync(id: string, hashRefreshToken: string): Promise<User> {
    const user: User = await this.prisma.user.update({
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

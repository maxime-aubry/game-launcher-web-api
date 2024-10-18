import { Module } from '@nestjs/common';
import { AuthMappersModule } from 'apps/auth/src/application/services/mappers';
import { AuthRepositoriesModule } from 'apps/auth/src/infrastructure/database';
import { UserService } from '.';
import { CreateUserModelInitializerModule } from '../user-initializer';

@Module({
  imports: [AuthRepositoriesModule, AuthMappersModule, CreateUserModelInitializerModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}

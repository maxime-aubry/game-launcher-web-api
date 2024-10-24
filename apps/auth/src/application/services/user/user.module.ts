import { JwtModule } from '@app/nestjs-microservices-tools/services/jwt';
import { Module } from '@nestjs/common';
import { AuthMappersModule } from 'apps/auth/src/application/services/mappers';
import { AuthRepositoriesModule } from 'apps/auth/src/infrastructure/database';
import { UserService } from '.';

@Module({
  imports: [AuthRepositoriesModule, AuthMappersModule, JwtModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserServiceModule {}

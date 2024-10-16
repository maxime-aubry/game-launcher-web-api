import { DatabaseModule } from '@app/nestjs-microservices-tools/database/database.module';
import { Module } from '@nestjs/common';
import { AuthUserRepository } from './repositories/user-repository.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthUserRepository],
  exports: [AuthUserRepository],
})
export class AuthRepositoriesModule {}

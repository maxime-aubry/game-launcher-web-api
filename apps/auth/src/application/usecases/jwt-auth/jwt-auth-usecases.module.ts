import { LoggerModule } from '@app/nestjs-microservices-tools/services/logger';
import { Module } from '@nestjs/common';
import { UserServiceModule } from '../../services/user';
import { RefreshTokenUseCase } from './refresh-token';

@Module({
  imports: [LoggerModule, UserServiceModule],
  exports: [RefreshTokenUseCase],
})
export class JwtAuthUseCasesModule {}

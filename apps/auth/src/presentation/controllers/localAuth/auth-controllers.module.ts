import { MessageQueueModule } from '@app/nestjs-microservices-tools/services/message-queue';
import { Module } from '@nestjs/common';
import { LocalAuthUseCasesModule } from 'apps/auth/src/application/usecases/local-auth';
import { LocalAuthController } from './local-auth.controller';
import { RegisterUserEndpoint } from './register-user.endpoint';

@Module({
  imports: [MessageQueueModule, LocalAuthUseCasesModule],
  controllers: [LocalAuthController, RegisterUserEndpoint],
})
export class AuthControllersModule {}

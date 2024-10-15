import {
  EnvironmentConfigModule,
  MessageQueueModule,
  MicroserviceInitializerModule,
} from '@app/nestjs-microservices-tools';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [EnvironmentConfigModule, MicroserviceInitializerModule, MessageQueueModule],
  controllers: [AuthController],
})
export class AuthModule {}

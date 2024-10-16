import { MessageQueueModule } from '@app/nestjs-microservices-tools';
import { Module } from '@nestjs/common';
import { LocalAuthController } from './controllers/localAuth/local-auth.controller';

@Module({
  imports: [MessageQueueModule],
  controllers: [LocalAuthController],
})
export class AuthControllersModule {}
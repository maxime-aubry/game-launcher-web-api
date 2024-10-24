import { MessageQueueModule } from '@app/nestjs-microservices-tools/services/message-queue';
import { Module } from '@nestjs/common';

@Module({
  imports: [MessageQueueModule],
  controllers: [],
})
export class JwtControllersModule {}

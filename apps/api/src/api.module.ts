import { ApiGatewayInitializerModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';

@Module({
  imports: [ApiGatewayInitializerModule.registerRmq('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE)],
  controllers: [ApiController],
})
export class ApiModule {}

import {
  ApiGatewayInitializerService,
  type IApiGatewayInitializerService,
} from '@app/nestjs-microservices-tools/config/api-gateway-initializer';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(ApiModule);
  const apiGatewayInitilizer: IApiGatewayInitializerService = app.get(ApiGatewayInitializerService);
  await apiGatewayInitilizer.initializeAsync(app, 5000);
}

bootstrap();

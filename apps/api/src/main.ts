import { ApiGatewayInitializerService } from '@app/nestjs-microservices-tools/config/api-gateway-initializer/api-gateway-initializer.service';
import type { IApiGatewayInitializerService } from '@app/nestjs-microservices-tools/interfaces/config/api-gateway-initializer/api-gateway-initializer.service.interface';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(ApiModule);
  const apiGatewayInitilizer: IApiGatewayInitializerService = app.get(ApiGatewayInitializerService);
  await apiGatewayInitilizer.initializeAsync(app, 5000);
}

bootstrap();

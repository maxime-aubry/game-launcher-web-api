import { EnvironmentConfigService } from '@app/nestjs-microservices-tools/config/environment-config/environment-config.service';
import { MicroserviceInitializerService } from '@app/nestjs-microservices-tools/config/microservice-initializer/microservice-initializer.service';
import type { IMessageQueueConfiguration } from '@app/nestjs-microservices-tools/interfaces/config/environment-config/message-queue-config.service.interface';
import type { IMicroserviceInitializerService } from '@app/nestjs-microservices-tools/interfaces/config/microservice-initializer/microservice-initializer.service.interface';
import type { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app: INestApplication<any> = await NestFactory.create(AuthModule);
  const microserviceInitializer: IMicroserviceInitializerService = app.get(MicroserviceInitializerService);
  await microserviceInitializer.initializeAsync(app, getQueue(app));
}

const getQueue = (app: INestApplication<any>): string => {
  const messageQueueConfig: IMessageQueueConfiguration = app.get(EnvironmentConfigService);
  const queue: string = messageQueueConfig.getMessageQueueAuthQueue();
  return queue;
};

bootstrap();

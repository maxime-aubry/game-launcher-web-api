import {
  EnvironmentConfigModule,
  MicroserviceInitializerModule,
} from '@app/nestjs-microservices-tools';
import { Module } from '@nestjs/common';
import { AuthControllersModule } from './presentation/auth-controllers.module';

@Module({
  imports: [EnvironmentConfigModule, AuthControllersModule, MicroserviceInitializerModule],
})
export class AuthModule {}

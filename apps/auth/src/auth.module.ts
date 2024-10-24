import { EnvironmentConfigModule } from '@app/nestjs-microservices-tools/config/environment-config';
import { MicroserviceInitializerModule } from '@app/nestjs-microservices-tools/config/microservice-initializer';
import { Module } from '@nestjs/common';
import { AuthControllersModule } from './presentation/endpoints/localAuth/auth-controllers.module';

@Module({
  imports: [EnvironmentConfigModule, AuthControllersModule, MicroserviceInitializerModule],
})
export class AuthModule {}

import { EnvironmentConfigModule, MicroserviceInitializerModule } from '@app/nestjs-microservices-tools/config';
import { Module } from '@nestjs/common';
import { AuthControllersModule } from './presentation/controllers/localAuth/auth-controllers.module';

@Module({
  imports: [EnvironmentConfigModule, AuthControllersModule, MicroserviceInitializerModule],
})
export class AuthModule {}

import { MessageQueueModule } from '@app/nestjs-microservices-tools/services/message-queue';
import { Module } from '@nestjs/common';
import { SignOutUseCase } from 'apps/auth/src/application/usecases/common/sign-out';
import { LocalAuthUseCasesModule } from 'apps/auth/src/application/usecases/local-auth';
import { SignInUseCase } from 'apps/auth/src/application/usecases/local-auth/sign-in';
import { SignUpUseCase } from 'apps/auth/src/application/usecases/local-auth/sign-up';
import { ValidateUserUseCase } from 'apps/auth/src/application/usecases/local-auth/validate-user';

@Module({
  imports: [MessageQueueModule, LocalAuthUseCasesModule],
  controllers: [SignInUseCase, SignOutUseCase, SignUpUseCase, ValidateUserUseCase],
})
export class AuthControllersModule {}

import { LoggerModule } from '@app/nestjs-microservices-tools/services/logger';
import { Module } from '@nestjs/common';
import { LocalCredentialsModule } from '../../services/local-credentials';
import { UserServiceModule } from '../../services/user';
import { SignInUseCase } from './sign-in';
import { SignUpUseCase } from './sign-up';
import { ValidateUserUseCase } from './validate-user';

@Module({
  imports: [LocalCredentialsModule, LoggerModule, UserServiceModule],
  exports: [SignInUseCase, SignUpUseCase, ValidateUserUseCase],
})
export class LocalAuthUseCasesModule {}

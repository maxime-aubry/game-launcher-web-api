import { LoggerModule } from '@app/nestjs-microservices-tools/services/logger';
import { Module } from '@nestjs/common';
import { UserProfile } from 'apps/auth/src/application/services/mappers/profiles/user.profile';
import { LocalAuthPresentersModule } from '../../presenters/local-auth';
import { LocalCredentialsModule } from '../../services/local-credentials';
import { UserServiceModule } from '../../services/user';

@Module({
  imports: [LocalAuthPresentersModule, LocalCredentialsModule, LoggerModule, UserServiceModule],
  providers: [UserProfile],
})
export class LocalAuthUseCasesModule {}

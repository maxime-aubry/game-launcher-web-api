import { Module } from '@nestjs/common';
import { LocalCredentialsModule } from '../local-credentials';
import { UserModelWithLocalCredentialsInitializer } from './user-model-with-local-credentials-initializer.service';

@Module({
  imports: [LocalCredentialsModule],
  providers: [UserModelWithLocalCredentialsInitializer],
  exports: [UserModelWithLocalCredentialsInitializer],
})
export class CreateUserModelInitializerModule {}

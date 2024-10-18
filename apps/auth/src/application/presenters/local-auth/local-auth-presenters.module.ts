import { Module } from '@nestjs/common';
import { AuthMappersModule } from 'apps/auth/src/application/services/mappers';
import { SignUpPresenter } from './sign-up/sign-up.presenter';
import { ValidateUserPresenter } from './validate-user/validate-user.presenter';

@Module({
  imports: [AuthMappersModule],
  providers: [ValidateUserPresenter, SignUpPresenter],
  exports: [ValidateUserPresenter, SignUpPresenter],
})
export class LocalAuthPresentersModule {}

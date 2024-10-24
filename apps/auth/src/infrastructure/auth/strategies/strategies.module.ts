import { JwtModule } from '@app/nestjs-microservices-tools/services/jwt';
import { Module } from '@nestjs/common';
import { LocalAuthUseCasesModule } from 'apps/auth/src/application/usecases/local-auth';
import { AccessTokenStrategy } from './accessToken.strategy.ts';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [LocalAuthUseCasesModule, JwtModule],
  exports: [AccessTokenStrategy, LocalStrategy],
  providers: [AccessTokenStrategy, LocalStrategy],
})
export class StategiesModule {}

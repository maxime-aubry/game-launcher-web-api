import { HashModule } from '@app/nestjs-microservices-tools/services/hash';
import { Module } from '@nestjs/common';
import { LocalCredentialsService } from './local-credentials.service';

@Module({
  imports: [HashModule],
  providers: [LocalCredentialsService],
  exports: [LocalCredentialsService],
})
export class LocalCredentialsModule {}

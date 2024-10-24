import { Module } from '@nestjs/common';
import { SignOutUseCase } from './sign-out';

@Module({
  exports: [SignOutUseCase],
})
export class CommonAuthUseCasesModule {}

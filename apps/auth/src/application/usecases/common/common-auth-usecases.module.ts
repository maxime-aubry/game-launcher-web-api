import { Module } from '@nestjs/common';
import { SignOutUseCase } from './sign-out/sign-out-usecase';

@Module({
  providers: [SignOutUseCase],
  exports: [SignOutUseCase],
})
export class CommonAuthUseCasesModule {}

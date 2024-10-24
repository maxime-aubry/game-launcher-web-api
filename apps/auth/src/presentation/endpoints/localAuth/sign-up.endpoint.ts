import type { IApiEndpointAsync } from '@app/nestjs-microservices-tools/endpoint';
import { type IMessageQueueService, MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, type RmqContext } from '@nestjs/microservices';
import {
  type ISignUpUseCase,
  SignUpUseCase,
  type SignUpUseCaseRequestDto,
  type SignUpUseCaseResponseDto,
} from 'apps/auth/src/application/usecases/local-auth/sign-up';

@Controller('local-auth')
export class SignUpEndpoint implements IApiEndpointAsync<SignUpUseCaseResponseDto> {
  constructor(
    @Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService,
    @Inject(SignUpUseCase) private readonly signUpUseCase: ISignUpUseCase,
  ) {}

  @MessagePattern({ cmd: 'sign-up-local-auth' })
  public async executeAsync(
    @Ctx() context: RmqContext,
    @Payload() user: SignUpUseCaseRequestDto,
  ): Promise<SignUpUseCaseResponseDto> {
    this.messageQueueService.acknowledgeMessage(context);
    return await this.signUpUseCase.executeAsync(user);
  }
}

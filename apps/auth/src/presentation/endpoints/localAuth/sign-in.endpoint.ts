import type { IApiEndpointAsync } from '@app/nestjs-microservices-tools/endpoint';
import { type IMessageQueueService, MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue';
import { Controller, Inject, UseGuards } from '@nestjs/common';
import { Ctx, MessagePattern, type RmqContext } from '@nestjs/microservices';
import {
  type ISignInUseCase,
  SignInUseCase,
  type SignInUseCaseRequestDto,
  type SignInUseCaseResponseDto,
} from 'apps/auth/src/application/usecases/local-auth/sign-in';
import { AccessTokenGuard } from 'apps/auth/src/infrastructure/auth/guards';
import { CurrentUser } from '../../decorators';

@Controller('local-auth')
export class SignUpEndpoint implements IApiEndpointAsync<SignInUseCaseResponseDto> {
  constructor(
    @Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService,
    @Inject(SignInUseCase) private readonly signInUseCase: ISignInUseCase,
  ) {}

  @UseGuards(AccessTokenGuard)
  @MessagePattern({ cmd: 'sign-in-local-auth' })
  public async executeAsync(
    @Ctx() context: RmqContext,
    @CurrentUser() user: SignInUseCaseRequestDto,
  ): Promise<SignInUseCaseResponseDto> {
    this.messageQueueService.acknowledgeMessage(context);
    return await this.signInUseCase.executeAsync(user);
  }
}

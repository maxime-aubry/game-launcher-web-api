import type { IApiEndpointAsync } from '@app/nestjs-microservices-tools/endpoint';
import { type IMessageQueueService, MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, type RmqContext } from '@nestjs/microservices';
import type { SignOutCookiesDto } from 'apps/auth/src/application/dtos/common';
import { type ISignOutUseCase, SignOutUseCase } from 'apps/auth/src/application/usecases/common';

@Controller('local-auth')
export class SignOutEndpoint implements IApiEndpointAsync<SignOutCookiesDto> {
  constructor(
    @Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService,
    @Inject(SignOutUseCase) private readonly signOutUseCase: ISignOutUseCase,
  ) {}

  @MessagePattern({ cmd: 'sign-out' })
  public async executeAsync(@Ctx() context: RmqContext): Promise<SignOutCookiesDto> {
    this.messageQueueService.acknowledgeMessage(context);
    return await this.signOutUseCase.execute();
  }
}

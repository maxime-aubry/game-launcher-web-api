import type { IApiEndpointAsync } from '@app/nestjs-microservices-tools/endpoint';
import { type IMessageQueueService, MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue';
import { Controller, Inject, UseGuards } from '@nestjs/common';
import { Ctx, MessagePattern, type RmqContext } from '@nestjs/microservices';
import type { ValidateUserUseCaseResponseDto } from 'apps/auth/src/application/usecases/local-auth/validate-user';
import { AccessTokenGuard } from 'apps/auth/src/infrastructure/auth/guards';
import { CurrentUser } from '../../decorators';

@Controller('local-auth')
export class ValidateUserEndpoint implements IApiEndpointAsync<ValidateUserUseCaseResponseDto> {
  constructor(@Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService) {}

  @UseGuards(AccessTokenGuard)
  @MessagePattern('validate-user')
  public async executeAsync(
    @Ctx() context: RmqContext,
    @CurrentUser() user: ValidateUserUseCaseResponseDto,
  ): Promise<ValidateUserUseCaseResponseDto> {
    this.messageQueueService.acknowledgeMessage(context);
    return user;
  }
}

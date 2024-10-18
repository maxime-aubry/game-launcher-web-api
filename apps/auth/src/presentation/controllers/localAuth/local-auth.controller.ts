import { type IMessageQueueService, MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, type RmqContext } from '@nestjs/microservices';

@Controller('local-auth')
export class LocalAuthController {
  constructor(@Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService) {}

  @MessagePattern({ cmd: 'get-user' })
  public getUser(@Ctx() context: RmqContext): string {
    this.messageQueueService.acknowledgeMessage(context);
    return 'test1';
  }
}

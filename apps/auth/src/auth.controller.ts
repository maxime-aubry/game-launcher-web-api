import type { IMessageQueueService } from '@app/shared/interfaces/services/messageQueue/message-queue.service.interface';
import { MessageQueueService } from '@app/shared/services/message-queue/message-queue.service';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, type RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(@Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService) {}

  @MessagePattern({ cmd: 'get-user' })
  public getUser(@Ctx() context: RmqContext): string {
    this.messageQueueService.acknowledgeMessage(context);
    return 'test';
  }
}

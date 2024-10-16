import type { IMessageQueueService } from '@app/nestjs-microservices-tools/interfaces/services/messageQueue/message-queue.service.interface';
import { MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue/message-queue.service';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, type RmqContext } from '@nestjs/microservices';

@Controller()
export class LocalAuthController {
  constructor(@Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService) {}

  @MessagePattern({ cmd: 'get-user' })
  public getUser(@Ctx() context: RmqContext): string {
    this.messageQueueService.acknowledgeMessage(context);
    return 'test1';
  }
}
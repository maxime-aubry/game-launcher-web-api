import type { IApiEndpointAsync } from '@app/nestjs-microservices-tools/endpoint';
import { type IMessageQueueService, MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, type RmqContext } from '@nestjs/microservices';
import type { ExistingUserDto, SignUpWithLocalCredentialsDto } from 'apps/auth/src/application/dtos/local-auth';
import { type ISignUpUseCase, SignUpUseCase } from 'apps/auth/src/application/usecases/local-auth';

@Controller('local-auth')
export class RegisterUserEndpoint implements IApiEndpointAsync<ExistingUserDto> {
  constructor(
    @Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService,
    @Inject(SignUpUseCase) private readonly signUpUseCase: ISignUpUseCase,
  ) {}

  @MessagePattern({ cmd: 'register-local-auth' })
  public async executeAsync(
    @Ctx() context: RmqContext,
    @Payload() user: SignUpWithLocalCredentialsDto,
  ): Promise<ExistingUserDto> {
    this.messageQueueService.acknowledgeMessage(context);
    return await this.signUpUseCase.executeAsync(user);
  }
}

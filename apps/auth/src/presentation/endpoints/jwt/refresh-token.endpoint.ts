import type { IApiEndpointAsync } from '@app/nestjs-microservices-tools/endpoint';
import { IMessageQueueService, MessageQueueService } from '@app/nestjs-microservices-tools/services/message-queue';
import { Controller, Inject } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { IRefreshTokenUseCase, RefreshTokenUseCase, RefreshTokenUseCaseRequestDto, RefreshTokenUseCaseResponseDto } from 'apps/auth/src/application/usecases/jwt-auth/refresh-token';

@Controller('jwt-auth')
export class RefreshTokenEndpoint implements IApiEndpointAsync<RefreshTokenUseCaseResponseDto> {
    constructor(
      @Inject(MessageQueueService) private readonly messageQueueService: IMessageQueueService,
      @Inject(RefreshTokenUseCase) private readonly refreshTokenUseCase: IRefreshTokenUseCase,
    ) {}
  
    @MessagePattern({ cmd: 'refresh-token' })
    public async executeAsync(
        @Ctx() context: RmqContext,
        @Payload() request: RefreshTokenUseCaseRequestDto,
    ): Promise<RefreshTokenUseCaseResponseDto> {
        this.messageQueueService.acknowledgeMessage(context);
        return await this.refreshTokenUseCase.executeAsync(request);
    }
}

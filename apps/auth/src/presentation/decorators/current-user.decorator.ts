import { BadRequestException, type ExecutionContext, createParamDecorator } from '@nestjs/common';
import type { ValidateUserUseCaseResponseDto } from '../../application/usecases/local-auth/validate-user';

interface IRequestWithUser {
  user: ValidateUserUseCaseResponseDto;
}

const getCurrentUserByContext = (context: ExecutionContext): ValidateUserUseCaseResponseDto => {
  if (context.getType() === 'http') {
    const request: IRequestWithUser = context.switchToHttp().getRequest<IRequestWithUser>();
    return request.user;
  }
  if (context.getType() === 'rpc') {
    const data: IRequestWithUser = context.switchToRpc().getData<IRequestWithUser>();
    return data.user;
  }

  throw new BadRequestException();
};

export const CurrentUser = createParamDecorator((_data: unknown, context: ExecutionContext) =>
  getCurrentUserByContext(context),
);

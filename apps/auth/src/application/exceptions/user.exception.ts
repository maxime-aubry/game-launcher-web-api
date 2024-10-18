import { Exception } from '@app/nestjs-microservices-tools/exceptions';

export class UserServiceException extends Exception {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, UserServiceException.prototype);
  }
}

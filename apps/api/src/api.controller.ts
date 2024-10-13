import { Controller, Get, Inject } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import type { Observable } from 'rxjs';

@Controller()
export class ApiController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}

  @Get('getUser')
  public getUser(): Observable<any> {
    return this.authService.send(
      {
        cmd: 'get-user',
      },
      {},
    );
  }
}

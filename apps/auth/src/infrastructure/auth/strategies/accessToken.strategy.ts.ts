import type { IJwtConfiguration } from '@app/nestjs-microservices-tools/config/environment-config';
import { type JwtPayload, JwtService } from '@app/nestjs-microservices-tools/services/jwt';
import { Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(JwtService) private readonly jwtConfig: IJwtConfiguration) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.getJwtSecret(),
    });
  }

  public validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}

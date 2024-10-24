import type { IJwtConfiguration } from '@app/nestjs-microservices-tools/config/environment-config';
import { type JwtPayload, JwtService } from '@app/nestjs-microservices-tools/services/jwt';
import { ForbiddenException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(@Inject(JwtService) private readonly jwtConfig: IJwtConfiguration) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.getJwtRefreshSecret(),
      passReqToCallback: true,
    });
  }

  public validate(request: Request, payload: JwtPayload): JwtPayload {
    const refreshToken: string | undefined = request.get('authorization')?.replace('Bearer', '')?.trim();

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

    return { ...payload, refreshToken };
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const pickToken = (value?: string): string | null => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  if (!normalized) {
    return null;
  }

  if (/^Bearer\s+/i.test(normalized)) {
    return normalized.replace(/^Bearer\s+/i, '').trim() || null;
  }

  return normalized;
};

const extractBearerToken = (req: any) => {
  const headerToken = pickToken(req?.headers?.authorization || req?.headers?.Authorization);
  if (headerToken) {
    return headerToken;
  }

  const xAccessToken = pickToken(req?.headers?.['x-access-token']);
  if (xAccessToken) {
    return xAccessToken;
  }

  return pickToken(req?.query?.access_token);
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractBearerToken,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'your-secret-key'),
    });
  }

  async validate(payload: any) {
    const user = {
      userId: payload.sub || payload.userId || payload.id, 
      username: payload.username
    };

    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const extractBearerToken = (req: any) => {
  const authorization = req?.headers?.authorization || req?.headers?.Authorization;
  if (!authorization || typeof authorization !== 'string') {
    console.log('[JWT] Authorization header missing');
    return null;
  }

  const [scheme, token] = authorization.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    console.log('[JWT] Authorization header present but not Bearer scheme');
    return null;
  }

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        extractBearerToken,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
    console.log('[JWT] JWT Strategy initialized with secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
  }

  async validate(payload: any) {
    console.log('[JWT] Full payload received:', JSON.stringify(payload, null, 2));
    console.log('[JWT] Payload fields:', Object.keys(payload));
    
    const user = { 
      userId: payload.sub || payload.userId || payload.id, 
      username: payload.username
    };
    
    console.log('[JWT] User object created:', JSON.stringify(user, null, 2));
    return user;
  }
}

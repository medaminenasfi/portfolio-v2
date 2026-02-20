import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    // Single admin system - only allow 'amine' user
    if (!user || user.username !== 'amine') {
      console.log('[ADMIN] Access denied - not the single admin user:', user?.username);
      return false;
    }
    
    console.log('[ADMIN] Access granted - single admin user verified');
    return true;
  }
}

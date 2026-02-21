import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    console.log('[ADMIN] AdminGuard called');
    console.log('[ADMIN] User object:', JSON.stringify(user, null, 2));
    console.log('[ADMIN] Username:', user?.username);
    console.log('[ADMIN] Expected username: amine');
    
    // Single admin system - only allow 'amine' user
    if (!user || user.username !== 'amine') {
      console.log('[ADMIN] Access denied - not the single admin user:', user?.username);
      return false;
    }
    
    console.log('[ADMIN] Access granted - single admin user verified');
    return true;
  }
}

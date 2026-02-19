import { OnModuleInit } from '@nestjs/common';
import { AuthSeedService } from './auth.seed';
export declare class AuthModule implements OnModuleInit {
    private readonly authSeedService;
    constructor(authSeedService: AuthSeedService);
    onModuleInit(): Promise<void>;
}

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class AuthSeedService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUserIfNotExists(): Promise<void>;
}

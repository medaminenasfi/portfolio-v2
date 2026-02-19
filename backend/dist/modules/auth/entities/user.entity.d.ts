import { BaseEntity } from '../../../common/entities/base.entity';
import { Project } from '../../projects/entities/project.entity';
export declare class User extends BaseEntity {
    username: string;
    password: string;
    projects: Project[];
}

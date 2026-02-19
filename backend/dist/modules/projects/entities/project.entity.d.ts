import { BaseEntity } from '../../../common/entities/base.entity';
export declare class Project extends BaseEntity {
    title: string;
    description: string;
    imageUrl?: string;
    repoUrl?: string;
    liveUrl?: string;
    technologies: string[];
}

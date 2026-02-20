import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../auth/entities/user.entity';
export declare enum ProjectCategory {
    WEB = "web",
    MOBILE = "mobile",
    DESKTOP = "desktop",
    FULL_STACK = "full-stack"
}
export declare enum ProjectStatus {
    COMPLETED = "completed",
    IN_PROGRESS = "in-progress"
}
export declare class Project extends BaseEntity {
    title: string;
    slug: string;
    description: string;
    techStack?: string[];
    images?: string[];
    bannerImage?: string;
    cataloguePhoto?: string;
    liveDemoUrl?: string;
    githubUrl?: string;
    category?: ProjectCategory;
    status?: ProjectStatus;
    isFeatured?: boolean;
    user: User;
}

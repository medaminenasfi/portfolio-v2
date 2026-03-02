import { HttpStatus } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateStatDto, UpdateStatDto } from './dto/settings.dto';
import { CreateSocialLinkDto, UpdateSocialLinkDto } from './dto/social-link.dto';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getAllStats(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/portfolio-stat.entity").PortfolioStat[];
    }>;
    createStat(createStatDto: CreateStatDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/portfolio-stat.entity").PortfolioStat;
    }>;
    updateStat(id: number, updateStatDto: UpdateStatDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/portfolio-stat.entity").PortfolioStat;
    }>;
    deleteStat(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    getAllSocialLinks(): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/social-link.entity").SocialLink[];
    }>;
    createSocialLink(createSocialLinkDto: CreateSocialLinkDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/social-link.entity").SocialLink;
    }>;
    updateSocialLink(id: number, updateSocialLinkDto: UpdateSocialLinkDto): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: import("./entities/social-link.entity").SocialLink;
    }>;
    deleteSocialLink(id: number): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
    initializeDefaultData(): Promise<{
        statusCode: HttpStatus;
        message: string;
    }>;
}

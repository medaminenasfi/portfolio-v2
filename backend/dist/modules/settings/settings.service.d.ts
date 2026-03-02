import { Repository } from 'typeorm';
import { PortfolioStat } from './entities/portfolio-stat.entity';
import { SocialLink } from './entities/social-link.entity';
import { CreateStatDto, UpdateStatDto } from './dto/settings.dto';
import { CreateSocialLinkDto, UpdateSocialLinkDto } from './dto/social-link.dto';
export declare class SettingsService {
    private readonly portfolioStatRepository;
    private readonly socialLinkRepository;
    constructor(portfolioStatRepository: Repository<PortfolioStat>, socialLinkRepository: Repository<SocialLink>);
    getAllStats(): Promise<PortfolioStat[]>;
    createStat(createStatDto: CreateStatDto): Promise<PortfolioStat>;
    updateStat(id: number, updateStatDto: UpdateStatDto): Promise<PortfolioStat>;
    deleteStat(id: number): Promise<void>;
    getAllSocialLinks(): Promise<SocialLink[]>;
    createSocialLink(createSocialLinkDto: CreateSocialLinkDto): Promise<SocialLink>;
    updateSocialLink(id: number, updateSocialLinkDto: UpdateSocialLinkDto): Promise<SocialLink>;
    deleteSocialLink(id: number): Promise<void>;
    initializeDefaults(): Promise<{
        message: string;
    }>;
}

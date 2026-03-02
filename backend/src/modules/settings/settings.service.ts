import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PortfolioStat } from './entities/portfolio-stat.entity';
import { SocialLink } from './entities/social-link.entity';
import { CreateStatDto, UpdateStatDto } from './dto/settings.dto';
import { CreateSocialLinkDto, UpdateSocialLinkDto } from './dto/social-link.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(PortfolioStat)
    private readonly portfolioStatRepository: Repository<PortfolioStat>,
    @InjectRepository(SocialLink)
    private readonly socialLinkRepository: Repository<SocialLink>,
  ) {}

  // Portfolio Stats methods
  async getAllStats(): Promise<PortfolioStat[]> {
    return this.portfolioStatRepository.find({
      order: { id: 'ASC' },
    });
  }

  async createStat(createStatDto: CreateStatDto): Promise<PortfolioStat> {
    const stat = this.portfolioStatRepository.create(createStatDto);
    return this.portfolioStatRepository.save(stat);
  }

  async updateStat(id: number, updateStatDto: UpdateStatDto): Promise<PortfolioStat> {
    await this.portfolioStatRepository.update(id, updateStatDto);
    const stat = await this.portfolioStatRepository.findOne({ where: { id } });
    if (!stat) {
      throw new Error('Stat not found');
    }
    return stat;
  }

  async deleteStat(id: number): Promise<void> {
    await this.portfolioStatRepository.delete(id);
  }

  // Social Links methods
  async getAllSocialLinks(): Promise<SocialLink[]> {
    return this.socialLinkRepository.find({
      order: { id: 'ASC' },
    });
  }

  async createSocialLink(createSocialLinkDto: CreateSocialLinkDto): Promise<SocialLink> {
    const socialLink = this.socialLinkRepository.create(createSocialLinkDto);
    return this.socialLinkRepository.save(socialLink);
  }

  async updateSocialLink(id: number, updateSocialLinkDto: UpdateSocialLinkDto): Promise<SocialLink> {
    await this.socialLinkRepository.update(id, updateSocialLinkDto);
    const socialLink = await this.socialLinkRepository.findOne({ where: { id } });
    if (!socialLink) {
      throw new Error('Social link not found');
    }
    return socialLink;
  }

  async deleteSocialLink(id: number): Promise<void> {
    await this.socialLinkRepository.delete(id);
  }

  // Initialize default data
  async initializeDefaults(): Promise<{ message: string }> {
    // Check if data already exists
    const existingStats = await this.portfolioStatRepository.count();
    const existingLinks = await this.socialLinkRepository.count();

    if (existingStats === 0) {
      const defaultStats = [
        { number: '2+', label: 'Years Experience' },
        { number: '10+', label: 'Projects Completed' },
        { number: '5+', label: 'Happy Clients' },
      ];

      for (const stat of defaultStats) {
        await this.portfolioStatRepository.save(stat);
      }
    }

    if (existingLinks === 0) {
      const defaultLinks = [
        { name: 'github', url: 'https://github.com', icon: 'github' },
        { name: 'linkedin', url: 'https://linkedin.com', icon: 'linkedin' },
        { name: 'twitter', url: 'https://twitter.com', icon: 'twitter' },
      ];

      for (const link of defaultLinks) {
        await this.socialLinkRepository.save(link);
      }
    }

    return { message: 'Default data initialized successfully' };
  }
}
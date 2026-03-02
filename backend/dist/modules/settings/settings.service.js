"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const portfolio_stat_entity_1 = require("./entities/portfolio-stat.entity");
const social_link_entity_1 = require("./entities/social-link.entity");
let SettingsService = class SettingsService {
    constructor(portfolioStatRepository, socialLinkRepository) {
        this.portfolioStatRepository = portfolioStatRepository;
        this.socialLinkRepository = socialLinkRepository;
    }
    async getAllStats() {
        return this.portfolioStatRepository.find({
            order: { id: 'ASC' },
        });
    }
    async createStat(createStatDto) {
        const stat = this.portfolioStatRepository.create(createStatDto);
        return this.portfolioStatRepository.save(stat);
    }
    async updateStat(id, updateStatDto) {
        await this.portfolioStatRepository.update(id, updateStatDto);
        const stat = await this.portfolioStatRepository.findOne({ where: { id } });
        if (!stat) {
            throw new Error('Stat not found');
        }
        return stat;
    }
    async deleteStat(id) {
        await this.portfolioStatRepository.delete(id);
    }
    async getAllSocialLinks() {
        return this.socialLinkRepository.find({
            order: { id: 'ASC' },
        });
    }
    async createSocialLink(createSocialLinkDto) {
        const socialLink = this.socialLinkRepository.create(createSocialLinkDto);
        return this.socialLinkRepository.save(socialLink);
    }
    async updateSocialLink(id, updateSocialLinkDto) {
        await this.socialLinkRepository.update(id, updateSocialLinkDto);
        const socialLink = await this.socialLinkRepository.findOne({ where: { id } });
        if (!socialLink) {
            throw new Error('Social link not found');
        }
        return socialLink;
    }
    async deleteSocialLink(id) {
        await this.socialLinkRepository.delete(id);
    }
    async initializeDefaults() {
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
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(portfolio_stat_entity_1.PortfolioStat)),
    __param(1, (0, typeorm_1.InjectRepository)(social_link_entity_1.SocialLink)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=settings.service.js.map
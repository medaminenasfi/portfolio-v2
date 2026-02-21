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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const analytics_entity_1 = require("./entities/analytics.entity");
let AnalyticsService = class AnalyticsService {
    constructor(analyticsEventRepository, analyticsSummaryRepository) {
        this.analyticsEventRepository = analyticsEventRepository;
        this.analyticsSummaryRepository = analyticsSummaryRepository;
    }
    async trackEvent(createEventDto, request) {
        const event = this.analyticsEventRepository.create({
            ...createEventDto,
            userAgent: request?.headers['user-agent'],
            ip: request?.ip,
            referrer: request?.headers.referer,
            sessionId: this.generateSessionId(request),
            userId: request?.user?.id,
        });
        if (request?.headers['user-agent']) {
            const deviceInfo = this.parseUserAgent(request.headers['user-agent']);
            Object.assign(event, deviceInfo);
        }
        return this.analyticsEventRepository.save(event);
    }
    async getAnalytics(query) {
        const { startDate, endDate, period = '7d', } = query;
        const dates = this.getDateRange(period, startDate, endDate);
        const [events, summaries] = await Promise.all([
            this.getEvents(dates.startDate, dates.endDate),
            this.getSummaries(dates.startDate, dates.endDate),
        ]);
        return {
            overview: await this.getOverviewStats(dates.startDate, dates.endDate),
            traffic: await this.getTrafficStats(dates.startDate, dates.endDate),
            content: await this.getContentStats(dates.startDate, dates.endDate),
            engagement: await this.getEngagementStats(dates.startDate, dates.endDate),
            technology: await this.getTechnologyStats(dates.startDate, dates.endDate),
            geography: await this.getGeographyStats(dates.startDate, dates.endDate),
            trends: await this.getTrends(dates.startDate, dates.endDate),
            realTime: await this.getRealTimeStats(),
        };
    }
    async getDashboardStats() {
        const now = new Date();
        const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const [totalStats, last30DaysStats, last7DaysStats, yesterdayStats, todayStats, realTimeStats,] = await Promise.all([
            this.getOverviewStats(),
            this.getOverviewStats(last30Days, now),
            this.getOverviewStats(last7Days, now),
            this.getOverviewStats(yesterday, now),
            this.getOverviewStats(new Date(now.setHours(0, 0, 0, 0)), now),
            this.getRealTimeStats(),
        ]);
        return {
            total: totalStats,
            last30Days: last30DaysStats,
            last7Days: last7DaysStats,
            yesterday: yesterdayStats,
            today: todayStats,
            realTime: realTimeStats,
            growth: {
                visitors: this.calculateGrowth(last30DaysStats.uniqueVisitors, last7DaysStats.uniqueVisitors),
                pageViews: this.calculateGrowth(last30DaysStats.totalPageViews, last7DaysStats.totalPageViews),
                downloads: this.calculateGrowth(last30DaysStats.resumeDownloads, last7DaysStats.resumeDownloads),
                submissions: this.calculateGrowth(last30DaysStats.contactSubmissions + last30DaysStats.testimonialSubmissions, last7DaysStats.contactSubmissions + last7DaysStats.testimonialSubmissions),
            },
        };
    }
    async getOverviewStats(startDate, endDate) {
        const where = {};
        if (startDate && endDate) {
            where.createdAt = (0, typeorm_2.Between)(startDate, endDate);
        }
        const [totalPageViews, uniqueVisitors, projectViews, resumeDownloads, testimonialSubmissions, contactSubmissions, techStackViews,] = await Promise.all([
            this.analyticsEventRepository.count({ where }),
            this.analyticsEventRepository.count({ where: { ...where, eventType: analytics_entity_1.AnalyticsEventType.PAGE_VIEW } }),
            this.analyticsEventRepository.count({ where: { ...where, eventType: analytics_entity_1.AnalyticsEventType.PROJECT_VIEW } }),
            this.analyticsEventRepository.count({ where: { ...where, eventType: analytics_entity_1.AnalyticsEventType.RESUME_DOWNLOAD } }),
            this.analyticsEventRepository.count({ where: { ...where, eventType: analytics_entity_1.AnalyticsEventType.TESTIMONIAL_SUBMIT } }),
            this.analyticsEventRepository.count({ where: { ...where, eventType: analytics_entity_1.AnalyticsEventType.CONTACT_SUBMIT } }),
            this.analyticsEventRepository.count({ where: { ...where, eventType: analytics_entity_1.AnalyticsEventType.TECH_STACK_VIEW } }),
        ]);
        return {
            totalPageViews,
            uniqueVisitors,
            projectViews,
            resumeDownloads,
            testimonialSubmissions,
            contactSubmissions,
            techStackViews,
        };
    }
    async getTrafficStats(startDate, endDate) {
        const events = await this.analyticsEventRepository.find({
            where: { createdAt: (0, typeorm_2.Between)(startDate, endDate) },
            select: ['page', 'referrer', 'device', 'browser', 'createdAt'],
        });
        const pageViews = this.groupBy(events, 'page');
        const referrers = this.groupBy(events, 'referrer');
        const devices = this.groupBy(events, 'device');
        const browsers = this.groupBy(events, 'browser');
        return {
            topPages: this.getTopItems(pageViews, 10),
            topReferrers: this.getTopItems(referrers, 10),
            devices: this.getPercentages(devices),
            browsers: this.getPercentages(browsers),
        };
    }
    async getContentStats(startDate, endDate) {
        const projectViews = await this.analyticsEventRepository.find({
            where: {
                createdAt: (0, typeorm_2.Between)(startDate, endDate),
                eventType: analytics_entity_1.AnalyticsEventType.PROJECT_VIEW
            },
            select: ['resourceId', 'createdAt'],
        });
        const topProjects = this.groupBy(projectViews, 'resourceId');
        return {
            topProjects: await this.enrichProjectData(this.getTopItems(topProjects, 10)),
        };
    }
    async getEngagementStats(startDate, endDate) {
        const [testimonialSubmissions, contactSubmissions, resumeDownloads, themeChanges, languageChanges,] = await Promise.all([
            this.analyticsEventRepository.count({
                where: {
                    createdAt: (0, typeorm_2.Between)(startDate, endDate),
                    eventType: analytics_entity_1.AnalyticsEventType.TESTIMONIAL_SUBMIT
                }
            }),
            this.analyticsEventRepository.count({
                where: {
                    createdAt: (0, typeorm_2.Between)(startDate, endDate),
                    eventType: analytics_entity_1.AnalyticsEventType.CONTACT_SUBMIT
                }
            }),
            this.analyticsEventRepository.count({
                where: {
                    createdAt: (0, typeorm_2.Between)(startDate, endDate),
                    eventType: analytics_entity_1.AnalyticsEventType.RESUME_DOWNLOAD
                }
            }),
            this.analyticsEventRepository.count({
                where: {
                    createdAt: (0, typeorm_2.Between)(startDate, endDate),
                    eventType: analytics_entity_1.AnalyticsEventType.THEME_CHANGE
                }
            }),
            this.analyticsEventRepository.count({
                where: {
                    createdAt: (0, typeorm_2.Between)(startDate, endDate),
                    eventType: analytics_entity_1.AnalyticsEventType.LANGUAGE_CHANGE
                }
            }),
        ]);
        return {
            testimonialSubmissions,
            contactSubmissions,
            resumeDownloads,
            themeChanges,
            languageChanges,
            totalEngagement: testimonialSubmissions + contactSubmissions + resumeDownloads,
        };
    }
    async getTechnologyStats(startDate, endDate) {
        const techStackViews = await this.analyticsEventRepository.find({
            where: {
                createdAt: (0, typeorm_2.Between)(startDate, endDate),
                eventType: analytics_entity_1.AnalyticsEventType.TECH_STACK_VIEW
            },
            select: ['metadata', 'createdAt'],
        });
        const techCategories = this.extractMetadataCategories(techStackViews);
        return {
            topCategories: this.getTopItems(techCategories, 10),
        };
    }
    async getGeographyStats(startDate, endDate) {
        const events = await this.analyticsEventRepository.find({
            where: { createdAt: (0, typeorm_2.Between)(startDate, endDate) },
            select: ['country', 'city', 'createdAt'],
        });
        const countries = this.groupBy(events, 'country');
        const cities = this.groupBy(events, 'city');
        return {
            topCountries: this.getTopItems(countries, 10),
            topCities: this.getTopItems(cities, 10),
        };
    }
    async getTrends(startDate, endDate) {
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const trends = [];
        for (let i = 0; i < days; i++) {
            const dayStart = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
            const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
            const dayStats = await this.getOverviewStats(dayStart, dayEnd);
            trends.push({
                date: dayStart.toISOString().split('T')[0],
                ...dayStats,
            });
        }
        return trends;
    }
    async getRealTimeStats() {
        const now = new Date();
        const last5Minutes = new Date(now.getTime() - 5 * 60 * 1000);
        const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
        const [currentVisitors, last5MinutesActivity, lastHourActivity,] = await Promise.all([
            this.getCurrentVisitors(),
            this.getOverviewStats(last5Minutes, now),
            this.getOverviewStats(lastHour, now),
        ]);
        return {
            currentVisitors,
            last5MinutesActivity,
            lastHourActivity,
        };
    }
    async getCurrentVisitors() {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const result = await this.analyticsEventRepository
            .createQueryBuilder('event')
            .select('COUNT(DISTINCT event.sessionId)', 'count')
            .where('event.createdAt > :date', { date: thirtyMinutesAgo })
            .getRawOne();
        return parseInt(result.count) || 0;
    }
    generateSessionId(request) {
        const ip = request?.ip || 'unknown';
        const userAgent = request?.headers['user-agent'] || 'unknown';
        return Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 32);
    }
    parseUserAgent(userAgent) {
        const device = userAgent.includes('Mobile') ? 'mobile' :
            userAgent.includes('Tablet') ? 'tablet' : 'desktop';
        let browser = 'unknown';
        if (userAgent.includes('Chrome'))
            browser = 'chrome';
        else if (userAgent.includes('Firefox'))
            browser = 'firefox';
        else if (userAgent.includes('Safari'))
            browser = 'safari';
        else if (userAgent.includes('Edge'))
            browser = 'edge';
        let os = 'unknown';
        if (userAgent.includes('Windows'))
            os = 'windows';
        else if (userAgent.includes('Mac'))
            os = 'macos';
        else if (userAgent.includes('Linux'))
            os = 'linux';
        else if (userAgent.includes('Android'))
            os = 'android';
        else if (userAgent.includes('iOS'))
            os = 'ios';
        return { device, browser, os };
    }
    getDateRange(period, startDate, endDate) {
        const now = new Date();
        if (startDate && endDate) {
            return { startDate, endDate };
        }
        const periods = {
            '1d': { days: 1 },
            '7d': { days: 7 },
            '30d': { days: 30 },
            '90d': { days: 90 },
            '1y': { days: 365 },
        };
        const days = periods[period]?.days || 7;
        const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        return { startDate: start, endDate: now };
    }
    groupBy(items, key) {
        return items.reduce((acc, item) => {
            const value = item[key] || 'unknown';
            acc[value] = (acc[value] || 0) + 1;
            return acc;
        }, {});
    }
    getTopItems(grouped, limit) {
        return Object.entries(grouped)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit)
            .map(([key, value]) => ({ [key === 'unknown' ? 'Direct' : key]: value }));
    }
    getPercentages(grouped) {
        const total = Object.values(grouped).reduce((sum, count) => sum + count, 0);
        return Object.entries(grouped)
            .map(([key, value]) => ({ [key]: Math.round((value / total) * 100) }))
            .sort(([, a], [, b]) => b.value - a.value);
    }
    calculateGrowth(oldValue, newValue) {
        if (oldValue === 0)
            return newValue > 0 ? 100 : 0;
        return Math.round(((newValue - oldValue) / oldValue) * 100);
    }
    async enrichProjectData(topProjects) {
        return topProjects;
    }
    extractMetadataCategories(events) {
        const categories = {};
        events.forEach(event => {
            try {
                const metadata = JSON.parse(event.metadata || '{}');
                if (metadata.category) {
                    categories[metadata.category] = (categories[metadata.category] || 0) + 1;
                }
            }
            catch (e) {
            }
        });
        return categories;
    }
    async getEvents(startDate, endDate) {
        return this.analyticsEventRepository.find({
            where: { createdAt: (0, typeorm_2.Between)(startDate, endDate) },
            order: { createdAt: 'DESC' },
            take: 1000,
        });
    }
    async getSummaries(startDate, endDate) {
        return this.analyticsSummaryRepository.find({
            where: { date: (0, typeorm_2.Between)(startDate, endDate) },
            order: { date: 'DESC' },
        });
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(analytics_entity_1.AnalyticsEvent)),
    __param(1, (0, typeorm_1.InjectRepository)(analytics_entity_1.AnalyticsSummary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map
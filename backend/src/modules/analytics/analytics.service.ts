import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan, MoreThan } from 'typeorm';
import { AnalyticsEvent, AnalyticsSummary, AnalyticsEventType } from './entities/analytics.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { GetAnalyticsDto } from './dto/get-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AnalyticsEvent)
    private readonly analyticsEventRepository: Repository<AnalyticsEvent>,
    @InjectRepository(AnalyticsSummary)
    private readonly analyticsSummaryRepository: Repository<AnalyticsSummary>,
  ) {}

  async trackEvent(createEventDto: CreateEventDto, request?: any): Promise<AnalyticsEvent> {
    const event = this.analyticsEventRepository.create({
      ...createEventDto,
      userAgent: request?.headers['user-agent'],
      ip: request?.ip,
      referrer: request?.headers.referer,
      sessionId: this.generateSessionId(request),
      userId: request?.user?.id,
    });

    // Parse user agent for device info
    if (request?.headers['user-agent']) {
      const deviceInfo = this.parseUserAgent(request.headers['user-agent']);
      Object.assign(event, deviceInfo);
    }

    return this.analyticsEventRepository.save(event);
  }

  async getAnalytics(query: GetAnalyticsDto) {
    const {
      startDate,
      endDate,
      period = '7d', // Default to last 7 days
    } = query;

    const dates = this.getDateRange(
      period, 
      startDate ? new Date(startDate) : undefined, 
      endDate ? new Date(endDate) : undefined
    );
    
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

    const [
      totalStats,
      last30DaysStats,
      last7DaysStats,
      yesterdayStats,
      todayStats,
      realTimeStats,
    ] = await Promise.all([
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
        submissions: this.calculateGrowth(
          last30DaysStats.contactSubmissions + last30DaysStats.testimonialSubmissions,
          last7DaysStats.contactSubmissions + last7DaysStats.testimonialSubmissions
        ),
      },
    };
  }

  public async getOverviewStats(startDate?: Date, endDate?: Date) {
    const where: any = {};
    if (startDate && endDate) {
      where.createdAt = Between(startDate, endDate);
    }

    const [
      totalPageViews,
      uniqueVisitors,
      projectViews,
      resumeDownloads,
      testimonialSubmissions,
      contactSubmissions,
      techStackViews,
    ] = await Promise.all([
      this.analyticsEventRepository.count({ where }),
      this.analyticsEventRepository.count({ where: { ...where, eventType: AnalyticsEventType.PAGE_VIEW } }),
      this.analyticsEventRepository.count({ where: { ...where, eventType: AnalyticsEventType.PROJECT_VIEW } }),
      this.analyticsEventRepository.count({ where: { ...where, eventType: AnalyticsEventType.RESUME_DOWNLOAD } }),
      this.analyticsEventRepository.count({ where: { ...where, eventType: AnalyticsEventType.TESTIMONIAL_SUBMIT } }),
      this.analyticsEventRepository.count({ where: { ...where, eventType: AnalyticsEventType.CONTACT_SUBMIT } }),
      this.analyticsEventRepository.count({ where: { ...where, eventType: AnalyticsEventType.TECH_STACK_VIEW } }),
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

  public async getTrafficStats(startDate: Date, endDate: Date) {
    const events = await this.analyticsEventRepository.find({
      where: { createdAt: Between(startDate, endDate) },
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

  public async getContentStats(startDate: Date, endDate: Date) {
    const projectViews = await this.analyticsEventRepository.find({
      where: { 
        createdAt: Between(startDate, endDate),
        eventType: AnalyticsEventType.PROJECT_VIEW 
      },
      select: ['resourceId', 'createdAt'],
    });

    const topProjects = this.groupBy(projectViews, 'resourceId');

    return {
      topProjects: await this.enrichProjectData(this.getTopItems(topProjects, 10)),
    };
  }

  public async getEngagementStats(startDate: Date, endDate: Date) {
    const [
      testimonialSubmissions,
      contactSubmissions,
      resumeDownloads,
      themeChanges,
      languageChanges,
    ] = await Promise.all([
      this.analyticsEventRepository.count({
        where: { 
          createdAt: Between(startDate, endDate),
          eventType: AnalyticsEventType.TESTIMONIAL_SUBMIT 
        }
      }),
      this.analyticsEventRepository.count({
        where: { 
          createdAt: Between(startDate, endDate),
          eventType: AnalyticsEventType.CONTACT_SUBMIT 
        }
      }),
      this.analyticsEventRepository.count({
        where: { 
          createdAt: Between(startDate, endDate),
          eventType: AnalyticsEventType.RESUME_DOWNLOAD 
        }
      }),
      this.analyticsEventRepository.count({
        where: { 
          createdAt: Between(startDate, endDate),
          eventType: AnalyticsEventType.THEME_CHANGE 
        }
      }),
      this.analyticsEventRepository.count({
        where: { 
          createdAt: Between(startDate, endDate),
          eventType: AnalyticsEventType.LANGUAGE_CHANGE 
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

  public async getTechnologyStats(startDate: Date, endDate: Date) {
    const techStackViews = await this.analyticsEventRepository.find({
      where: { 
        createdAt: Between(startDate, endDate),
        eventType: AnalyticsEventType.TECH_STACK_VIEW 
      },
      select: ['metadata', 'createdAt'],
    });

    const techCategories = this.extractMetadataCategories(techStackViews);

    return {
      topCategories: this.getTopItems(techCategories, 10),
    };
  }

  public async getGeographyStats(startDate: Date, endDate: Date) {
    const events = await this.analyticsEventRepository.find({
      where: { createdAt: Between(startDate, endDate) },
      select: ['country', 'city', 'createdAt'],
    });

    const countries = this.groupBy(events, 'country');
    const cities = this.groupBy(events, 'city');

    return {
      topCountries: this.getTopItems(countries, 10),
      topCities: this.getTopItems(cities, 10),
    };
  }

  public async getTrends(startDate: Date, endDate: Date) {
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

  public async getRealTimeStats() {
    const now = new Date();
    const last5Minutes = new Date(now.getTime() - 5 * 60 * 1000);
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);

    const [
      currentVisitors,
      last5MinutesActivity,
      lastHourActivity,
    ] = await Promise.all([
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

  private async getCurrentVisitors(): Promise<number> {
    // Count unique sessions in the last 30 minutes
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const result = await this.analyticsEventRepository
      .createQueryBuilder('event')
      .select('COUNT(DISTINCT event.sessionId)', 'count')
      .where('event.createdAt > :date', { date: thirtyMinutesAgo })
      .getRawOne();

    return parseInt(result.count) || 0;
  }

  // Helper methods
  private generateSessionId(request?: any): string {
    // Generate session ID from IP and User-Agent
    const ip = request?.ip || 'unknown';
    const userAgent = request?.headers['user-agent'] || 'unknown';
    return Buffer.from(`${ip}-${userAgent}`).toString('base64').substring(0, 32);
  }

  private parseUserAgent(userAgent: string) {
    // Simple user agent parsing (in production, use a proper library)
    const device = userAgent.includes('Mobile') ? 'mobile' : 
                  userAgent.includes('Tablet') ? 'tablet' : 'desktop';
    
    let browser = 'unknown';
    if (userAgent.includes('Chrome')) browser = 'chrome';
    else if (userAgent.includes('Firefox')) browser = 'firefox';
    else if (userAgent.includes('Safari')) browser = 'safari';
    else if (userAgent.includes('Edge')) browser = 'edge';

    let os = 'unknown';
    if (userAgent.includes('Windows')) os = 'windows';
    else if (userAgent.includes('Mac')) os = 'macos';
    else if (userAgent.includes('Linux')) os = 'linux';
    else if (userAgent.includes('Android')) os = 'android';
    else if (userAgent.includes('iOS')) os = 'ios';

    return { device, browser, os };
  }

  public getDateRange(period: string, startDate?: Date, endDate?: Date) {
    const now = new Date();
    
    if (startDate && endDate) {
      return { startDate, endDate };
    }

    const periods: { [key: string]: { days: number } } = {
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

  private groupBy(items: any[], key: string): { [key: string]: number } {
    return items.reduce((acc, item) => {
      const value = item[key] || 'unknown';
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  private getTopItems(grouped: { [key: string]: number }, limit: number): Array<{ [key: string]: number }> {
    return Object.entries(grouped)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([key, value]) => ({ [key === 'unknown' ? 'Direct' : key]: value }));
  }

  private getPercentages(grouped: { [key: string]: number }): Array<{ [key: string]: number }> {
    const total = Object.values(grouped).reduce((sum, count) => sum + count, 0);
    return Object.entries(grouped)
      .map(([key, value]) => ({ [key]: Math.round((value / total) * 100) }))
      .sort((a, b) => {
        const aValue = Object.values(a)[0] as number;
        const bValue = Object.values(b)[0] as number;
        return bValue - aValue;
      });
  }

  private calculateGrowth(oldValue: number, newValue: number): number {
    if (oldValue === 0) return newValue > 0 ? 100 : 0;
    return Math.round(((newValue - oldValue) / oldValue) * 100);
  }

  private async enrichProjectData(topProjects: any[]) {
    // This would fetch project details from the project service
    // For now, return as-is
    return topProjects;
  }

  private extractMetadataCategories(events: any[]) {
    const categories: { [key: string]: number } = {};
    
    events.forEach(event => {
      try {
        const metadata = JSON.parse(event.metadata || '{}');
        if (metadata.category) {
          categories[metadata.category] = (categories[metadata.category] || 0) + 1;
        }
      } catch (e) {
        // Ignore JSON parsing errors
      }
    });

    return categories;
  }

  private async getEvents(startDate: Date, endDate: Date) {
    return this.analyticsEventRepository.find({
      where: { createdAt: Between(startDate, endDate) },
      order: { createdAt: 'DESC' },
      take: 1000,
    });
  }

  private async getSummaries(startDate: Date, endDate: Date) {
    return this.analyticsSummaryRepository.find({
      where: { date: Between(startDate, endDate) },
      order: { date: 'DESC' },
    });
  }
}

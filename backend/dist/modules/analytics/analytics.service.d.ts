import { Repository } from 'typeorm';
import { AnalyticsEvent, AnalyticsSummary } from './entities/analytics.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
export declare class AnalyticsService {
    private readonly analyticsEventRepository;
    private readonly analyticsSummaryRepository;
    constructor(analyticsEventRepository: Repository<AnalyticsEvent>, analyticsSummaryRepository: Repository<AnalyticsSummary>);
    trackEvent(createEventDto: CreateEventDto, request?: any): Promise<AnalyticsEvent>;
    getAnalytics(query: GetAnalyticsDto): Promise<{
        overview: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
        traffic: {
            topPages: {
                [key: string]: number;
            }[];
            topReferrers: {
                [key: string]: number;
            }[];
            devices: {
                [key: string]: number;
            }[];
            browsers: {
                [key: string]: number;
            }[];
        };
        content: {
            topProjects: any[];
        };
        engagement: {
            testimonialSubmissions: number;
            contactSubmissions: number;
            resumeDownloads: number;
            themeChanges: number;
            languageChanges: number;
            totalEngagement: number;
        };
        technology: {
            topCategories: {
                [key: string]: number;
            }[];
        };
        geography: {
            topCountries: {
                [key: string]: number;
            }[];
            topCities: {
                [key: string]: number;
            }[];
        };
        trends: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
            date: string;
        }[];
        realTime: {
            currentVisitors: number;
            last5MinutesActivity: {
                totalPageViews: number;
                uniqueVisitors: number;
                projectViews: number;
                resumeDownloads: number;
                testimonialSubmissions: number;
                contactSubmissions: number;
                techStackViews: number;
            };
            lastHourActivity: {
                totalPageViews: number;
                uniqueVisitors: number;
                projectViews: number;
                resumeDownloads: number;
                testimonialSubmissions: number;
                contactSubmissions: number;
                techStackViews: number;
            };
        };
    }>;
    getDashboardStats(): Promise<{
        total: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
        last30Days: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
        last7Days: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
        yesterday: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
        today: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
        realTime: {
            currentVisitors: number;
            last5MinutesActivity: {
                totalPageViews: number;
                uniqueVisitors: number;
                projectViews: number;
                resumeDownloads: number;
                testimonialSubmissions: number;
                contactSubmissions: number;
                techStackViews: number;
            };
            lastHourActivity: {
                totalPageViews: number;
                uniqueVisitors: number;
                projectViews: number;
                resumeDownloads: number;
                testimonialSubmissions: number;
                contactSubmissions: number;
                techStackViews: number;
            };
        };
        growth: {
            visitors: number;
            pageViews: number;
            downloads: number;
            submissions: number;
        };
    }>;
    getOverviewStats(startDate?: Date, endDate?: Date): Promise<{
        totalPageViews: number;
        uniqueVisitors: number;
        projectViews: number;
        resumeDownloads: number;
        testimonialSubmissions: number;
        contactSubmissions: number;
        techStackViews: number;
    }>;
    getTrafficStats(startDate: Date, endDate: Date): Promise<{
        topPages: {
            [key: string]: number;
        }[];
        topReferrers: {
            [key: string]: number;
        }[];
        devices: {
            [key: string]: number;
        }[];
        browsers: {
            [key: string]: number;
        }[];
    }>;
    getContentStats(startDate: Date, endDate: Date): Promise<{
        topProjects: any[];
    }>;
    getEngagementStats(startDate: Date, endDate: Date): Promise<{
        testimonialSubmissions: number;
        contactSubmissions: number;
        resumeDownloads: number;
        themeChanges: number;
        languageChanges: number;
        totalEngagement: number;
    }>;
    getTechnologyStats(startDate: Date, endDate: Date): Promise<{
        topCategories: {
            [key: string]: number;
        }[];
    }>;
    getGeographyStats(startDate: Date, endDate: Date): Promise<{
        topCountries: {
            [key: string]: number;
        }[];
        topCities: {
            [key: string]: number;
        }[];
    }>;
    getTrends(startDate: Date, endDate: Date): Promise<{
        totalPageViews: number;
        uniqueVisitors: number;
        projectViews: number;
        resumeDownloads: number;
        testimonialSubmissions: number;
        contactSubmissions: number;
        techStackViews: number;
        date: string;
    }[]>;
    getRealTimeStats(): Promise<{
        currentVisitors: number;
        last5MinutesActivity: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
        lastHourActivity: {
            totalPageViews: number;
            uniqueVisitors: number;
            projectViews: number;
            resumeDownloads: number;
            testimonialSubmissions: number;
            contactSubmissions: number;
            techStackViews: number;
        };
    }>;
    private getCurrentVisitors;
    private generateSessionId;
    private parseUserAgent;
    getDateRange(period: string, startDate?: Date, endDate?: Date): {
        startDate: Date;
        endDate: Date;
    };
    private groupBy;
    private getTopItems;
    private getPercentages;
    private calculateGrowth;
    private enrichProjectData;
    private extractMetadataCategories;
    private getEvents;
    private getSummaries;
}

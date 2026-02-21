import { AnalyticsService } from './analytics.service';
import { CreateEventDto } from './dto/create-event.dto';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    trackEvent(createEventDto: CreateEventDto, req: any): Promise<import("./entities/analytics.entity").AnalyticsEvent>;
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
    getOverview(query: GetAnalyticsDto): Promise<{
        totalPageViews: number;
        uniqueVisitors: number;
        projectViews: number;
        resumeDownloads: number;
        testimonialSubmissions: number;
        contactSubmissions: number;
        techStackViews: number;
    }>;
    getTrafficStats(query: GetAnalyticsDto): Promise<{
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
    getContentStats(query: GetAnalyticsDto): Promise<{
        topProjects: any[];
    }>;
    getEngagementStats(query: GetAnalyticsDto): Promise<{
        testimonialSubmissions: number;
        contactSubmissions: number;
        resumeDownloads: number;
        themeChanges: number;
        languageChanges: number;
        totalEngagement: number;
    }>;
    getTechnologyStats(query: GetAnalyticsDto): Promise<{
        topCategories: {
            [key: string]: number;
        }[];
    }>;
    getGeographyStats(query: GetAnalyticsDto): Promise<{
        topCountries: {
            [key: string]: number;
        }[];
        topCities: {
            [key: string]: number;
        }[];
    }>;
    getTrends(query: GetAnalyticsDto): Promise<{
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
}

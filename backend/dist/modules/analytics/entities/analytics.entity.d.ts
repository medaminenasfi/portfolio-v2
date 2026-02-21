export declare enum AnalyticsEventType {
    PAGE_VIEW = "page_view",
    PROJECT_VIEW = "project_view",
    RESUME_DOWNLOAD = "resume_download",
    TESTIMONIAL_SUBMIT = "testimonial_submit",
    CONTACT_SUBMIT = "contact_submit",
    TECH_STACK_VIEW = "tech_stack_view",
    SKILL_FILTER = "skill_filter",
    PROJECT_FILTER = "project_filter",
    SEARCH_QUERY = "search_query",
    THEME_CHANGE = "theme_change",
    LANGUAGE_CHANGE = "language_change"
}
export declare class AnalyticsEvent {
    id: string;
    eventType: AnalyticsEventType;
    page: string;
    resourceId: string;
    metadata: string;
    userAgent: string;
    ip: string;
    referrer: string;
    country: string;
    city: string;
    browser: string;
    os: string;
    device: string;
    sessionId: string;
    userId: string;
    createdAt: Date;
}
export declare class AnalyticsSummary {
    id: string;
    date: Date;
    totalPageViews: number;
    uniqueVisitors: number;
    projectViews: number;
    resumeDownloads: number;
    testimonialSubmissions: number;
    contactSubmissions: number;
    techStackViews: number;
    topPages: Array<{
        page: string;
        views: number;
    }>;
    topProjects: Array<{
        projectId: string;
        title: string;
        views: number;
    }>;
    topReferrers: Array<{
        referrer: string;
        visits: number;
    }>;
    devices: Array<{
        device: string;
        percentage: number;
    }>;
    browsers: Array<{
        browser: string;
        percentage: number;
    }>;
    countries: Array<{
        country: string;
        visits: number;
    }>;
    hourlyDistribution: Array<{
        hour: number;
        visits: number;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

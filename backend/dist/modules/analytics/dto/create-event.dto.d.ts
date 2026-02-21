import { AnalyticsEventType } from '../entities/analytics.entity';
export declare class CreateEventDto {
    eventType: AnalyticsEventType;
    page?: string;
    resourceId?: string;
    metadata?: string;
}

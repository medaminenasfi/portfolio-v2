import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { CreateEventDto } from './dto/create-event.dto';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // Public endpoint - track events
  @Post('track')
  async trackEvent(@Body() createEventDto: CreateEventDto, @Request() req: any) {
    return this.analyticsService.trackEvent(createEventDto, req);
  }

  // Admin endpoints
  @Get()
  @UseGuards(JwtAuthGuard)
  getAnalytics(@Query() query: GetAnalyticsDto) {
    return this.analyticsService.getAnalytics(query);
  }

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('overview')
  @UseGuards(JwtAuthGuard)
  getOverview(@Query() query: GetAnalyticsDto) {
    return this.analyticsService.getOverviewStats(
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
  }

  @Get('traffic')
  @UseGuards(JwtAuthGuard)
  getTrafficStats(@Query() query: GetAnalyticsDto) {
    const dates = this.analyticsService['getDateRange'](
      query.period || '7d',
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
    return this.analyticsService.getTrafficStats(dates.startDate, dates.endDate);
  }

  @Get('content')
  @UseGuards(JwtAuthGuard)
  getContentStats(@Query() query: GetAnalyticsDto) {
    const dates = this.analyticsService['getDateRange'](
      query.period || '7d',
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
    return this.analyticsService.getContentStats(dates.startDate, dates.endDate);
  }

  @Get('engagement')
  @UseGuards(JwtAuthGuard)
  getEngagementStats(@Query() query: GetAnalyticsDto) {
    const dates = this.analyticsService['getDateRange'](
      query.period || '7d',
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
    return this.analyticsService.getEngagementStats(dates.startDate, dates.endDate);
  }

  @Get('technology')
  @UseGuards(JwtAuthGuard)
  getTechnologyStats(@Query() query: GetAnalyticsDto) {
    const dates = this.analyticsService['getDateRange'](
      query.period || '7d',
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
    return this.analyticsService.getTechnologyStats(dates.startDate, dates.endDate);
  }

  @Get('geography')
  @UseGuards(JwtAuthGuard)
  getGeographyStats(@Query() query: GetAnalyticsDto) {
    const dates = this.analyticsService['getDateRange'](
      query.period || '7d',
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
    return this.analyticsService.getGeographyStats(dates.startDate, dates.endDate);
  }

  @Get('trends')
  @UseGuards(JwtAuthGuard)
  getTrends(@Query() query: GetAnalyticsDto) {
    const dates = this.analyticsService['getDateRange'](
      query.period || '7d',
      query.startDate ? new Date(query.startDate) : undefined,
      query.endDate ? new Date(query.endDate) : undefined,
    );
    return this.analyticsService.getTrends(dates.startDate, dates.endDate);
  }

  @Get('realtime')
  @UseGuards(JwtAuthGuard)
  getRealTimeStats() {
    return this.analyticsService.getRealTimeStats();
  }
}

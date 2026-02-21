import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsEvent, AnalyticsSummary } from './entities/analytics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsEvent, AnalyticsSummary])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

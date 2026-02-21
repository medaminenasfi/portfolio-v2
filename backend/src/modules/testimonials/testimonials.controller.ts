import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialsDto } from './dto/query-testimonials.dto';
import { BulkUpdateStatusDto, BulkDeleteDto } from './dto/bulk-operations.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  // Public endpoint - anyone can submit testimonial
  @Post()
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  // Admin endpoints - require authentication
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: QueryTestimonialsDto) {
    return this.testimonialsService.findAll(query);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  getStatistics() {
    return this.testimonialsService.getStatistics();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTestimonialDto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard)
  approve(@Param('id', ParseUUIDPipe) id: string, @Body('adminNotes') adminNotes?: string) {
    return this.testimonialsService.approve(id, adminNotes);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard)
  reject(@Param('id', ParseUUIDPipe) id: string, @Body('adminNotes') adminNotes?: string) {
    return this.testimonialsService.reject(id, adminNotes);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.remove(id);
  }

  // Bulk operations
  @Patch('bulk/status')
  @UseGuards(JwtAuthGuard)
  bulkUpdateStatus(@Body() bulkUpdateDto: BulkUpdateStatusDto) {
    return this.testimonialsService.bulkUpdateStatus(bulkUpdateDto);
  }

  @Delete('bulk/delete')
  @UseGuards(JwtAuthGuard)
  bulkDelete(@Body() bulkDeleteDto: BulkDeleteDto) {
    return this.testimonialsService.bulkDelete(bulkDeleteDto);
  }
}

// Public controller for approved testimonials
@Controller('public/testimonials')
export class PublicTestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  getApprovedTestimonials(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 10;
    return this.testimonialsService.getApprovedTestimonials(limitNum);
  }

  @Post()
  async createTestimonial(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }
}

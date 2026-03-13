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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { QueryTestimonialsDto } from './dto/query-testimonials.dto';
import { BulkUpdateStatusDto, BulkDeleteDto } from './dto/bulk-operations.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('testimonials')
@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  // Public endpoint - anyone can submit testimonial
  @Post()
  @ApiOperation({ summary: 'Submit a new testimonial (public)' })
  @ApiBody({ type: CreateTestimonialDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Testimonial submitted successfully',
    schema: {
      example: {
        id: 'uuid-string',
        clientName: 'John Doe',
        company: 'Tech Corp',
        position: 'CEO',
        content: 'Excellent work! Highly recommended.',
        rating: 5,
        status: 'pending',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid data' 
  })
  create(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }

  // Admin endpoints - require authentication
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get all testimonials with filtering (admin)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'approved', 'rejected'], description: 'Filter by status' })
  @ApiQuery({ name: 'rating', required: false, type: Number, description: 'Filter by rating (1-5)' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in client name and content' })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonials retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: 'uuid-string',
            clientName: 'John Doe',
            company: 'Tech Corp',
            position: 'CEO',
            content: 'Excellent work!',
            rating: 5,
            status: 'pending',
            createdAt: '2024-01-01T00:00:00.000Z'
          }
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  findAll(@Query() query: QueryTestimonialsDto) {
    return this.testimonialsService.findAll(query);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get testimonials statistics (admin)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Statistics retrieved successfully',
    schema: {
      example: {
        totalTestimonials: 50,
        pendingTestimonials: 5,
        approvedTestimonials: 40,
        rejectedTestimonials: 5,
        averageRating: 4.5,
        ratingsDistribution: {
          5: 25,
          4: 15,
          3: 8,
          2: 2,
          1: 0
        },
        recentSubmissions: 12
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  getStatistics() {
    return this.testimonialsService.getStatistics();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get testimonial by ID (admin)' })
  @ApiParam({ 
    name: 'id', 
    description: 'Testimonial UUID', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonial retrieved successfully',
    type: CreateTestimonialDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Testimonial not found' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update testimonial (admin)' })
  @ApiParam({ 
    name: 'id', 
    description: 'Testimonial UUID', 
    type: 'string' 
  })
  @ApiBody({ type: UpdateTestimonialDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonial updated successfully',
    type: CreateTestimonialDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Testimonial not found' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTestimonialDto: UpdateTestimonialDto) {
    return this.testimonialsService.update(id, updateTestimonialDto);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Approve testimonial (admin)' })
  @ApiParam({ 
    name: 'id', 
    description: 'Testimonial UUID', 
    type: 'string' 
  })
  @ApiBody({
    description: 'Admin notes for approval',
    schema: {
      type: 'object',
      properties: {
        adminNotes: {
          type: 'string',
          description: 'Optional admin notes',
          example: 'Client verified, approved for display'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonial approved successfully',
    schema: {
      example: {
        id: 'uuid-string',
        status: 'approved',
        adminNotes: 'Client verified, approved for display',
        approvedAt: '2024-01-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Testimonial not found' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  approve(@Param('id', ParseUUIDPipe) id: string, @Body('adminNotes') adminNotes?: string) {
    return this.testimonialsService.approve(id, adminNotes);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Reject testimonial (admin)' })
  @ApiParam({ 
    name: 'id', 
    description: 'Testimonial UUID', 
    type: 'string' 
  })
  @ApiBody({
    description: 'Admin notes for rejection',
    schema: {
      type: 'object',
      properties: {
        adminNotes: {
          type: 'string',
          description: 'Optional admin notes for rejection',
          example: 'Content inappropriate for display'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonial rejected successfully',
    schema: {
      example: {
        id: 'uuid-string',
        status: 'rejected',
        adminNotes: 'Content inappropriate for display',
        rejectedAt: '2024-01-01T12:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Testimonial not found' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  reject(@Param('id', ParseUUIDPipe) id: string, @Body('adminNotes') adminNotes?: string) {
    return this.testimonialsService.reject(id, adminNotes);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Delete testimonial (admin)' })
  @ApiParam({ 
    name: 'id', 
    description: 'Testimonial UUID', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonial deleted successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Testimonial not found' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.testimonialsService.remove(id);
  }

  // Bulk operations
  @Patch('bulk/status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Bulk update testimonial status (admin)' })
  @ApiBody({ type: BulkUpdateStatusDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonials updated successfully',
    schema: {
      example: {
        updated: 5,
        message: '5 testimonials updated successfully'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  bulkUpdateStatus(@Body() bulkUpdateDto: BulkUpdateStatusDto) {
    return this.testimonialsService.bulkUpdateStatus(bulkUpdateDto);
  }

  @Delete('bulk/delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Bulk delete testimonials (admin)' })
  @ApiBody({ type: BulkDeleteDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Testimonials deleted successfully',
    schema: {
      example: {
        deleted: 3,
        message: '3 testimonials deleted successfully'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  bulkDelete(@Body() bulkDeleteDto: BulkDeleteDto) {
    return this.testimonialsService.bulkDelete(bulkDeleteDto);
  }
}

// Public controller for approved testimonials
@ApiTags('public-testimonials')
@Controller('public/testimonials')
export class PublicTestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @ApiOperation({ summary: 'Get approved testimonials (public)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of results (default: 10)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Approved testimonials retrieved successfully',
    schema: {
      example: [
        {
          id: 'uuid-string',
          clientName: 'John Doe',
          company: 'Tech Corp',
          position: 'CEO',
          content: 'Excellent work! Highly recommended.',
          rating: 5,
          status: 'approved',
          createdAt: '2024-01-01T00:00:00.000Z'
        }
      ]
    }
  })
  getApprovedTestimonials(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 10;
    return this.testimonialsService.getApprovedTestimonials(limitNum);
  }

  @Post()
  @ApiOperation({ summary: 'Submit a new testimonial (public)' })
  @ApiBody({ type: CreateTestimonialDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Testimonial submitted successfully',
    schema: {
      example: {
        id: 'uuid-string',
        clientName: 'Jane Smith',
        company: 'Design Studio',
        position: 'Creative Director',
        content: 'Amazing work! Very professional and creative.',
        rating: 5,
        status: 'pending',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid data' 
  })
  async createTestimonial(@Body() createTestimonialDto: CreateTestimonialDto) {
    return this.testimonialsService.create(createTestimonialDto);
  }
}

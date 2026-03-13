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
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiConsumes,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { BulkPublishDto, BulkDeleteDto, BulkFeatureDto } from './dto/bulk-operations.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectMedia, MediaType } from './entities/project-media.entity';

@ApiTags('projects')
@ApiBearerAuth('JWT-auth')
@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Project created successfully',
    schema: {
      example: {
        id: 'uuid-string',
        title: 'My Awesome Project',
        description: 'Detailed project description',
        category: 'web',
        status: 'draft',
        isFeatured: false,
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid data' 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized' 
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects with filtering and pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'category', required: false, enum: ['web', 'mobile', 'desktop', 'ai', 'other'], description: 'Filter by category' })
  @ApiQuery({ name: 'status', required: false, enum: ['draft', 'published', 'archived'], description: 'Filter by status' })
  @ApiQuery({ name: 'featured', required: false, type: Boolean, description: 'Filter featured projects' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in title and description' })
  @ApiResponse({ 
    status: 200, 
    description: 'Projects retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: 'uuid-string',
            title: 'My Awesome Project',
            category: 'web',
            status: 'published',
            isFeatured: true
          }
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    }
  })
  findAll(@Query() query: QueryProjectsDto) {
    return this.projectsService.findAll(query);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get projects statistics' })
  @ApiResponse({ 
    status: 200, 
    description: 'Statistics retrieved successfully',
    schema: {
      example: {
        totalProjects: 25,
        publishedProjects: 20,
        draftProjects: 5,
        featuredProjects: 8,
        projectsByCategory: {
          web: 15,
          mobile: 5,
          desktop: 3,
          ai: 2
        },
        recentActivity: 12
      }
    }
  })
  getStatistics() {
    return this.projectsService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Project retrieved successfully',
    type: CreateProjectDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found' 
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID', 
    type: 'string' 
  })
  @ApiBody({ type: UpdateProjectDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Project updated successfully',
    type: CreateProjectDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid data' 
  })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete project' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 204, 
    description: 'Project deleted successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found' 
  })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.projectsService.remove(id);
  }

  @Post(':id/duplicate')
  @ApiOperation({ summary: 'Duplicate project' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID to duplicate', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Project duplicated successfully',
    schema: {
      example: {
        id: 'new-uuid-string',
        title: 'My Awesome Project (Copy)',
        description: 'Detailed project description',
        category: 'web',
        status: 'draft'
      }
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found' 
  })
  duplicate(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.duplicate(id);
  }

  // Bulk operations
  @Patch('bulk/publish')
  @ApiOperation({ summary: 'Bulk publish/unpublish projects' })
  @ApiBody({ type: BulkPublishDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Projects updated successfully',
    schema: {
      example: {
        updated: 5,
        message: '5 projects updated successfully'
      }
    }
  })
  bulkPublish(@Body() bulkPublishDto: BulkPublishDto) {
    return this.projectsService.bulkPublish(bulkPublishDto);
  }

  @Delete('bulk/delete')
  @ApiOperation({ summary: 'Bulk delete projects' })
  @ApiBody({ type: BulkDeleteDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Projects deleted successfully',
    schema: {
      example: {
        deleted: 3,
        message: '3 projects deleted successfully'
      }
    }
  })
  bulkDelete(@Body() bulkDeleteDto: BulkDeleteDto) {
    return this.projectsService.bulkDelete(bulkDeleteDto);
  }

  @Patch('bulk/feature')
  @ApiOperation({ summary: 'Bulk feature/unfeature projects' })
  @ApiBody({ type: BulkFeatureDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Projects updated successfully',
    schema: {
      example: {
        updated: 4,
        message: '4 projects updated successfully'
      }
    }
  })
  bulkFeature(@Body() bulkFeatureDto: BulkFeatureDto) {
    return this.projectsService.bulkFeature(bulkFeatureDto);
  }

  // Media management
  @Post(':id/media')
  @ApiOperation({ summary: 'Upload media file for project' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID', 
    type: 'string' 
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload media file (image or video)',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Media file (jpeg, jpg, png, gif, webp, mp4, avi, mov) - Max 50MB'
        },
        category: {
          type: 'string',
          enum: ['banner', 'category', 'video', 'thumbnail'],
          description: 'Media category (optional, default: banner)'
        }
      },
      required: ['file']
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Media uploaded successfully',
    schema: {
      example: {
        id: 'media-uuid',
        type: 'image',
        filename: 'unique-filename.jpg',
        originalName: 'project-screenshot.jpg',
        mimeType: 'image/jpeg',
        size: 1024000,
        url: '/uploads/projects/unique-filename.jpg',
        category: 'banner',
        order: 0
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid file type or size' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found' 
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'projects');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov/;
        const fileExtname = extname(file.originalname).toLowerCase();
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && allowedTypes.test(fileExtname)) {
          return cb(null, true);
        } else {
          return cb(new BadRequestException('Only image and video files are allowed'), false);
        }
      },
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit
      },
    }),
  )
  async uploadMedia(
    @Param('id', ParseUUIDPipe) projectId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('category') category?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    console.log('Uploading media for project:', projectId);
    console.log('ProjectId type:', typeof projectId);
    console.log('File details:', {
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    });
    console.log('Category:', category);

    const mediaType = file.mimetype.startsWith('image/') ? MediaType.IMAGE : MediaType.VIDEO;
    
    const mediaData: Partial<ProjectMedia> = {
      type: mediaType,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/projects/${file.filename}`,
    };

    // Validate category
    const validCategories = ['banner', 'category', 'video', 'thumbnail'];
    const categoryType = category && validCategories.includes(category) ? category : 'banner';
    
    console.log('Saving media with category:', categoryType);
    console.log('Calling addMedia with projectId:', projectId, 'and mediaData:', mediaData);
    return this.projectsService.addMedia(projectId, mediaData, categoryType as 'banner' | 'category' | 'video' | 'thumbnail');
  }

  @Patch(':id/media/order')
  @ApiOperation({ summary: 'Update media order for project' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID', 
    type: 'string' 
  })
  @ApiBody({
    description: 'Media order array',
    schema: {
      example: [
        { id: 'media-uuid-1', order: 0 },
        { id: 'media-uuid-2', order: 1 }
      ]
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Media order updated successfully' 
  })
  updateMediaOrder(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body() mediaOrders: { id: string; order: number }[],
  ) {
    return this.projectsService.updateMediaOrder(projectId, mediaOrders);
  }

  @Delete('media/:mediaId')
  @ApiOperation({ summary: 'Remove media from project' })
  @ApiParam({ 
    name: 'mediaId', 
    description: 'Media UUID', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Media removed successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Media not found' 
  })
  removeMedia(@Param('mediaId', ParseUUIDPipe) mediaId: string) {
    return this.projectsService.removeMedia(mediaId);
  }

  @Patch(':id/cover-image')
  @ApiOperation({ summary: 'Set project cover image' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID', 
    type: 'string' 
  })
  @ApiBody({
    description: 'Media ID to set as cover',
    schema: {
      type: 'object',
      properties: {
        mediaId: {
          type: 'string',
          description: 'Media UUID to set as cover image'
        }
      },
      required: ['mediaId']
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Cover image set successfully' 
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project or media not found' 
  })
  setCoverImage(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body('mediaId', ParseUUIDPipe) mediaId: string,
  ) {
    return this.projectsService.setCoverImage(projectId, mediaId);
  }
}

// Public controller (no auth required)
@ApiTags('public-projects')
@Controller('public/projects')
export class PublicProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects (public access)' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiQuery({ name: 'category', required: false, enum: ['web', 'mobile', 'desktop', 'ai', 'other'], description: 'Filter by category' })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search in title and description' })
  @ApiResponse({ 
    status: 200, 
    description: 'Projects retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: 'uuid-string',
            title: 'My Awesome Project',
            category: 'web',
            status: 'published',
            isFeatured: true,
            shortSummary: 'Brief project description'
          }
        ],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1
      }
    }
  })
  getAllProjects(@Query() query: QueryProjectsDto) {
    // Return all projects regardless of status (for frontend to show all projects)
    return this.projectsService.findAll(query);
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured projects (public access)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limit number of results' })
  @ApiResponse({ 
    status: 200, 
    description: 'Featured projects retrieved successfully',
    schema: {
      example: {
        data: [
          {
            id: 'uuid-string',
            title: 'Featured Project',
            category: 'web',
            shortSummary: 'Brief description',
            coverImage: '/uploads/projects/cover.jpg'
          }
        ],
        total: 1
      }
    }
  })
  getFeaturedProjects(@Query() query: QueryProjectsDto) {
    return this.projectsService.findAll({ ...query, featured: true, status: 'published' as any });
  }

  @Get('by-category/:category')
  @ApiOperation({ summary: 'Get projects by category (public access)' })
  @ApiParam({ 
    name: 'category', 
    description: 'Project category', 
    enum: ['web', 'mobile', 'desktop', 'ai', 'other'],
    type: 'string' 
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Projects by category retrieved successfully' 
  })
  getProjectsByCategory(
    @Param('category') category: string,
    @Query() query: QueryProjectsDto,
  ) {
    return this.projectsService.findAll({ ...query, category: category as any, status: 'published' as any });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by ID (public access)' })
  @ApiParam({ 
    name: 'id', 
    description: 'Project UUID', 
    type: 'string' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Project retrieved successfully',
    type: CreateProjectDto
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Project not found' 
  })
  getProjectById(@Param('id', ParseUUIDPipe) id: string) {
    // Return any project by ID regardless of status
    return this.projectsService.findOne(id);
  }
}

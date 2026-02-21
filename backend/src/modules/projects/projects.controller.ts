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

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() query: QueryProjectsDto) {
    return this.projectsService.findAll(query);
  }

  @Get('statistics')
  getStatistics() {
    return this.projectsService.getStatistics();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.projectsService.remove(id);
  }

  @Post(':id/duplicate')
  duplicate(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.duplicate(id);
  }

  // Bulk operations
  @Patch('bulk/publish')
  bulkPublish(@Body() bulkPublishDto: BulkPublishDto) {
    return this.projectsService.bulkPublish(bulkPublishDto);
  }

  @Delete('bulk/delete')
  bulkDelete(@Body() bulkDeleteDto: BulkDeleteDto) {
    return this.projectsService.bulkDelete(bulkDeleteDto);
  }

  @Patch('bulk/feature')
  bulkFeature(@Body() bulkFeatureDto: BulkFeatureDto) {
    return this.projectsService.bulkFeature(bulkFeatureDto);
  }

  // Media management
  @Post(':id/media')
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
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const mediaType = file.mimetype.startsWith('image/') ? MediaType.IMAGE : MediaType.VIDEO;
    
    const mediaData: Partial<ProjectMedia> = {
      type: mediaType,
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: `/uploads/projects/${file.filename}`,
    };

    return this.projectsService.addMedia(projectId, mediaData);
  }

  @Patch(':id/media/order')
  updateMediaOrder(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body() mediaOrders: { id: string; order: number }[],
  ) {
    return this.projectsService.updateMediaOrder(projectId, mediaOrders);
  }

  @Delete('media/:mediaId')
  removeMedia(@Param('mediaId', ParseUUIDPipe) mediaId: string) {
    return this.projectsService.removeMedia(mediaId);
  }

  @Patch(':id/cover-image')
  setCoverImage(
    @Param('id', ParseUUIDPipe) projectId: string,
    @Body('mediaId', ParseUUIDPipe) mediaId: string,
  ) {
    return this.projectsService.setCoverImage(projectId, mediaId);
  }
}

// Public controller (no auth required)
@Controller('public/projects')
export class PublicProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects(@Query() query: QueryProjectsDto) {
    return this.projectsService.findAll({ ...query, status: 'published' as any });
  }

  @Get('featured')
  getFeaturedProjects(@Query() query: QueryProjectsDto) {
    return this.projectsService.findAll({ ...query, featured: true, status: 'published' as any });
  }

  @Get('by-category/:category')
  getProjectsByCategory(
    @Param('category') category: string,
    @Query() query: QueryProjectsDto,
  ) {
    return this.projectsService.findAll({ ...query, category: category as any, status: 'published' as any });
  }
}

import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { QueryProjectsDto } from './dto/query-projects.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ProjectMedia, MediaType } from './entities/project-media.entity';

@Controller('public/projects')
export class PublicProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll(@Query() query: QueryProjectsDto) {
    return this.projectsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectsService.findOne(id);
  }

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
}

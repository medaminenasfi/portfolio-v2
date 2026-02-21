import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  Res,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { ResumeService } from './resume.service';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { promises as fs } from 'fs';
import { createReadStream } from 'fs';

@Controller('resume')
export class ResumeController {
  constructor(private readonly resumeService: ResumeService) {}

  // Upload new resume (Admin only)
  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'resume');
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = uuidv4();
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
          return cb(new BadRequestException('Only PDF files are allowed'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
    }),
  )
  async uploadResume(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title?: string,
    @Body('description') description?: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.resumeService.uploadResume(file, title, description);
  }

  // Get current resume info (Public)
  @Get('current')
  async getCurrentResumeInfo() {
    return this.resumeService.getResumeInfo();
  }

  // Download current resume (Public)
  @Get('download')
  async downloadCurrentResume(@Res() res: Response) {
    try {
      const { filePath, filename, mimeType } = await this.resumeService.serveResume();
      
      // Check if file exists
      await fs.access(filePath);
      
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      throw new NotFoundException('Resume file not found');
    }
  }

  // Serve resume for preview (Public)
  @Get('serve')
  async serveCurrentResume(@Res() res: Response) {
    try {
      const { filePath, filename, mimeType } = await this.resumeService.serveResume();
      
      // Check if file exists
      await fs.access(filePath);
      
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      throw new NotFoundException('Resume file not found');
    }
  }

  // Get all resumes (Admin only)
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllResumes() {
    return this.resumeService.getAllResumes();
  }

  // Get specific resume info (Admin only)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getResumeInfo(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumeService.getResumeInfo(id);
  }

  // Download specific resume (Admin only)
  @Get(':id/download')
  @UseGuards(JwtAuthGuard)
  async downloadResume(@Param('id', ParseUUIDPipe) id: string, @Res() res: Response) {
    try {
      const { filePath, filename, mimeType } = await this.resumeService.serveResume(id);
      
      // Check if file exists
      await fs.access(filePath);
      
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } catch (error) {
      throw new NotFoundException('Resume file not found');
    }
  }

  // Update resume metadata (Admin only)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateResume(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ) {
    return this.resumeService.updateResume(id, updateResumeDto);
  }

  // Delete resume (Admin only)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteResume(@Param('id', ParseUUIDPipe) id: string) {
    await this.resumeService.deleteResume(id);
    return { message: 'Resume deleted successfully' };
  }
}

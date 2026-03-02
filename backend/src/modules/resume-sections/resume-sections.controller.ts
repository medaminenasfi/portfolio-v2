import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { ResumeSectionsService } from './resume-sections.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Controller('resume-sections')
export class ResumeSectionsController {
  constructor(private readonly resumeSectionsService: ResumeSectionsService) {}

  // Work Experience endpoints
  @Get('work-experience')
  getWorkExperience() {
    return this.resumeSectionsService.getAllWorkExperience();
  }

  @Get('work-experience/:id')
  @UseGuards(JwtAuthGuard)
  getWorkExperienceById(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumeSectionsService.getWorkExperienceById(id);
  }

  @Post('work-experience')
  @UseGuards(JwtAuthGuard)
  createWorkExperience(@Body() createDto: any) {
    return this.resumeSectionsService.createWorkExperience(createDto);
  }

  @Patch('work-experience/:id')
  @UseGuards(JwtAuthGuard)
  updateWorkExperience(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: any) {
    return this.resumeSectionsService.updateWorkExperience(id, updateDto);
  }

  @Delete('work-experience/:id')
  @UseGuards(JwtAuthGuard)
  deleteWorkExperience(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumeSectionsService.deleteWorkExperience(id);
  }

  @Patch('work-experience/reorder')
  @UseGuards(JwtAuthGuard)
  reorderWorkExperience(@Body() reorderDto: { ids: string[]; orderIndexes: number[] }) {
    return this.resumeSectionsService.reorderWorkExperience(reorderDto);
  }

  // Education endpoints
  @Get('education')
  getEducation() {
    return this.resumeSectionsService.getAllEducation();
  }

  @Post('education')
  @UseGuards(JwtAuthGuard)
  createEducation(@Body() createDto: any) {
    return this.resumeSectionsService.createEducation(createDto);
  }

  @Patch('education/:id')
  @UseGuards(JwtAuthGuard)
  updateEducation(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: any) {
    return this.resumeSectionsService.updateEducation(id, updateDto);
  }

  @Delete('education/:id')
  @UseGuards(JwtAuthGuard)
  deleteEducation(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumeSectionsService.deleteEducation(id);
  }

  @Patch('education/reorder')
  @UseGuards(JwtAuthGuard)
  reorderEducation(@Body() reorderDto: { ids: string[]; orderIndexes: number[] }) {
    return this.resumeSectionsService.reorderEducation(reorderDto);
  }

  // Skills endpoints
  @Post('skills/upload-photo')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(process.cwd(), 'uploads', 'skills');
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (!allowed.includes(file.mimetype)) {
          return cb(new BadRequestException('Only PNG, JPG, or WEBP images are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  uploadSkillPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Return relative path that frontend can use (served via /uploads)
    const relativePath = `/uploads/skills/${file.filename}`;
    return {
      url: relativePath,
      filename: file.filename,
    };
  }

  @Get('skills')
  getSkills(@Query('category') category?: string) {
    return this.resumeSectionsService.getAllSkills(category);
  }

  @Post('skills')
  @UseGuards(JwtAuthGuard)
  createSkill(@Body() createDto: any) {
    return this.resumeSectionsService.createSkill(createDto);
  }

  @Patch('skills/:id')
  @UseGuards(JwtAuthGuard)
  updateSkill(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: any) {
    return this.resumeSectionsService.updateSkill(id, updateDto);
  }

  @Delete('skills/:id')
  @UseGuards(JwtAuthGuard)
  deleteSkill(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumeSectionsService.deleteSkill(id);
  }

  @Patch('skills/reorder')
  @UseGuards(JwtAuthGuard)
  reorderSkills(@Body() reorderDto: { ids: string[]; orderIndexes: number[] }) {
    return this.resumeSectionsService.reorderSkills(reorderDto);
  }

  // Certifications endpoints
  @Get('certifications')
  getCertifications() {
    return this.resumeSectionsService.getAllCertifications();
  }

  @Post('certifications')
  @UseGuards(JwtAuthGuard)
  createCertification(@Body() createDto: any) {
    return this.resumeSectionsService.createCertification(createDto);
  }

  @Patch('certifications/:id')
  @UseGuards(JwtAuthGuard)
  updateCertification(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: any) {
    return this.resumeSectionsService.updateCertification(id, updateDto);
  }

  @Delete('certifications/:id')
  @UseGuards(JwtAuthGuard)
  deleteCertification(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumeSectionsService.deleteCertification(id);
  }

  @Patch('certifications/reorder')
  @UseGuards(JwtAuthGuard)
  reorderCertifications(@Body() reorderDto: { ids: string[]; orderIndexes: number[] }) {
    return this.resumeSectionsService.reorderCertifications(reorderDto);
  }

  // Languages endpoints
  @Get('languages')
  getLanguages() {
    return this.resumeSectionsService.getAllLanguages();
  }

  @Post('languages')
  @UseGuards(JwtAuthGuard)
  createLanguage(@Body() createDto: any) {
    return this.resumeSectionsService.createLanguage(createDto);
  }

  @Patch('languages/:id')
  @UseGuards(JwtAuthGuard)
  updateLanguage(@Param('id', ParseUUIDPipe) id: string, @Body() updateDto: any) {
    return this.resumeSectionsService.updateLanguage(id, updateDto);
  }

  @Delete('languages/:id')
  @UseGuards(JwtAuthGuard)
  deleteLanguage(@Param('id', ParseUUIDPipe) id: string) {
    return this.resumeSectionsService.deleteLanguage(id);
  }

  @Patch('languages/reorder')
  @UseGuards(JwtAuthGuard)
  reorderLanguages(@Body() reorderDto: { ids: string[]; orderIndexes: number[] }) {
    return this.resumeSectionsService.reorderLanguages(reorderDto);
  }

  // Get complete resume
  @Get('complete')
  getCompleteResume() {
    return this.resumeSectionsService.getCompleteResume();
  }
}

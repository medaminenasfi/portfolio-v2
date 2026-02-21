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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TechStackService } from './tech-stack.service';
import { CreateTechStackDto } from './dto/create-tech-stack.dto';
import { UpdateTechStackDto } from './dto/update-tech-stack.dto';
import { ReorderTechStackDto } from './dto/reorder-tech-stack.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TechCategory } from './entities/tech-stack.entity';

@Controller('tech-stack')
export class TechStackController {
  constructor(private readonly techStackService: TechStackService) {}

  // Public endpoints
  @Get()
  findAll(
    @Query('category') category?: TechCategory,
    @Query('showOnHomepage') showOnHomepage?: string,
  ) {
    const showHomepage = showOnHomepage === 'true' ? true : showOnHomepage === 'false' ? false : undefined;
    return this.techStackService.findAll(category, showHomepage);
  }

  @Get('categories')
  getCategories() {
    return this.techStackService.getCategories();
  }

  @Get('category/:category')
  getByCategory(@Param('category') category: TechCategory) {
    return this.techStackService.getByCategory(category);
  }

  @Get('homepage')
  getHomepageTech() {
    return this.techStackService.getHomepageTech();
  }

  @Get('statistics')
  getStatistics() {
    return this.techStackService.getStatistics();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.techStackService.findOne(id);
  }

  // Admin endpoints
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTechStackDto: CreateTechStackDto) {
    return this.techStackService.create(createTechStackDto);
  }

  @Post('upload-icon')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadIcon(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validate file type (images only)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Here you would save the file and return the URL
    // For now, returning a mock URL
    return {
      iconUrl: `/uploads/tech-icons/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
    };
  }

  @Patch('reorder')
  @UseGuards(JwtAuthGuard)
  reorder(@Body() reorderDto: ReorderTechStackDto) {
    return this.techStackService.reorder(reorderDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateTechStackDto: UpdateTechStackDto) {
    return this.techStackService.update(id, updateTechStackDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.techStackService.remove(id);
  }
}

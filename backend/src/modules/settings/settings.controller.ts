import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateStatDto, UpdateStatDto } from './dto/settings.dto';
import { CreateSocialLinkDto, UpdateSocialLinkDto } from './dto/social-link.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('api/settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  // Stats endpoints
  @Get('stats')
  @ApiOperation({ summary: 'Get all portfolio stats' })
  @ApiResponse({ status: 200, description: 'Return all portfolio stats' })
  async getAllStats() {
    const stats = await this.settingsService.getAllStats();
    return {
      statusCode: HttpStatus.OK,
      message: 'Stats retrieved successfully',
      data: stats,
    };
  }

  @Post('stats')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new portfolio stat' })
  @ApiResponse({ status: 201, description: 'Stat created successfully' })
  async createStat(@Body() createStatDto: CreateStatDto) {
    const stat = await this.settingsService.createStat(createStatDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Stat created successfully',
      data: stat,
    };
  }

  @Patch('stats/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a portfolio stat' })
  @ApiParam({ name: 'id', description: 'Stat ID' })
  @ApiResponse({ status: 200, description: 'Stat updated successfully' })
  async updateStat(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatDto: UpdateStatDto,
  ) {
    const stat = await this.settingsService.updateStat(id, updateStatDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Stat updated successfully',
      data: stat,
    };
  }

  @Delete('stats/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a portfolio stat' })
  @ApiParam({ name: 'id', description: 'Stat ID' })
  @ApiResponse({ status: 200, description: 'Stat deleted successfully' })
  async deleteStat(@Param('id', ParseIntPipe) id: number) {
    await this.settingsService.deleteStat(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Stat deleted successfully',
    };
  }

  // Social Links endpoints
  @Get('social-links')
  @ApiOperation({ summary: 'Get all social links' })
  @ApiResponse({ status: 200, description: 'Return all social links' })
  async getAllSocialLinks() {
    const socialLinks = await this.settingsService.getAllSocialLinks();
    return {
      statusCode: HttpStatus.OK,
      message: 'Social links retrieved successfully',
      data: socialLinks,
    };
  }

  @Post('social-links')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new social link' })
  @ApiResponse({ status: 201, description: 'Social link created successfully' })
  async createSocialLink(@Body() createSocialLinkDto: CreateSocialLinkDto) {
    const socialLink = await this.settingsService.createSocialLink(createSocialLinkDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Social link created successfully',
      data: socialLink,
    };
  }

  @Patch('social-links/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a social link' })
  @ApiParam({ name: 'id', description: 'Social link ID' })
  @ApiResponse({ status: 200, description: 'Social link updated successfully' })
  async updateSocialLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSocialLinkDto: UpdateSocialLinkDto,
  ) {
    const socialLink = await this.settingsService.updateSocialLink(id, updateSocialLinkDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Social link updated successfully',
      data: socialLink,
    };
  }

  @Delete('social-links/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a social link' })
  @ApiParam({ name: 'id', description: 'Social link ID' })
  @ApiResponse({ status: 200, description: 'Social link deleted successfully' })
  async deleteSocialLink(@Param('id', ParseIntPipe) id: number) {
    await this.settingsService.deleteSocialLink(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Social link deleted successfully',
    };
  }

  // Initialize default data
  @Post('initialize')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initialize default settings data' })
  @ApiResponse({ status: 200, description: 'Default data initialized successfully' })
  async initializeDefaultData() {
    await this.settingsService.initializeDefaultStats();
    await this.settingsService.initializeDefaultSocialLinks();
    return {
      statusCode: HttpStatus.OK,
      message: 'Default settings data initialized successfully',
    };
  }
}
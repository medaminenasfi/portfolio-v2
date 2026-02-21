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
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContactService } from './contact.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessagesDto } from './dto/query-contact-messages.dto';
import { BulkUpdateStatusDto, BulkUpdateLeadStatusDto, BulkDeleteDto, ConvertToLeadDto } from './dto/bulk-operations.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // Public endpoint - submit contact form
  @Post()
  @UseInterceptors(FileInterceptor('attachment'))
  async create(
    @Body() createContactMessageDto: CreateContactMessageDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any,
  ) {
    // Handle file upload if present
    if (file) {
      createContactMessageDto.attachment = `/uploads/contact/${file.filename}`;
    }

    // Capture metadata
    const metadata = {
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      referrer: req.headers.referer,
      source: req.headers.origin,
    };

    return this.contactService.create(createContactMessageDto, metadata);
  }

  // Admin endpoints
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: QueryContactMessagesDto) {
    return this.contactService.findAll(query);
  }

  @Get('statistics')
  @UseGuards(JwtAuthGuard)
  getStatistics() {
    return this.contactService.getStatistics();
  }

  @Get('unread-count')
  @UseGuards(JwtAuthGuard)
  getUnreadCount() {
    return this.contactService.getUnreadCount();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  searchMessages(@Query('q') searchTerm: string) {
    return this.contactService.searchMessages(searchTerm);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateContactMessageDto: UpdateContactMessageDto) {
    return this.contactService.update(id, updateContactMessageDto);
  }

  @Patch(':id/mark-read')
  @UseGuards(JwtAuthGuard)
  markAsRead(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.markAsRead(id);
  }

  @Patch(':id/mark-unread')
  @UseGuards(JwtAuthGuard)
  markAsUnread(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.markAsUnread(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.contactService.remove(id);
  }

  // Bulk operations
  @Patch('bulk/status')
  @UseGuards(JwtAuthGuard)
  bulkUpdateStatus(@Body() bulkUpdateDto: BulkUpdateStatusDto) {
    return this.contactService.bulkUpdateStatus(bulkUpdateDto);
  }

  @Patch('bulk/lead-status')
  @UseGuards(JwtAuthGuard)
  bulkUpdateLeadStatus(@Body() bulkUpdateDto: BulkUpdateLeadStatusDto) {
    return this.contactService.bulkUpdateLeadStatus(bulkUpdateDto);
  }

  @Patch('bulk/convert-to-lead')
  @UseGuards(JwtAuthGuard)
  convertToLead(@Body() convertToLeadDto: ConvertToLeadDto) {
    return this.contactService.convertToLead(convertToLeadDto);
  }

  @Delete('bulk/delete')
  @UseGuards(JwtAuthGuard)
  bulkDelete(@Body() bulkDeleteDto: BulkDeleteDto) {
    return this.contactService.bulkDelete(bulkDeleteDto);
  }
}

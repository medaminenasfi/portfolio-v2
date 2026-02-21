import { PartialType } from '@nestjs/mapped-types';
import { CreateContactMessageDto } from './create-contact-message.dto';
import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { MessageStatus, LeadStatus } from '../entities/contact-message.entity';

export class UpdateContactMessageDto extends PartialType(CreateContactMessageDto) {
  @IsEnum(MessageStatus)
  @IsOptional()
  status?: MessageStatus;

  @IsBoolean()
  @IsOptional()
  isRead?: boolean;

  @IsEnum(LeadStatus)
  @IsOptional()
  leadStatus?: LeadStatus;

  @IsString()
  @IsOptional()
  internalNotes?: string;

  @IsString()
  @IsOptional()
  adminReply?: string;
}

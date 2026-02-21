import { IsArray, IsUUID, IsEnum, IsOptional } from 'class-validator';
import { MessageStatus, LeadStatus } from '../entities/contact-message.entity';

export class BulkUpdateStatusDto {
  @IsArray()
  @IsUUID('4', { each: true })
  messageIds!: string[];

  @IsEnum(MessageStatus)
  status!: MessageStatus;

  @IsOptional()
  internalNotes?: string;
}

export class BulkUpdateLeadStatusDto {
  @IsArray()
  @IsUUID('4', { each: true })
  messageIds!: string[];

  @IsEnum(LeadStatus)
  leadStatus!: LeadStatus;

  @IsOptional()
  internalNotes?: string;
}

export class BulkDeleteDto {
  @IsArray()
  @IsUUID('4', { each: true })
  messageIds!: string[];
}

export class ConvertToLeadDto {
  @IsArray()
  @IsUUID('4', { each: true })
  messageIds!: string[];

  @IsOptional()
  leadNotes?: string;

  @IsOptional()
  followUpDate?: Date;
}

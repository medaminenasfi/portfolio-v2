import { IsString, IsEmail, IsEnum, IsOptional, IsDate, MaxLength } from 'class-validator';
import { ContactCategory } from '../entities/contact-message.entity';

export class CreateContactMessageDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @IsEnum(ContactCategory)
  category!: ContactCategory;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  company?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  budgetRange?: string;

  @IsDate()
  @IsOptional()
  deadline?: Date;

  @IsString()
  @MaxLength(200)
  subject!: string;

  @IsString()
  @MaxLength(2000)
  message!: string;

  @IsString()
  @IsOptional()
  attachment?: string; // URL to uploaded file
}

import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSocialLinkDto {
  @ApiProperty({ example: 'github', description: 'The social platform name' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'https://github.com/username', description: 'The social link URL' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  url?: string;

  @ApiProperty({ example: 'github', description: 'The icon name/class' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  icon: string;
}

export class UpdateSocialLinkDto {
  @ApiProperty({ example: 'github', description: 'The social platform name', required: false })
  @IsString()
  @MaxLength(50)
  name?: string;

  @ApiProperty({ example: 'https://github.com/username', description: 'The social link URL', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  url?: string;

  @ApiProperty({ example: 'github', description: 'The icon name/class', required: false })
  @IsString()
  @MaxLength(50)
  icon?: string;
}
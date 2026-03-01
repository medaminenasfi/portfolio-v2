import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatDto {
  @ApiProperty({ example: '2+', description: 'The stat number/value' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  number: string;

  @ApiProperty({ example: 'Years Experience', description: 'The stat label' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  label: string;
}

export class UpdateStatDto {
  @ApiProperty({ example: '3+', description: 'The stat number/value', required: false })
  @IsString()
  @MaxLength(20)
  number?: string;

  @ApiProperty({ example: 'Years Experience', description: 'The stat label', required: false })
  @IsString()
  @MaxLength(100)
  label?: string;
}
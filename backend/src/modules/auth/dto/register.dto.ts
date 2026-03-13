import { IsString, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Username for the new admin user',
    example: 'admin',
    type: String,
  })
  @IsString()
  username!: string;

  @ApiProperty({
    description: 'Email address for the new admin user',
    example: 'admin@example.com',
    type: String,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Password for the new admin user (minimum 6 characters)',
    example: 'password123',
    type: String,
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;
}

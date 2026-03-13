import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Username for authentication',
    example: 'admin',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  username!: string;

  @ApiProperty({
    description: 'Password for authentication',
    example: 'password123',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

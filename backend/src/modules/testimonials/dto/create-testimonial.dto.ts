import { IsString, IsEmail, IsOptional, IsNumber, Min, Max, Length } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @Length(2, 100)
  clientName!: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  company?: string;

  @IsString()
  @IsOptional()
  @Length(2, 100)
  position?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating!: number;

  @IsString()
  @Length(10, 1000)
  comment!: string;
}

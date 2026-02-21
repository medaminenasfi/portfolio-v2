import { IsArray, IsUUID, IsNumber } from 'class-validator';

export class ReorderTechStackDto {
  @IsArray()
  @IsUUID('4', { each: true })
  techIds!: string[];

  @IsArray()
  @IsNumber({}, { each: true })
  orderIndexes!: number[];
}

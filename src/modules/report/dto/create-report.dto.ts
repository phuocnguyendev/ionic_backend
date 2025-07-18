import { IsString, IsOptional } from 'class-validator';

export class CreatereportDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for report
}

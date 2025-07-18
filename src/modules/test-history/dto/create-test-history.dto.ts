import { IsString, IsOptional } from 'class-validator';

export class CreatetesthistoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for test-history
}

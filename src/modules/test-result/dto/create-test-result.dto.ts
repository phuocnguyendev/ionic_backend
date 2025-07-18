import { IsString, IsOptional } from 'class-validator';

export class CreatetestresultDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for test-result
}

import { IsString, IsOptional } from 'class-validator';

export class CreatetestandcenterreviewDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for test-and-center-review
}

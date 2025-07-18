import { IsString, IsOptional } from 'class-validator';

export class CreateanswersampleDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for answer-sample
}

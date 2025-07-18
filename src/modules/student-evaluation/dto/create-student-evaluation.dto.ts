import { IsString, IsOptional } from 'class-validator';

export class CreatestudentevaluationDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for student-evaluation
}

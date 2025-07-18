import { IsString, IsOptional } from 'class-validator';

export class CreatemockexamDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for mock-exam
}

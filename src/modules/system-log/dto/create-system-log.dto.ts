import { IsString, IsOptional } from 'class-validator';

export class CreatesystemlogDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // TODO: Add specific fields for system-log
}

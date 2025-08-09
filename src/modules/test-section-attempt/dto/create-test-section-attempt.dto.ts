import { ApiProperty } from '@nestjs/swagger';
import { test_section } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTestSectionAttemptDto {
  @ApiProperty({ example: 'uuid-session-id' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  session_id: string;

  @ApiProperty({ enum: test_section, example: 'listening' })
  @IsEnum(test_section)
  section: test_section;

  @ApiProperty({ example: 'not_started', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  is_completed?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  auto_submit?: boolean;
}

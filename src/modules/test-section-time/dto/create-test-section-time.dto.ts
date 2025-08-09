import { ApiProperty } from '@nestjs/swagger';
import { test_section } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTestSectionTimeDto {
  @ApiProperty({ example: 'uuid-test-id' })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  test_id: string;

  @ApiProperty({ enum: test_section, example: 'listening' })
  @IsEnum(test_section)
  section: test_section;

  @ApiProperty({ example: 2400, description: 'Duration in seconds' })
  @IsNumber()
  duration: number;
}

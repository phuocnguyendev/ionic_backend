import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class UpdateTestResultDto {
  @ApiProperty({
    description: 'ID của session test (optional)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  session_id?: string;

  @ApiProperty({
    description: 'Điểm listening (IELTS band score)',
    example: 7.5,
    minimum: 0,
    maximum: 9,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  listening_score?: number;

  @ApiProperty({
    description: 'Điểm reading (IELTS band score)',
    example: 8.0,
    minimum: 0,
    maximum: 9,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  reading_score?: number;

  @ApiProperty({
    description: 'Điểm writing (IELTS band score)',
    example: 6.5,
    minimum: 0,
    maximum: 9,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  writing_score?: number;

  @ApiProperty({
    description: 'Điểm speaking (IELTS band score)',
    example: 7.0,
    minimum: 0,
    maximum: 9,
    required: false,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  @Max(9)
  speaking_score?: number;

  @ApiProperty({
    description: 'Điểm thô listening (raw score)',
    example: 32,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  listening_raw_score?: number;

  @ApiProperty({
    description: 'Điểm thô reading (raw score)',
    example: 35,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  reading_raw_score?: number;

  @ApiProperty({
    description: 'Điểm thô writing (raw score)',
    example: 28,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  writing_raw_score?: number;

  @ApiProperty({
    description: 'Điểm thô speaking (raw score)',
    example: 30,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  speaking_raw_score?: number;

  @ApiProperty({
    description: 'Phản hồi và nhận xét',
    example: 'Cần cải thiện kỹ năng writing',
    required: false,
  })
  @IsOptional()
  @IsString()
  feedback?: string;
}

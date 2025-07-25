import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { Status, STATUSES } from '../../../constants';

export class UpdateTestSectionAttemptDto {
  @ApiProperty({
    description: 'Trạng thái attempt',
    example: 'in_progress',
    enum: STATUSES,
    required: false,
  })
  @IsOptional()
  @IsEnum(STATUSES)
  status?: Status;

  @ApiProperty({
    description: 'Thời gian bắt đầu phần thi',
    example: '2025-07-25T10:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  start_time?: string;

  @ApiProperty({
    description: 'Thời gian kết thúc phần thi',
    example: '2025-07-25T10:30:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  end_time?: string;

  @ApiProperty({
    description: 'Thời điểm nộp bài phần thi',
    example: '2025-07-25T10:30:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  submitted_at?: string;

  @ApiProperty({
    description: 'Thời gian làm bài (giây)',
    example: 1800,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  time_spent?: number;

  @ApiProperty({
    description: 'Phần thi đã hoàn thành',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_completed?: boolean;

  @ApiProperty({
    description: 'Tự động nộp do hết giờ',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  auto_submit?: boolean;
}

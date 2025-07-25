import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import {
  Status,
  STATUSES,
  TestSection,
  TEST_SECTIONS,
} from '../../../constants';

export class UpdateTestSessionDto {
  @ApiProperty({
    description: 'Trạng thái session',
    example: 'in_progress',
    enum: STATUSES,
    required: false,
  })
  @IsOptional()
  @IsEnum(STATUSES)
  status?: Status;

  @ApiProperty({
    description: 'Phần hiện tại đang làm',
    example: 'listening',
    enum: TEST_SECTIONS,
    required: false,
  })
  @IsOptional()
  @IsEnum(TEST_SECTIONS)
  current_section?: TestSection;

  @ApiProperty({
    description: 'Thời gian bắt đầu session',
    example: '2025-07-25T10:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  start_time?: string;

  @ApiProperty({
    description: 'Thời gian kết thúc session',
    example: '2025-07-25T13:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  end_time?: string;

  @ApiProperty({
    description: 'Số lần tạm dừng',
    example: 2,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  pause_count?: number;

  @ApiProperty({
    description: 'Tổng thời gian tạm dừng (giây)',
    example: 120,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  total_pause_time?: number;
}

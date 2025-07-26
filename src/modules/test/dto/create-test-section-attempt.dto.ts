import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import {
  Status,
  STATUSES,
  TestSection,
  TEST_SECTIONS,
} from '../../../constants';

export class CreateTestSectionAttemptDto {
  @ApiProperty({
    description: 'ID của test session',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid',
  })
  @IsUUID()
  session_id: string;

  @ApiProperty({
    description: 'Phần thi',
    example: 'listening',
    enum: TEST_SECTIONS,
  })
  @IsEnum(TEST_SECTIONS)
  section: TestSection;

  @ApiProperty({
    description: 'Trạng thái attempt',
    example: 'not_started',
    enum: STATUSES,
    required: false,
    default: Status.NOT_STARTED,
  })
  @IsOptional()
  @IsEnum(STATUSES)
  status?: Status;
}

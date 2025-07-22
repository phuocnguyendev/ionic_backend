import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
  PENDING = 'pending',
}

export class CreateCourseEnrollmentDto {
  @ApiProperty({
    description: 'ID người dùng',
    example: 'ae7e26d3-013d-456a-8f93-5bb1d34a2c9c',
  })
  @IsString()
  user_id: string;

  @ApiProperty({
    description: 'ID khóa học',
    example: 'ac9ab7d7-c2d2-4b1c-90f3-8e5b3b7a6c2f',
  })
  @IsString()
  course_id: string;

  @ApiPropertyOptional({
    description: 'Trạng thái đăng ký khóa học',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ACTIVE,
    example: EnrollmentStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus = EnrollmentStatus.ACTIVE;
}

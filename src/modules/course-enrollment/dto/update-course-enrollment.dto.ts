import { PartialType } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import {
  CreateCourseEnrollmentDto,
  EnrollmentStatus,
} from './create-course-enrollment.dto';

export class UpdateCourseEnrollmentDto extends PartialType(
  CreateCourseEnrollmentDto,
) {
  @IsOptional()
  @IsEnum(EnrollmentStatus)
  status?: EnrollmentStatus;
}

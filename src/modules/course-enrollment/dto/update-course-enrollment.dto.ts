import { PartialType } from '@nestjs/mapped-types';
import { CreatecourseenrollmentDto } from './create-course-enrollment.dto';

export class UpdatecourseenrollmentDto extends PartialType(CreatecourseenrollmentDto) {}

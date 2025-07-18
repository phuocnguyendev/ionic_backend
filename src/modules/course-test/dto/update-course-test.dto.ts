import { PartialType } from '@nestjs/mapped-types';
import { CreatecoursetestDto } from './create-course-test.dto';

export class UpdatecoursetestDto extends PartialType(CreatecoursetestDto) {}

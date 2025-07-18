import { PartialType } from '@nestjs/mapped-types';
import { CreatemockexamDto } from './create-mock-exam.dto';

export class UpdatemockexamDto extends PartialType(CreatemockexamDto) {}

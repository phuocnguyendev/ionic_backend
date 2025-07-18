import { PartialType } from '@nestjs/mapped-types';
import { CreatetestandcenterreviewDto } from './create-test-and-center-review.dto';

export class UpdatetestandcenterreviewDto extends PartialType(CreatetestandcenterreviewDto) {}

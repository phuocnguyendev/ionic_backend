import { PartialType } from '@nestjs/mapped-types';
import { CreateanswersampleDto } from './create-answer-sample.dto';

export class UpdateanswersampleDto extends PartialType(CreateanswersampleDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreatestudentevaluationDto } from './create-student-evaluation.dto';

export class UpdatestudentevaluationDto extends PartialType(CreatestudentevaluationDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreatereportDto } from './create-report.dto';

export class UpdatereportDto extends PartialType(CreatereportDto) {}

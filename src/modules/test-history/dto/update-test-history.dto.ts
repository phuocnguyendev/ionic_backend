import { PartialType } from '@nestjs/mapped-types';
import { CreatetesthistoryDto } from './create-test-history.dto';

export class UpdatetesthistoryDto extends PartialType(CreatetesthistoryDto) {}

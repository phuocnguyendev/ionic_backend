import { PartialType } from '@nestjs/mapped-types';
import { CreatetestresultDto } from './create-test-result.dto';

export class UpdatetestresultDto extends PartialType(CreatetestresultDto) {}

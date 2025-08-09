import { PartialType } from '@nestjs/swagger';
import { CreateTestSectionTimeDto } from './create-test-section-time.dto';

export class UpdateTestSectionTimeDto extends PartialType(
  CreateTestSectionTimeDto,
) {}

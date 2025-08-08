import { PartialType } from '@nestjs/swagger';
import { CreateTestSectionAttemptDto } from './create-test-section-attempt.dto';

export class UpdateTestSectionAttemptDto extends PartialType(
  CreateTestSectionAttemptDto,
) {}

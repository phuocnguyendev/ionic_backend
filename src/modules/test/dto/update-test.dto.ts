import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateTestDto } from './create-test.dto';

export class UpdateTestDto extends PartialType(OmitType(CreateTestDto, ['center_id'])) {}

import { PartialType } from '@nestjs/swagger';
import { CreateEnglishCenterDto } from './create-english_center.dto';

export class UpdateEnglishCenterDto extends PartialType(CreateEnglishCenterDto) {}

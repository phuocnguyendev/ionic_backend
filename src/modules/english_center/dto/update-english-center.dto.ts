import { PartialType } from '@nestjs/mapped-types';
import { CreateEnglishCenterDto } from './create-english-center.dto';

export class UpdateEnglishCenterDto extends PartialType(CreateEnglishCenterDto) {}

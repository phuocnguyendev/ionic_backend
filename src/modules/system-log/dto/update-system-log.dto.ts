import { PartialType } from '@nestjs/mapped-types';
import { CreatesystemlogDto } from './create-system-log.dto';

export class UpdatesystemlogDto extends PartialType(CreatesystemlogDto) {}

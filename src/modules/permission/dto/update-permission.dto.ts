import { PartialType } from '@nestjs/mapped-types';
import { CreatepermissionDto } from './create-permission.dto';

export class UpdatepermissionDto extends PartialType(CreatepermissionDto) {}

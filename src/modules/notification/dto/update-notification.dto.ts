import { PartialType } from '@nestjs/mapped-types';
import { CreatenotificationDto } from './create-notification.dto';

export class UpdatenotificationDto extends PartialType(CreatenotificationDto) {}

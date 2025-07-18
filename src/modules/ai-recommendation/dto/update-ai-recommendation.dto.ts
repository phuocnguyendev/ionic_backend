import { PartialType } from '@nestjs/mapped-types';
import { CreateairecommendationDto } from './create-ai-recommendation.dto';

export class UpdateairecommendationDto extends PartialType(CreateairecommendationDto) {}

import { Module } from '@nestjs/common';
import { airecommendationController } from './ai-recommendation.controller';
import { airecommendationService } from './ai-recommendation.service';

@Module({
  imports: [],
  controllers: [airecommendationController],
  providers: [airecommendationService],
  exports: [airecommendationService],
})
export class airecommendationModule {}

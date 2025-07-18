import { Module } from '@nestjs/common';
import { testandcenterreviewController } from './test-and-center-review.controller';
import { testandcenterreviewService } from './test-and-center-review.service';

@Module({
  imports: [],
  controllers: [testandcenterreviewController],
  providers: [testandcenterreviewService],
  exports: [testandcenterreviewService],
})
export class testandcenterreviewModule {}

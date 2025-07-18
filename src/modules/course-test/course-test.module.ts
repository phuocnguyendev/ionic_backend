import { Module } from '@nestjs/common';
import { coursetestController } from './course-test.controller';
import { coursetestService } from './course-test.service';

@Module({
  imports: [],
  controllers: [coursetestController],
  providers: [coursetestService],
  exports: [coursetestService],
})
export class coursetestModule {}

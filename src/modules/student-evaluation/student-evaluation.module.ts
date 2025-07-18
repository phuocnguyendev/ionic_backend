import { Module } from '@nestjs/common';
import { studentevaluationController } from './student-evaluation.controller';
import { studentevaluationService } from './student-evaluation.service';

@Module({
  imports: [],
  controllers: [studentevaluationController],
  providers: [studentevaluationService],
  exports: [studentevaluationService],
})
export class studentevaluationModule {}

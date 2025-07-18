import { Module } from '@nestjs/common';
import { courseenrollmentController } from './course-enrollment.controller';
import { courseenrollmentService } from './course-enrollment.service';

@Module({
  imports: [],
  controllers: [courseenrollmentController],
  providers: [courseenrollmentService],
  exports: [courseenrollmentService],
})
export class courseenrollmentModule {}

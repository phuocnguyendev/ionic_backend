import { Module } from '@nestjs/common';
import { CourseEnrollmentController } from './course-enrollment.controller';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CourseEnrollmentRepository } from './course-enrollment.repository';
import { CourseEnrollmentValidator } from './course-enrollment.validator';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CourseEnrollmentController],
  providers: [
    CourseEnrollmentService,
    CourseEnrollmentRepository,
    CourseEnrollmentValidator,
  ],
  exports: [CourseEnrollmentService],
})
export class CourseEnrollmentModule {}

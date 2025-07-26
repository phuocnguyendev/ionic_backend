import { Module } from '@nestjs/common';
import { CourseEnrollmentController } from './course-enrollment.controller';
import { CourseEnrollmentService } from './course-enrollment.service';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { CourseEnrollmentRepository } from './repositories';
import { CourseEnrollmentValidator } from './validators';

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

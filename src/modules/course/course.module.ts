import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { CourseValidator } from './course.validator';

@Module({
  imports: [PrismaModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository, CourseValidator],
  exports: [CourseService],
})
export class CourseModule {}

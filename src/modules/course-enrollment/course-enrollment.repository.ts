import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import {
  CourseEnrollmentCreateData,
  CourseEnrollmentData,
  CourseEnrollmentResponse,
  CourseEnrollmentUpdateData,
} from 'src/interfaces';
import { BaseRepository } from 'src/repository/baseRepository';

@Injectable()
export class CourseEnrollmentRepository extends BaseRepository<
  CourseEnrollmentData,
  any
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.course_enrollment);
  }

  async findAll(args?: any): Promise<CourseEnrollmentResponse[]> {
    return this.model.findMany({
      ...args,
      include: {
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
            avatar_url: true,
          },
        },
        course: {
          select: {
            course_id: true,
            course_name: true,
            description: true,
            duration: true,
          },
        },
      },
    });
  }

  async findById(
    enrollment_id: string,
  ): Promise<CourseEnrollmentResponse | null> {
    return this.model.findUnique({
      where: { enrollment_id },
      select: {
        enrollment_id: true,
        user_id: true,
        course_id: true,
        enrollment_date: true,
        status: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
            full_name: true,
          },
        },
        course: {
          select: {
            course_id: true,
            course_name: true,
          },
        },
      },
    });
  }

  async findByUserAndCourse(
    user_id: string,
    course_id: string,
  ): Promise<CourseEnrollmentData | null> {
    return this.model.findFirst({
      where: { user_id, course_id },
      select: {
        enrollment_id: true,
        user_id: true,
        course_id: true,
        enrollment_date: true,
        status: true,
      },
    });
  }

  async createCourseEnrollment(
    createData: CourseEnrollmentCreateData,
  ): Promise<CourseEnrollmentData> {
    const enrollment = await this.model.create({
      data: createData,
      select: {
        enrollment_id: true,
        user_id: true,
        course_id: true,
        enrollment_date: true,
        status: true,
      },
    });
    return enrollment;
  }

  async updateCourseEnrollment(
    enrollment_id: string,
    update: CourseEnrollmentUpdateData,
  ): Promise<CourseEnrollmentData> {
    const enrollment = await this.model.update({
      where: { enrollment_id },
      data: update,
      select: {
        enrollment_id: true,
        user_id: true,
        course_id: true,
        enrollment_date: true,
        status: true,
      },
    });
    return enrollment;
  }

  async deleteCourseEnrollment(enrollment_id: string): Promise<void> {
    await this.model.delete({
      where: { enrollment_id },
    });
  }
}

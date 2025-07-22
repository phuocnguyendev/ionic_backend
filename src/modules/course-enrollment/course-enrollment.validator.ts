import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseEnrollmentRepository } from './course-enrollment.repository';
import { CourseResponse } from 'src/interfaces';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class CourseEnrollmentValidator {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentRepository,
    private readonly prisma: PrismaService,
  ) {}

  async validateUserEnrollment(
    user_id: string,
    course_id: string,
  ): Promise<void> {
    const existingEnrollment =
      await this.courseEnrollmentRepository.findByUserAndCourse(
        user_id,
        course_id,
      );

    if (existingEnrollment && existingEnrollment.status === 'active') {
      throw new HttpException(
        'Người dùng đã đăng ký khóa học này rồi',
        HttpStatus.CONFLICT,
      );
    }
  }

  async validateEnrollmentStatus(
    enrollment_id: string,
    status: string,
  ): Promise<void> {
    const enrollment =
      await this.courseEnrollmentRepository.findById(enrollment_id);

    if (!enrollment) {
      throw new HttpException('Đăng ký không tồn tại', HttpStatus.NOT_FOUND);
    }

    if (enrollment.status !== status) {
      throw new HttpException(
        `Trạng thái đăng ký không hợp lệ: ${status}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async ensureCourseExists(course_id: string): Promise<CourseResponse> {
    const course = await this.prisma.course.findUnique({
      where: { course_id },
      select: {
        course_id: true,
        course_name: true,
        description: true,
        duration: true,
        center_id: true,
        logo_url: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!course) {
      throw new HttpException('Không tìm thấy khóa học', HttpStatus.NOT_FOUND);
    }

    return course;
  }

  async ensureUserExists(user_id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new HttpException('Không tìm thấy người dùng', HttpStatus.NOT_FOUND);
    }
  }
}

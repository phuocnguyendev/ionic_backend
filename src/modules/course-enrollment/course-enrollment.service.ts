import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import {
  CourseEnrollmentCreateData,
  CourseEnrollmentData,
  CourseEnrollmentResponse,
  CourseEnrollmentUpdateData,
} from 'src/interfaces';
import {
  CreateCourseEnrollmentDto,
  EnrollmentStatus,
} from './dto/create-course-enrollment.dto';
import { JoinCourseDto } from './dto/join-course.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';
import { CourseEnrollmentValidator } from './validators';
import { CourseEnrollmentRepository } from './repositories';

@Injectable()
export class CourseEnrollmentService {
  constructor(
    private readonly courseEnrollmentRepository: CourseEnrollmentRepository,
    private readonly courseEnrollmentValidator: CourseEnrollmentValidator,
  ) {}

  // Admin: Create enrollment
  async create(
    createDto: CreateCourseEnrollmentDto,
  ): Promise<CourseEnrollmentData> {
    // Validate that user hasn't already enrolled in this course
    await this.courseEnrollmentValidator.validateUserEnrollment(
      createDto.user_id,
      createDto.course_id,
    );

    // Ensure course exists
    await this.courseEnrollmentValidator.ensureCourseExists(
      createDto.course_id,
    );

    const createData: CourseEnrollmentCreateData = {
      user_id: createDto.user_id,
      course_id: createDto.course_id,
      status: createDto.status || EnrollmentStatus.ACTIVE,
      enrollment_date: new Date(),
    };

    return this.courseEnrollmentRepository.createCourseEnrollment(createData);
  }

  // User: Join course
  async joinCourse(
    user_id: string,
    joinDto: JoinCourseDto,
  ): Promise<CourseEnrollmentData> {
    // Validate that user hasn't already enrolled in this course
    await this.courseEnrollmentValidator.validateUserEnrollment(
      user_id,
      joinDto.course_id,
    );

    // Ensure course exists
    await this.courseEnrollmentValidator.ensureCourseExists(joinDto.course_id);

    const createData: CourseEnrollmentCreateData = {
      user_id,
      course_id: joinDto.course_id,
      status: EnrollmentStatus.ACTIVE,
      enrollment_date: new Date(),
    };

    return this.courseEnrollmentRepository.createCourseEnrollment(createData);
  }

  // User: Leave course
  async leaveCourse(user_id: string, course_id: string): Promise<void> {
    const enrollment =
      await this.courseEnrollmentRepository.findByUserAndCourse(
        user_id,
        course_id,
      );

    if (!enrollment) {
      throw new HttpException(
        'Bạn chưa đăng ký khóa học này',
        HttpStatus.NOT_FOUND,
      );
    }

    if (enrollment.status === EnrollmentStatus.DROPPED) {
      throw new HttpException(
        'Bạn đã rời khỏi khóa học này rồi',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Update status to dropped instead of deleting
    await this.courseEnrollmentRepository.updateCourseEnrollment(
      enrollment.enrollment_id,
      { status: EnrollmentStatus.DROPPED },
    );
  }

  // Admin: Find all enrollments
  async findAll(
    page = 1,
    pageSize = 30,
    searchText = '',
  ): Promise<BaseResponse<CourseEnrollmentResponse>> {
    const [data, count] =
      await this.courseEnrollmentRepository.findAllEnrollments(
        page,
        pageSize,
        searchText,
      );

    return new BaseResponse<CourseEnrollmentResponse>(data, count);
  }

  // Admin/User: Find one enrollment
  async findOne(enrollment_id: string): Promise<CourseEnrollmentResponse> {
    const enrollment =
      await this.courseEnrollmentRepository.findById(enrollment_id);

    if (!enrollment) {
      throw new HttpException(
        'Không tìm thấy đăng ký khóa học',
        HttpStatus.NOT_FOUND,
      );
    }

    return enrollment;
  }

  // Get user's enrollments
  async findByUser(user_id: string): Promise<CourseEnrollmentResponse[]> {
    return this.courseEnrollmentRepository.findByUserId(user_id);
  }

  // Admin: Update enrollment
  async update(
    enrollment_id: string,
    updateDto: UpdateCourseEnrollmentDto,
  ): Promise<CourseEnrollmentData> {
    const existingEnrollment =
      await this.courseEnrollmentRepository.findById(enrollment_id);

    if (!existingEnrollment) {
      throw new HttpException(
        'Không tìm thấy đăng ký khóa học',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateData: CourseEnrollmentUpdateData = {};

    if (updateDto.status) {
      updateData.status = updateDto.status;
    }

    return this.courseEnrollmentRepository.updateCourseEnrollment(
      enrollment_id,
      updateData,
    );
  }

  // Admin: Remove enrollment (soft delete by changing status)
  async remove(enrollment_id: string): Promise<void> {
    const enrollment =
      await this.courseEnrollmentRepository.findById(enrollment_id);

    if (!enrollment) {
      throw new HttpException(
        'Không tìm thấy đăng ký khóa học',
        HttpStatus.NOT_FOUND,
      );
    }

    // Soft delete by updating status to dropped
    await this.courseEnrollmentRepository.updateCourseEnrollment(
      enrollment_id,
      { status: EnrollmentStatus.DROPPED },
    );
  }

  // Admin: Hard delete enrollment (permanently remove)
  async hardDelete(enrollment_id: string): Promise<void> {
    const enrollment =
      await this.courseEnrollmentRepository.findById(enrollment_id);

    if (!enrollment) {
      throw new HttpException(
        'Không tìm thấy đăng ký khóa học',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.courseEnrollmentRepository.deleteCourseEnrollment(enrollment_id);
  }
}

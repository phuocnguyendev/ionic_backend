import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CourseResponse } from './interfaces/course.interface';

@Injectable()
export class CourseValidator {
  constructor(private readonly courseRepository: CourseRepository) {}

  async validateCourseName(course_name: string, center_id: string, course_id?: string): Promise<void> {
    const existingCourse = await this.courseRepository.findByName(course_name, center_id);
    
    if (existingCourse && existingCourse.course_id !== course_id) {
      throw new HttpException(
        'Tên khóa học đã tồn tại trong trung tâm này',
        HttpStatus.CONFLICT,
      );
    }
  }

  async ensureCourseExists(course_id: string): Promise<CourseResponse> {
    const course = await this.courseRepository.findById(course_id);
    
    if (!course) {
      throw new HttpException(
        'Không tìm thấy khóa học',
        HttpStatus.NOT_FOUND,
      );
    }
    
    return course;
  }

  async ensureCourseNotInUse(course_id: string): Promise<void> {
    // Check if course has enrollments or tests
    // This would require additional repository methods to check relationships
    // For now, we'll implement basic validation
  }
}

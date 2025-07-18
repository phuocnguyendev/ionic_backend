import { Injectable } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CourseValidator } from './course.validator';
import {
  CourseCreateData,
  CourseResponse,
  CourseUpdateData,
} from './interfaces/course.interface';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly courseValidator: CourseValidator,
  ) {}

  async create(createData: CourseCreateData): Promise<CourseResponse> {
    await this.courseValidator.validateCourseName(
      createData.course_name,
      createData.center_id,
    );

    const course = await this.courseRepository.createCourse(createData);
    return course;
  }

  async findAll(): Promise<CourseResponse[]> {
    return this.courseRepository.findAllCourses();
  }

  async findOne(course_id: string): Promise<CourseResponse> {
    return this.courseValidator.ensureCourseExists(course_id);
  }

  async findByCenter(center_id: string): Promise<CourseResponse[]> {
    return this.courseRepository.findByCenter(center_id);
  }

  async update(
    course_id: string,
    updateData: CourseUpdateData,
  ): Promise<CourseResponse> {
    await this.courseValidator.ensureCourseExists(course_id);

    if (updateData.course_name) {
      const currentCourse = await this.courseRepository.findById(course_id);
      if (currentCourse) {
        await this.courseValidator.validateCourseName(
          updateData.course_name,
          updateData.center_id || currentCourse.center_id,
          course_id,
        );
      }
    }

    const course = await this.courseRepository.updateCourse(
      course_id,
      updateData,
    );
    return course;
  }

  async remove(course_id: string): Promise<void> {
    await this.courseValidator.ensureCourseExists(course_id);
    await this.courseValidator.ensureCourseNotInUse(course_id);
    await this.courseRepository.deleteCourse(course_id);
  }
}

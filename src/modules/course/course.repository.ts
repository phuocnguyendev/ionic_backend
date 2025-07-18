import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from 'src/repository/baseRepository';
import {
  CourseData,
  CourseResponse,
} from './interfaces/course.interface';

@Injectable()
export class CourseRepository extends BaseRepository<CourseData, any> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.course);
  }

  async findById(course_id: string): Promise<CourseResponse | null> {
    return this.model.findUnique({
      where: { course_id },
      select: {
        course_id: true,
        course_name: true,
        description: true,
        center_id: true,
        duration: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
  }

  async findByName(course_name: string, center_id?: string): Promise<CourseData | null> {
    return this.model.findFirst({
      where: { 
        course_name,
        ...(center_id && { center_id }),
      },
      select: {
        course_id: true,
        course_name: true,
        description: true,
        center_id: true,
        duration: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAllCourses(): Promise<CourseResponse[]> {
    return this.model.findMany({
      orderBy: {
        course_name: 'asc',
      },
      select: {
        course_id: true,
        course_name: true,
        description: true,
        center_id: true,
        duration: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
  }

  async findByCenter(center_id: string): Promise<CourseResponse[]> {
    return this.model.findMany({
      where: { center_id },
      orderBy: {
        course_name: 'asc',
      },
      select: {
        course_id: true,
        course_name: true,
        description: true,
        center_id: true,
        duration: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
  }

  async createCourse(createData: any): Promise<CourseResponse> {
    const course = await this.model.create({
      data: createData,
      select: {
        course_id: true,
        course_name: true,
        description: true,
        center_id: true,
        duration: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
    return course;
  }

  async updateCourse(course_id: string, updateData: any): Promise<CourseResponse> {
    const course = await this.model.update({
      where: { course_id },
      data: updateData,
      select: {
        course_id: true,
        course_name: true,
        description: true,
        center_id: true,
        duration: true,
        created_at: true,
        updated_at: true,
        center: {
          select: {
            center_id: true,
            center_name: true,
          },
        },
      },
    });
    return course;
  }

  async deleteCourse(course_id: string): Promise<void> {
    await this.model.delete({
      where: { course_id },
    });
  }
}

import { CourseResponse } from '../../course/interfaces/course.interface';
import { TestResponse } from '../../test/interfaces/test.interface';

export interface CourseTestData {
  course_test_id: string;
  course_id: string;
  test_id: string;
  created_at?: Date;
}

export interface CourseTestResponse extends Pick<CourseTestData, 'course_test_id' | 'course_id' | 'test_id'> {}

export interface CourseTestCreateData extends Pick<CourseTestData, 'course_id' | 'test_id'> {}

export interface CourseTestWithRelations extends CourseTestData {
  course?: CourseResponse;
  test?: TestResponse;
}

// Utility types
export type CourseTestField = keyof CourseTestData;
export type CourseTestOptional = Partial<CourseTestData>;

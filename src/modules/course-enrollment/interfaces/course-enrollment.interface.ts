import { UserResponse } from '../../user/interfaces/user.interface';
import { CourseResponse } from '../../course/interfaces/course.interface';

export interface CourseEnrollmentData {
  enrollment_id: string;
  user_id: string;
  course_id: string;
  enrollment_date: Date;
  status: string;
}

export interface CourseEnrollmentCreateData
  extends Pick<CourseEnrollmentData, 'user_id' | 'course_id' | 'status'> {
  enrollment_date?: Date;
}

export interface CourseEnrollmentUpdateData
  extends Partial<Pick<CourseEnrollmentData, 'status' | 'enrollment_date'>> {}

export interface CourseEnrollmentResponse extends CourseEnrollmentData {
  user?: UserResponse;
  course?: CourseResponse;
}

// Utility types
export type CourseEnrollmentField = keyof CourseEnrollmentData;
export type EnrollmentStatus = CourseEnrollmentData['status'];
export type CourseEnrollmentOptional = Partial<CourseEnrollmentData>;

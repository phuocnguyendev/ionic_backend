import { EnglishCenterResponse } from '../../english_center/dto/interfaces/english_center.interface';

export interface CourseData {
  course_id: string;
  course_name: string;
  description?: string | null;
  duration: number;
  center_id: string;
  logo_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface CourseResponse
  extends Pick<
    CourseData,
    | 'course_id'
    | 'course_name'
    | 'description'
    | 'duration'
    | 'center_id'
    | 'logo_url'
    | 'created_at'
    | 'updated_at'
  > {
  center?: {
    center_id: string;
    center_name: string;
  };
}

export interface CourseCreateData
  extends Pick<
    CourseData,
    'course_name' | 'description' | 'duration' | 'center_id' | 'logo_url'
  > {}

export interface CourseUpdateData
  extends Partial<
    Pick<CourseData, 'course_name' | 'description' | 'duration' | 'center_id' | 'logo_url'>
  > {}

export interface CourseWithCenter extends CourseData {
  english_center?: EnglishCenterResponse;
}

// Utility types
export type CourseField = keyof CourseData;
export type CourseOptional = Partial<CourseData>;
export type CoursePublicData = Omit<CourseData, 'created_at' | 'updated_at'>;

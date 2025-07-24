import { CourseData, TestData } from 'src/interfaces';

export interface EnglishCenterData {
  center_id: string;
  center_name: string;
  address?: string | null;
  contact_email?: string | null;
  contact_phone?: string | null;
  logo_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface EnglishCenterResponse
  extends Pick<
    EnglishCenterData,
    | 'center_id'
    | 'center_name'
    | 'address'
    | 'contact_email'
    | 'contact_phone'
    | 'logo_url'
  > {}

export interface EnglishCenterCreateData
  extends Pick<
    EnglishCenterData,
    'center_name' | 'address' | 'contact_email' | 'contact_phone' | 'logo_url'
  > {}

export interface EnglishCenterUpdateData
  extends Partial<
    Pick<
      EnglishCenterData,
      'center_name' | 'address' | 'contact_email' | 'contact_phone' | 'logo_url'
    >
  > {}

export interface EnglishCenterDetailResponse extends EnglishCenterResponse {
  courses: Array<
    Pick<CourseData, 'course_id' | 'course_name' | 'duration' | 'logo_url'>
  >;
  tests: Array<
    Pick<
      TestData,
      | 'test_id'
      | 'test_name'
      | 'test_quarter'
      | 'test_date'
      | 'duration'
      | 'test_sections'
    >
  >;
}

// Utility types
export type EnglishCenterField = keyof EnglishCenterData;
export type EnglishCenterOptional = Partial<EnglishCenterData>;
export type EnglishCenterPublicData = Omit<
  EnglishCenterData,
  'created_at' | 'updated_at'
>;

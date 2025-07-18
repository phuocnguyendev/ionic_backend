import { EnglishCenterResponse } from '../../english_center/dto/interfaces/english_center.interface';

export interface MockExamData {
  mock_exam_id: string;
  mock_exam_name: string;
  description?: string | null;
  center_id: string;
  is_active: boolean;
  mock_exam_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface MockExamResponse extends Pick<MockExamData, 'mock_exam_id' | 'mock_exam_name' | 'description' | 'center_id' | 'is_active' | 'mock_exam_date'> {}

export interface MockExamCreateData extends Pick<MockExamData, 'mock_exam_name' | 'description' | 'center_id' | 'mock_exam_date'> {
  is_active?: boolean;
}

export interface MockExamUpdateData extends Partial<Pick<MockExamData, 'mock_exam_name' | 'description' | 'is_active' | 'mock_exam_date'>> {}

export interface MockExamWithCenter extends MockExamData {
  center?: EnglishCenterResponse;
}

// Utility types
export type MockExamField = keyof MockExamData;
export type MockExamStatus = MockExamData['is_active'];
export type MockExamOptional = Partial<MockExamData>;
export type MockExamPublicData = Omit<MockExamData, 'created_at' | 'updated_at'>;

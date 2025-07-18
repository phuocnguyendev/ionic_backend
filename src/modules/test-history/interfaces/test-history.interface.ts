import { UserResponse } from '../../user/interfaces/user.interface';
import { TestResponse } from '../../test/interfaces/test.interface';

export interface TestHistoryData {
  history_id: string;
  user_id: string;
  test_id: string;
  test_date: Date;
  test_status: string;
  total_score?: number | null;
  created_at?: Date;
}

export interface TestHistoryResponse extends Pick<TestHistoryData, 'history_id' | 'user_id' | 'test_id' | 'test_date' | 'test_status' | 'total_score'> {}

export interface TestHistoryCreateData extends Pick<TestHistoryData, 'user_id' | 'test_id' | 'test_date' | 'test_status' | 'total_score'> {}

export interface TestHistoryUpdateData extends Partial<Pick<TestHistoryData, 'test_date' | 'test_status' | 'total_score'>> {}

export interface TestHistoryWithRelations extends TestHistoryData {
  user?: UserResponse;
  test?: TestResponse;
}

// Utility types
export type TestHistoryField = keyof TestHistoryData;
export type TestStatus = TestHistoryData['test_status'];
export type TestHistoryOptional = Partial<TestHistoryData>;

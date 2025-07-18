import { UserResponse } from '../../user/interfaces/user.interface';
import { TestResponse } from '../../test/interfaces/test.interface';

export interface TestResultData {
  result_id: string;
  user_id: string;
  test_id: string;
  listening_score: number;
  reading_score: number;
  writing_score: number;
  speaking_score: number;
  overall_score: number;
  feedback?: string | null;
  created_at?: Date;
}

export interface TestResultResponse extends Pick<TestResultData, 'result_id' | 'user_id' | 'test_id' | 'listening_score' | 'reading_score' | 'writing_score' | 'speaking_score' | 'overall_score' | 'feedback'> {}

export interface TestResultCreateData extends Pick<TestResultData, 'user_id' | 'test_id' | 'listening_score' | 'reading_score' | 'writing_score' | 'speaking_score' | 'overall_score' | 'feedback'> {}

export interface TestResultUpdateData extends Partial<Pick<TestResultData, 'listening_score' | 'reading_score' | 'writing_score' | 'speaking_score' | 'overall_score' | 'feedback'>> {}

export interface TestResultWithRelations extends TestResultData {
  user?: UserResponse;
  test?: TestResponse;
}

// Utility types
export type TestResultField = keyof TestResultData;
export type TestResultScores = Pick<TestResultData, 'listening_score' | 'reading_score' | 'writing_score' | 'speaking_score' | 'overall_score'>;
export type TestResultOptional = Partial<TestResultData>;

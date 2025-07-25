import { TestResponse } from '../../test/interfaces/test.interface';
import { UserResponse } from '../../user/interfaces/user.interface';

export interface TestResultData {
  result_id: string;
  user_id: string;
  test_id: string;
  session_id?: string | null;

  // IELTS Band Scores (Decimal type from Prisma)
  listening_score: number;
  reading_score: number;
  writing_score: number;
  speaking_score: number;
  overall_score: number;

  // Raw scores for calculation
  listening_raw_score?: number | null;
  reading_raw_score?: number | null;
  writing_raw_score?: number | null;
  speaking_raw_score?: number | null;

  // Completion status
  is_completed?: boolean;
  completion_time?: Date | null;

  // Section completion tracking (new fields)
  listening_completed_at?: Date | null;
  reading_completed_at?: Date | null;
  writing_completed_at?: Date | null;
  speaking_completed_at?: Date | null;

  feedback?: string | null;
  created_at?: Date;
}

export interface TestResultResponse
  extends Pick<
    TestResultData,
    | 'result_id'
    | 'user_id'
    | 'test_id'
    | 'session_id'
    | 'listening_score'
    | 'reading_score'
    | 'writing_score'
    | 'speaking_score'
    | 'overall_score'
    | 'listening_raw_score'
    | 'reading_raw_score'
    | 'writing_raw_score'
    | 'speaking_raw_score'
    | 'is_completed'
    | 'completion_time'
    | 'listening_completed_at'
    | 'reading_completed_at'
    | 'writing_completed_at'
    | 'speaking_completed_at'
    | 'feedback'
    | 'created_at'
  > {
  user?: {
    user_id: string;
    username: string;
    email: string;
  };
  test?: {
    test_id: string;
    test_name: string;
    test_quarter: string;
    test_date: Date;
  };
}

export interface TestResultCreateData
  extends Pick<
    TestResultData,
    | 'user_id'
    | 'test_id'
    | 'session_id'
    | 'listening_score'
    | 'reading_score'
    | 'writing_score'
    | 'speaking_score'
    | 'listening_raw_score'
    | 'reading_raw_score'
    | 'writing_raw_score'
    | 'speaking_raw_score'
    | 'is_completed'
    | 'listening_completed_at'
    | 'reading_completed_at'
    | 'writing_completed_at'
    | 'speaking_completed_at'
    | 'feedback'
  > {}

export interface TestResultUpdateData
  extends Partial<
    Pick<
      TestResultData,
      | 'session_id'
      | 'listening_score'
      | 'reading_score'
      | 'writing_score'
      | 'speaking_score'
      | 'listening_raw_score'
      | 'reading_raw_score'
      | 'writing_raw_score'
      | 'speaking_raw_score'
      | 'listening_completed_at'
      | 'reading_completed_at'
      | 'writing_completed_at'
      | 'speaking_completed_at'
      | 'feedback'
    >
  > {}

export interface TestResultWithRelations extends TestResultData {
  user?: UserResponse;
  test?: TestResponse;
}

// Utility types
export type TestResultField = keyof TestResultData;
export type TestResultScores = Pick<
  TestResultData,
  | 'listening_score'
  | 'reading_score'
  | 'writing_score'
  | 'speaking_score'
  | 'overall_score'
>;
export type TestResultRawScores = Pick<
  TestResultData,
  | 'listening_raw_score'
  | 'reading_raw_score'
  | 'writing_raw_score'
  | 'speaking_raw_score'
>;
export type TestResultOptional = Partial<TestResultData>;

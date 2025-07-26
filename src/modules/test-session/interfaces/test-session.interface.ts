import { StatusType, TestSectionType } from '../../../constants';

export interface TestSessionData {
  session_id: string;
  user_id: string;
  test_id: string;
  status: StatusType;
  current_section?: TestSectionType | null;
  start_time?: Date | null;
  end_time?: Date | null;
  pause_count: number;
  total_pause_time: number; // seconds
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface TestSessionResponse extends TestSessionData {
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
    duration: number;
  };
  section_attempts?: TestSectionAttemptData[];
  section_submissions?: SectionSubmissionData[];
}

export interface TestSessionCreateData
  extends Pick<TestSessionData, 'user_id' | 'test_id'> {
  status?: StatusType;
  ip_address?: string;
  user_agent?: string;
}

export interface TestSessionUpdateData
  extends Partial<
    Pick<
      TestSessionData,
      | 'status'
      | 'current_section'
      | 'start_time'
      | 'end_time'
      | 'pause_count'
      | 'total_pause_time'
    >
  > {}

// Test Section Attempt interfaces
export interface TestSectionAttemptData {
  attempt_id: string;
  session_id: string;
  section: TestSectionType;
  status: StatusType;
  start_time?: Date | null;
  end_time?: Date | null;
  submitted_at?: Date | null;
  time_spent?: number | null; // seconds
  is_completed: boolean;
  auto_submit: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface TestSectionAttemptResponse extends TestSectionAttemptData {
  test_session?: TestSessionData;
}

export interface TestSectionAttemptCreateData
  extends Pick<TestSectionAttemptData, 'session_id' | 'section'> {
  status?: StatusType;
}

export interface TestSectionAttemptUpdateData
  extends Partial<
    Pick<
      TestSectionAttemptData,
      | 'status'
      | 'start_time'
      | 'end_time'
      | 'submitted_at'
      | 'time_spent'
      | 'is_completed'
      | 'auto_submit'
    >
  > {}

// Section Submission interfaces
export interface SectionSubmissionData {
  submission_id: string;
  session_id: string;
  section: TestSectionType;
  submitted_at: Date;
  submission_type: string; // 'manual' | 'auto_timeout'
  answers_count?: number | null;
  time_remaining?: number | null; // seconds
  created_at?: Date;
}

export interface SectionSubmissionResponse extends SectionSubmissionData {
  test_session?: TestSessionData;
}

export interface SectionSubmissionCreateData
  extends Pick<
    SectionSubmissionData,
    'session_id' | 'section' | 'submission_type'
  > {
  answers_count?: number;
  time_remaining?: number;
}

// Utility types
export type TestSessionField = keyof TestSessionData;
export type TestSectionAttemptField = keyof TestSectionAttemptData;
export type SectionSubmissionField = keyof SectionSubmissionData;

import { test_section } from '@prisma/client';
import { StatusType } from '../../../constants/enums';

export interface TestSectionAttemptData {
  attempt_id: string;
  session_id: string;
  section: test_section;
  status: StatusType;
  start_time?: Date | null;
  end_time?: Date | null;
  submitted_at?: Date | null;
  time_spent?: number | null;
  is_completed: boolean;
  auto_submit: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface TestSectionAttemptResponse extends TestSectionAttemptData {
  test_session?: {
    session_id: string;
    user_id: string;
    test_id: string;
    status: string;
  };
}

export interface TestSectionAttemptCreateData {
  session_id: string;
  section: test_section;
  status?: StatusType;
  is_completed?: boolean;
  auto_submit?: boolean;
}

export interface TestSectionAttemptUpdateData {
  status?: StatusType;
  start_time?: Date;
  end_time?: Date;
  submitted_at?: Date;
  time_spent?: number;
  is_completed?: boolean;
  auto_submit?: boolean;
}

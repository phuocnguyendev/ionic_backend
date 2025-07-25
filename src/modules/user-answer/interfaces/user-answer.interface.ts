import {
  TestQuestionData,
  QuestionOptionData,
} from '../../test/interfaces/test-question.interface';

export interface UserAnswerData {
  answer_id: string;
  result_id: string;
  question_id: string;
  user_id: string;
  option_id?: string | null;

  // Answer content
  answer_content?: string | null;
  answer_text?: string | null;

  // Scoring and evaluation
  score?: number | null;
  is_correct?: boolean | null;

  // Timing
  time_spent?: number | null; // seconds
  answered_at?: Date | null;

  // Additional data
  attempt_count: number;
  is_flagged: boolean;

  created_at?: Date;
  updated_at?: Date;
}

export interface UserAnswerResponse extends UserAnswerData {
  test_question?: TestQuestionData;
  question_option?: QuestionOptionData;
  user?: {
    user_id: string;
    username: string;
    email: string;
  };
}

export interface UserAnswerCreateData
  extends Pick<UserAnswerData, 'result_id' | 'question_id' | 'user_id'> {
  option_id?: string;
  answer_content?: string;
  answer_text?: string;
  time_spent?: number;
  is_flagged?: boolean;
}

export interface UserAnswerUpdateData
  extends Partial<
    Pick<
      UserAnswerData,
      | 'option_id'
      | 'answer_content'
      | 'answer_text'
      | 'score'
      | 'is_correct'
      | 'time_spent'
      | 'answered_at'
      | 'attempt_count'
      | 'is_flagged'
    >
  > {}

export interface UserAnswerStatistics {
  question_id: string;
  total_answers: number;
  correct_answers: number;
  incorrect_answers: number;
  average_score: number;
  average_time_spent: number;
  most_selected_option?: {
    option_id: string;
    content_text: string;
    selection_count: number;
  };
}

export interface UserProgressData {
  user_id: string;
  test_id: string;
  total_questions: number;
  answered_questions: number;
  flagged_questions: number;
  completion_percentage: number;
  section_progress: {
    section: string;
    total_questions: number;
    answered_questions: number;
    completion_percentage: number;
  }[];
}

export interface SectionScoreData {
  section: string;
  total_questions: number;
  answered_questions: number;
  correct_answers: number;
  total_score: number;
  max_possible_score: number;
  accuracy_percentage: number;
}

// Utility types
export type UserAnswerField = keyof UserAnswerData;
export type UserAnswerPublicData = Omit<UserAnswerData, 'user_id'>;
export type UserAnswerSafeResponse = Omit<UserAnswerResponse, 'user'>;

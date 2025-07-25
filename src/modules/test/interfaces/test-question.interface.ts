import { TestSectionType } from '../../../constants';

export interface TestQuestionData {
  question_id: string;
  test_id: string;
  section: TestSectionType;
  part_number?: number | null;
  question_number: number;
  parent_question_id?: string | null;

  content_html: string;
  instruction?: string | null;
  question_type?: string | null;

  // Media files
  audio_url?: string | null;
  image_url?: string | null;

  // Scoring
  marks?: number | null;
  difficulty_level?: string | null; // 'easy' | 'medium' | 'hard'

  // Writing specific
  word_limit_min?: number | null;
  word_limit_max?: number | null;
  time_limit?: number | null; // seconds

  created_at?: Date;
}

export interface TestQuestionResponse extends TestQuestionData {
  parent_question?: TestQuestionData | null;
  sub_questions?: TestQuestionData[];
  options?: QuestionOptionData[];
}

export interface TestQuestionCreateData
  extends Pick<
    TestQuestionData,
    'test_id' | 'section' | 'question_number' | 'content_html'
  > {
  part_number?: number;
  parent_question_id?: string;
  instruction?: string;
  question_type?: string;
  audio_url?: string;
  image_url?: string;
  marks?: number;
  difficulty_level?: string;
  word_limit_min?: number;
  word_limit_max?: number;
  time_limit?: number;
}

export interface TestQuestionUpdateData
  extends Partial<
    Omit<TestQuestionCreateData, 'test_id' | 'question_number'>
  > {}

// Question Option interfaces
export interface QuestionOptionData {
  option_id: string;
  question_id: string;
  content_html: string;
  content_text?: string | null;
  is_correct: boolean;
  option_index?: number | null;
  option_label?: string | null; // 'A', 'B', 'C', 'D'
  is_mixable?: boolean | null;
  explanation?: string | null;
  created_at?: Date;
}

export interface QuestionOptionCreateData
  extends Pick<
    QuestionOptionData,
    'question_id' | 'content_html' | 'is_correct'
  > {
  content_text?: string;
  option_index?: number;
  option_label?: string;
  is_mixable?: boolean;
  explanation?: string;
}

export interface QuestionOptionUpdateData
  extends Partial<Omit<QuestionOptionCreateData, 'question_id'>> {}

// Test Section Time interfaces
export interface TestSectionTimeData {
  id: string;
  test_id: string;
  section: TestSectionType;
  duration: number; // minutes or seconds
}

export interface TestSectionTimeCreateData
  extends Pick<TestSectionTimeData, 'test_id' | 'section' | 'duration'> {}

export interface TestSectionTimeUpdateData
  extends Pick<TestSectionTimeData, 'duration'> {}

// Utility types
export type TestQuestionField = keyof TestQuestionData;
export type QuestionOptionField = keyof QuestionOptionData;

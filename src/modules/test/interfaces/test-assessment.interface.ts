// Writing Assessment interfaces
export interface WritingAssessmentData {
  assessment_id: string;
  result_id: string;
  task_number: number; // 1 or 2

  // IELTS Writing Criteria Scores (0.0 - 9.0)
  task_achievement: number;
  coherence_cohesion: number;
  lexical_resource: number;
  grammar_accuracy: number;

  overall_task_score: number; // Average of 4 criteria
  word_count?: number | null;
  time_spent?: number | null; // seconds
  examiner_comments?: string | null;
  created_at?: Date;
}

export interface WritingAssessmentResponse extends WritingAssessmentData {
  test_result?: {
    result_id: string;
    user_id: string;
    test_id: string;
  };
}

export interface WritingAssessmentCreateData
  extends Pick<
    WritingAssessmentData,
    | 'result_id'
    | 'task_number'
    | 'task_achievement'
    | 'coherence_cohesion'
    | 'lexical_resource'
    | 'grammar_accuracy'
  > {
  word_count?: number;
  time_spent?: number;
  examiner_comments?: string;
}

export interface WritingAssessmentUpdateData
  extends Partial<
    Pick<
      WritingAssessmentData,
      | 'task_achievement'
      | 'coherence_cohesion'
      | 'lexical_resource'
      | 'grammar_accuracy'
      | 'word_count'
      | 'time_spent'
      | 'examiner_comments'
    >
  > {}

// Speaking Assessment interfaces
export interface SpeakingAssessmentData {
  assessment_id: string;
  result_id: string;

  // IELTS Speaking Criteria Scores (0.0 - 9.0)
  fluency_coherence: number;
  lexical_resource: number;
  grammar_accuracy: number;
  pronunciation: number;

  overall_speaking_score: number; // Average of 4 criteria
  total_duration?: number | null; // Total speaking time in seconds
  examiner_comments?: string | null;
  audio_recording_url?: string | null;
  created_at?: Date;
}

export interface SpeakingAssessmentResponse extends SpeakingAssessmentData {
  test_result?: {
    result_id: string;
    user_id: string;
    test_id: string;
  };
  speaking_parts?: SpeakingPartAttemptData[];
}

export interface SpeakingAssessmentCreateData
  extends Pick<
    SpeakingAssessmentData,
    | 'result_id'
    | 'fluency_coherence'
    | 'lexical_resource'
    | 'grammar_accuracy'
    | 'pronunciation'
  > {
  total_duration?: number;
  examiner_comments?: string;
  audio_recording_url?: string;
}

export interface SpeakingAssessmentUpdateData
  extends Partial<
    Pick<
      SpeakingAssessmentData,
      | 'fluency_coherence'
      | 'lexical_resource'
      | 'grammar_accuracy'
      | 'pronunciation'
      | 'total_duration'
      | 'examiner_comments'
      | 'audio_recording_url'
    >
  > {}

// Speaking Part Attempt interfaces
export interface SpeakingPartAttemptData {
  attempt_id: string;
  assessment_id: string;
  part_number: number; // 1, 2, or 3
  start_time?: Date | null;
  end_time?: Date | null;
  duration?: number | null; // seconds
  audio_url?: string | null;
  transcript?: string | null;
  part_score?: number | null;
  created_at?: Date;
}

export interface SpeakingPartAttemptCreateData
  extends Pick<SpeakingPartAttemptData, 'assessment_id' | 'part_number'> {
  start_time?: Date;
  end_time?: Date;
  duration?: number;
  audio_url?: string;
  transcript?: string;
  part_score?: number;
}

export interface SpeakingPartAttemptUpdateData
  extends Partial<
    Pick<
      SpeakingPartAttemptData,
      | 'start_time'
      | 'end_time'
      | 'duration'
      | 'audio_url'
      | 'transcript'
      | 'part_score'
    >
  > {}

// Utility types
export type WritingAssessmentField = keyof WritingAssessmentData;
export type SpeakingAssessmentField = keyof SpeakingAssessmentData;
export type SpeakingPartAttemptField = keyof SpeakingPartAttemptData;

// IELTS criteria scoring types
export interface IELTSWritingCriteria {
  task_achievement: number;
  coherence_cohesion: number;
  lexical_resource: number;
  grammar_accuracy: number;
}

export interface IELTSSpeakingCriteria {
  fluency_coherence: number;
  lexical_resource: number;
  grammar_accuracy: number;
  pronunciation: number;
}

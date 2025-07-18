import { UserResponse } from '../../user/interfaces/user.interface';
import { TestResultResponse } from '../../test-result/interfaces/test-result.interface';

export interface StudentEvaluationData {
  evaluation_id: string;
  result_id: string;
  evaluator_id: string;
  evaluation_comments?: string | null;
  evaluation_score: number;
  created_at?: Date;
}

export interface StudentEvaluationResponse extends Pick<StudentEvaluationData, 'evaluation_id' | 'result_id' | 'evaluator_id' | 'evaluation_comments' | 'evaluation_score'> {}

export interface StudentEvaluationCreateData extends Pick<StudentEvaluationData, 'result_id' | 'evaluator_id' | 'evaluation_comments' | 'evaluation_score'> {}

export interface StudentEvaluationUpdateData extends Partial<Pick<StudentEvaluationData, 'evaluation_comments' | 'evaluation_score'>> {}

export interface StudentEvaluationWithRelations extends StudentEvaluationData {
  result?: TestResultResponse;
  evaluator?: UserResponse;
}

// Utility types
export type StudentEvaluationField = keyof StudentEvaluationData;
export type StudentEvaluationScore = StudentEvaluationData['evaluation_score'];
export type StudentEvaluationOptional = Partial<StudentEvaluationData>;

import { TestResultResponse } from '../../test-result/interfaces/test-result.interface';

export interface AIRecommendationData {
  recommendation_id: string;
  result_id: string;
  recommended_changes: string;
  created_at?: Date;
}

export interface AIRecommendationResponse extends Pick<AIRecommendationData, 'recommendation_id' | 'result_id' | 'recommended_changes' | 'created_at'> {}

export interface AIRecommendationCreateData extends Pick<AIRecommendationData, 'result_id' | 'recommended_changes'> {}

export interface AIRecommendationUpdateData extends Partial<Pick<AIRecommendationData, 'recommended_changes'>> {}

export interface AIRecommendationWithResult extends AIRecommendationData {
  test_result?: TestResultResponse;
}

// Utility types
export type AIRecommendationField = keyof AIRecommendationData;
export type RecommendationChanges = AIRecommendationData['recommended_changes'];
export type AIRecommendationOptional = Partial<AIRecommendationData>;

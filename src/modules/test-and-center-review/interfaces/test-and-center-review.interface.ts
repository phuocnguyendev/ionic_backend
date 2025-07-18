import { UserResponse } from '../../user/interfaces/user.interface';
import { TestResponse } from '../../test/interfaces/test.interface';
import { EnglishCenterResponse } from '../../english_center/dto/interfaces/english_center.interface';

export interface TestAndCenterReviewData {
  review_id: string;
  user_id: string;
  test_id: string;
  center_id: string;
  rating: number;
  review_comments?: string | null;
  created_at?: Date;
}

export interface TestAndCenterReviewResponse extends Pick<TestAndCenterReviewData, 'review_id' | 'user_id' | 'test_id' | 'center_id' | 'rating' | 'review_comments' | 'created_at'> {}

export interface TestAndCenterReviewCreateData extends Pick<TestAndCenterReviewData, 'user_id' | 'test_id' | 'center_id' | 'rating' | 'review_comments'> {}

export interface TestAndCenterReviewUpdateData extends Partial<Pick<TestAndCenterReviewData, 'rating' | 'review_comments'>> {}

export interface TestAndCenterReviewWithRelations extends TestAndCenterReviewData {
  user?: UserResponse;
  test?: TestResponse;
  center?: EnglishCenterResponse;
}

// Utility types
export type TestAndCenterReviewField = keyof TestAndCenterReviewData;
export type ReviewRating = TestAndCenterReviewData['rating'];
export type ReviewComments = TestAndCenterReviewData['review_comments'];
export type TestAndCenterReviewOptional = Partial<TestAndCenterReviewData>;

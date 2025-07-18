import { TestResponse } from '../../test/interfaces/test.interface';

export interface AnswerSampleData {
  sample_id: string;
  test_id: string;
  sample_answer?: string | null;
  created_at?: Date;
}

export interface AnswerSampleResponse extends Pick<AnswerSampleData, 'sample_id' | 'test_id' | 'sample_answer'> {}

export interface AnswerSampleCreateData extends Pick<AnswerSampleData, 'test_id' | 'sample_answer'> {}

export interface AnswerSampleUpdateData extends Partial<Pick<AnswerSampleData, 'sample_answer'>> {}

export interface AnswerSampleWithTest extends AnswerSampleData {
  test?: TestResponse;
}

// Utility types
export type AnswerSampleField = keyof AnswerSampleData;
export type SampleAnswer = AnswerSampleData['sample_answer'];
export type AnswerSampleOptional = Partial<AnswerSampleData>;

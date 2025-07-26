import { TestSectionType, TestQuarterType } from '../../../constants';

export interface TestData {
  test_id: string;
  test_name: string;
  test_quarter: TestQuarterType;
  test_date: Date;
  duration: number;
  center_id: string;
  test_sections: TestSectionType[];
  logo_url?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export interface TestResponse
  extends Pick<
    TestData,
    | 'test_id'
    | 'test_name'
    | 'test_quarter'
    | 'test_date'
    | 'duration'
    | 'center_id'
    | 'test_sections'
    | 'logo_url'
  > {
  center?: {
    center_id: string;
    center_name: string;
  };
}

export interface TestCreateData
  extends Pick<
    TestData,
    'test_name' | 'test_quarter' | 'duration' | 'center_id' | 'test_sections'
  > {
  test_date: string | Date;
  logo_url?: string;
}

export interface TestUpdateData
  extends Partial<
    Pick<
      TestData,
      'test_name' | 'test_quarter' | 'duration' | 'test_sections' | 'logo_url'
    >
  > {
  test_date?: string | Date;
}

export interface TestWithCenter extends TestData {
  center?: {
    center_id: string;
    center_name: string;
  };
}

// Utility types
export type TestField = keyof TestData;
export type TestQuarter = TestData['test_quarter'];
export type TestSection = TestData['test_sections'][number];
export type TestOptional = Partial<TestData>;

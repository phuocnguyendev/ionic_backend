export interface TestData {
  test_id: string;
  test_name: string;
  test_quarter: 'q1' | 'q2' | 'q3' | 'q4';
  test_date: Date;
  duration: number;
  center_id: string;
  test_sections: ('listening' | 'reading' | 'writing' | 'speaking')[];
  created_at?: Date;
  updated_at?: Date;
}

export interface TestResponse extends Pick<TestData, 'test_id' | 'test_name' | 'test_quarter' | 'test_date' | 'duration' | 'center_id' | 'test_sections'> {
  center?: {
    center_id: string;
    center_name: string;
  };
}

export interface TestCreateData extends Pick<TestData, 'test_name' | 'test_quarter' | 'duration' | 'center_id' | 'test_sections'> {
  test_date: string | Date;
}

export interface TestUpdateData extends Partial<Pick<TestData, 'test_name' | 'test_quarter' | 'duration' | 'test_sections'>> {
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

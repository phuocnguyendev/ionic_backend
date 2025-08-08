import { test_section } from '@prisma/client';

export interface TestSectionTimeData {
  id: string;
  test_id: string;
  section: test_section;
  duration: number;
}

export interface TestSectionTimeResponse extends TestSectionTimeData {
  test?: {
    test_id: string;
    test_name: string;
  };
}

export interface TestSectionTimeCreateData {
  test_id: string;
  section: test_section;
  duration: number;
}

export interface TestSectionTimeUpdateData {
  test_id?: string;
  section?: test_section;
  duration?: number;
}

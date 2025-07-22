import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TestRepository } from './test.repository';
import { TestResponse } from './interfaces/test.interface';

@Injectable()
export class TestValidator {
  constructor(private readonly testRepository: TestRepository) {}

  async validateTestName(
    test_name: string,
    center_id: string,
    test_id?: string,
  ): Promise<void> {
    const existingTest = await this.testRepository.findByName(
      test_name,
      center_id,
    );

    if (existingTest && existingTest.test_id !== test_id) {
      throw new HttpException(
        'Tên bài kiểm tra đã tồn tại trong trung tâm này',
        HttpStatus.CONFLICT,
      );
    }
  }

  async ensureTestExists(test_id: string): Promise<TestResponse> {
    const test = await this.testRepository.findById(test_id);

    if (!test) {
      throw new HttpException(
        'Không tìm thấy bài kiểm tra',
        HttpStatus.NOT_FOUND,
      );
    }

    return test;
  }

  async ensureTestNotInUse(test_id: string): Promise<void> {
    const hasResults = await this.testRepository.hasTestResults(test_id);
    if (hasResults) {
      throw new HttpException(
        'Bài kiểm tra đã có kết quả, không thể chỉnh sửa hoặc xóa',
        HttpStatus.CONFLICT,
      );
    }
  }

  async validateTestDate(test_date: Date): Promise<void> {
    const now = new Date();

    if (test_date < now) {
      throw new HttpException(
        'Ngày kiểm tra không được trong quá khứ',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateTestSections(
    test_sections: ('listening' | 'reading' | 'writing' | 'speaking')[],
  ): Promise<void> {
    if (!test_sections || test_sections.length === 0) {
      throw new HttpException(
        'Bài kiểm tra phải có ít nhất một phần thi',
        HttpStatus.BAD_REQUEST,
      );
    }

    const validSections = ['listening', 'reading', 'writing', 'speaking'];
    const invalidSections = test_sections.filter(
      (section) => !validSections.includes(section),
    );

    if (invalidSections.length > 0) {
      throw new HttpException(
        `Phần thi không hợp lệ: ${invalidSections.join(', ')}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check for duplicate sections
    const uniqueSections = [...new Set(test_sections)];
    if (uniqueSections.length !== test_sections.length) {
      throw new HttpException(
        'Không được có phần thi trùng lặp',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateDuration(duration: number): Promise<void> {
    if (duration <= 0) {
      throw new HttpException(
        'Thời gian kiểm tra phải lớn hơn 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (duration > 480) {
      // 8 hours maximum
      throw new HttpException(
        'Thời gian kiểm tra không được vượt quá 8 giờ (480 phút)',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

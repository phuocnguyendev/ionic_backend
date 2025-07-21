import { Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import {
  TestCreateData,
  TestResponse,
  TestUpdateData,
} from './interfaces/test.interface';
import { TestRepository } from './test.repository';
import { TestValidator } from './test.validator';

@Injectable()
export class TestService {
  constructor(
    private readonly testRepository: TestRepository,
    private readonly testValidator: TestValidator,
  ) {}

  async create(createData: TestCreateData): Promise<TestResponse> {
    // Convert test_date to Date if it's a string
    const testDate =
      typeof createData.test_date === 'string'
        ? new Date(createData.test_date)
        : createData.test_date;

    // Validate input data
    await this.testValidator.validateTestName(
      createData.test_name,
      createData.center_id,
    );
    await this.testValidator.validateTestDate(testDate);
    await this.testValidator.validateTestSections(createData.test_sections);
    await this.testValidator.validateDuration(createData.duration);

    const test = await this.testRepository.createTest({
      ...createData,
      test_date: testDate,
    });
    return test;
  }

  async findAll(
    page = 1,
    pageSize = 30,
    searchText = '',
  ): Promise<BaseResponse<TestResponse>> {
    const [data, count] = await this.testRepository.paginateTests(
      page,
      pageSize,
      searchText,
    );

    return new BaseResponse<TestResponse>(data, count);
  }

  async findOne(test_id: string): Promise<TestResponse> {
    return this.testValidator.ensureTestExists(test_id);
  }

  async findByCenter(center_id: string): Promise<TestResponse[]> {
    return this.testRepository.findByCenter(center_id);
  }

  async findByQuarter(
    test_quarter: 'q1' | 'q2' | 'q3' | 'q4',
  ): Promise<TestResponse[]> {
    return this.testRepository.findByQuarter(test_quarter);
  }

  async update(
    test_id: string,
    updateData: TestUpdateData,
  ): Promise<TestResponse> {
    await this.testValidator.ensureTestExists(test_id);

    if (updateData.test_name) {
      const currentTest = await this.testRepository.findById(test_id);
      if (currentTest) {
        await this.testValidator.validateTestName(
          updateData.test_name,
          currentTest.center_id,
          test_id,
        );
      }
    }

    if (updateData.test_date) {
      const testDate =
        typeof updateData.test_date === 'string'
          ? new Date(updateData.test_date)
          : updateData.test_date;
      await this.testValidator.validateTestDate(testDate);
      updateData.test_date = testDate;
    }

    if (updateData.test_sections) {
      await this.testValidator.validateTestSections(updateData.test_sections);
    }

    if (updateData.duration) {
      await this.testValidator.validateDuration(updateData.duration);
    }

    const test = await this.testRepository.updateTest(test_id, updateData);
    return test;
  }

  async remove(test_id: string): Promise<void> {
    await this.testValidator.ensureTestExists(test_id);
    await this.testValidator.ensureTestNotInUse(test_id);
    await this.testRepository.deleteTest(test_id);
  }
}

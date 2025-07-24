import { Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import {
  TestResultCreateData,
  TestResultResponse,
  TestResultUpdateData,
} from './interfaces/test-result.interface';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { TestResultRepository } from './test-result.repository';
import { TestResultValidator } from './test-result.validator';
import { calculateOverallScore } from './utils/score.utils';

@Injectable()
export class TestResultService {
  constructor(
    private readonly testResultRepository: TestResultRepository,
    private readonly testResultValidator: TestResultValidator,
  ) {}

  private transformCreateDto(dto: CreateTestResultDto): TestResultCreateData {
    return {
      ...dto,
      completion_time: dto.completion_time ? new Date(dto.completion_time) : null,
    };
  }

  private transformUpdateDto(dto: UpdateTestResultDto): TestResultUpdateData {
    return {
      ...dto,
      completion_time: dto.completion_time ? new Date(dto.completion_time) : undefined,
    };
  }

  async create(createDto: CreateTestResultDto): Promise<TestResultResponse> {
    const createData = this.transformCreateDto(createDto);
    
    // Validate user and test existence
    await this.testResultValidator.validateUserAndTest(createData.user_id, createData.test_id);
    
    // Validate scores
    await this.testResultValidator.validateScores({
      listening_score: createData.listening_score,
      reading_score: createData.reading_score,
      writing_score: createData.writing_score,
      speaking_score: createData.speaking_score,
    });

    // Check for duplicate results
    await this.testResultValidator.checkDuplicateResult(createData.user_id, createData.test_id);

    // Tự động tính overall_score
    const overall_score = calculateOverallScore(
      createData.listening_score,
      createData.reading_score,
      createData.writing_score,
      createData.speaking_score,
    );

    const testResult = await this.testResultRepository.createTestResult({
      ...createData,
      overall_score,
    });
    return testResult;
  }

  async findAll(
    page = 1,
    pageSize = 30,
    searchText = '',
  ): Promise<BaseResponse<TestResultResponse>> {
    const [data, count] = await this.testResultRepository.paginateTestResults(
      page,
      pageSize,
      searchText,
    );

    return new BaseResponse<TestResultResponse>(data, count);
  }

  async findOne(result_id: string): Promise<TestResultResponse> {
    return this.testResultValidator.ensureTestResultExists(result_id);
  }

  async findByUser(user_id: string): Promise<TestResultResponse[]> {
    return this.testResultRepository.findByUser(user_id);
  }

  async findByTest(test_id: string): Promise<TestResultResponse[]> {
    return this.testResultRepository.findByTest(test_id);
  }

  async update(
    result_id: string,
    updateDto: UpdateTestResultDto,
  ): Promise<TestResultResponse> {
    const updateData = this.transformUpdateDto(updateDto);
    
    await this.testResultValidator.ensureTestResultExists(result_id);

    // Validate scores if they are being updated
    if (updateData.listening_score !== undefined || 
        updateData.reading_score !== undefined || 
        updateData.writing_score !== undefined || 
        updateData.speaking_score !== undefined) {
      
      // Get current result to fill missing scores
      const currentResult = await this.testResultRepository.findById(result_id);
      if (currentResult) {
        const scores = {
          listening_score: updateData.listening_score ?? currentResult.listening_score,
          reading_score: updateData.reading_score ?? currentResult.reading_score,
          writing_score: updateData.writing_score ?? currentResult.writing_score,
          speaking_score: updateData.speaking_score ?? currentResult.speaking_score,
        };
        
        await this.testResultValidator.validateScores(scores);

        // Tự động tính lại overall_score
        const overall_score = calculateOverallScore(
          scores.listening_score,
          scores.reading_score,
          scores.writing_score,
          scores.speaking_score,
        );

        const testResult = await this.testResultRepository.updateTestResult(result_id, {
          ...updateData,
          overall_score,
        });
        return testResult;
      }
    }

    // Nếu chỉ update feedback thì không cần tính lại overall_score
    const testResult = await this.testResultRepository.updateTestResult(result_id, updateData);
    return testResult;
  }

  async remove(result_id: string): Promise<void> {
    await this.testResultValidator.ensureTestResultExists(result_id);
    await this.testResultRepository.deleteTestResult(result_id);
  }
}

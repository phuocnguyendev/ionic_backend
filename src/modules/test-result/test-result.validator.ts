import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TestRepository } from '../test/test.repository';
import { UserRepository } from '../user/user.repository';
import { TestResultResponse } from './interfaces/test-result.interface';
import { TestResultRepository } from './test-result.repository';

@Injectable()
export class TestResultValidator {
  constructor(
    private readonly testResultRepository: TestResultRepository,
    private readonly userRepository: UserRepository,
    private readonly testRepository: TestRepository,
  ) {}

  async ensureTestResultExists(result_id: string): Promise<TestResultResponse> {
    const testResult = await this.testResultRepository.findById(result_id);
    if (!testResult) {
      throw new HttpException('Test result not found', HttpStatus.NOT_FOUND);
    }
    return testResult;
  }

  async validateScores(scores: {
    listening_score: number;
    reading_score: number;
    writing_score: number;
    speaking_score: number;
  }): Promise<void> {
    const { listening_score, reading_score, writing_score, speaking_score } =
      scores;

    // Validate individual scores
    const individualScores = [
      listening_score,
      reading_score,
      writing_score,
      speaking_score,
    ];
    for (const score of individualScores) {
      if (score < 0 || score > 9) {
        throw new HttpException(
          'Individual scores must be between 0 and 9',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async validateUserAndTest(user_id: string, test_id: string): Promise<void> {
    if (!user_id || !test_id) {
      throw new HttpException(
        'User ID and Test ID are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if user exists
    const user = await this.userRepository.findUserById(user_id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Check if test exists
    const test = await this.testRepository.findById(test_id);
    if (!test) {
      throw new HttpException('Test not found', HttpStatus.NOT_FOUND);
    }
  }

  async checkDuplicateResult(
    user_id: string,
    test_id: string,
    excludeResultId?: string,
  ): Promise<void> {
    const existingResults = await this.testResultRepository.findByUser(user_id);
    const duplicateResult = existingResults.find(
      (result) =>
        result.test_id === test_id &&
        (excludeResultId ? result.result_id !== excludeResultId : true),
    );

    if (duplicateResult) {
      throw new HttpException(
        'User already has a result for this test',
        HttpStatus.CONFLICT,
      );
    }
  }
}

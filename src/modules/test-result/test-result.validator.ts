import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TestResultRepository } from './test-result.repository';
import { TestResultResponse } from './interfaces/test-result.interface';

@Injectable()
export class TestResultValidator {
  constructor(private readonly testResultRepository: TestResultRepository) {}

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
    overall_score: number;
  }): Promise<void> {
    const { listening_score, reading_score, writing_score, speaking_score, overall_score } = scores;

    // Validate individual scores
    const individualScores = [listening_score, reading_score, writing_score, speaking_score];
    for (const score of individualScores) {
      if (score < 0 || score > 9) {
        throw new HttpException('Individual scores must be between 0 and 9', HttpStatus.BAD_REQUEST);
      }
    }

    // Validate overall score
    if (overall_score < 0 || overall_score > 9) {
      throw new HttpException('Overall score must be between 0 and 9', HttpStatus.BAD_REQUEST);
    }

    // Check if overall score is reasonable compared to individual scores
    const averageScore = (listening_score + reading_score + writing_score + speaking_score) / 4;
    const difference = Math.abs(overall_score - averageScore);
    
    if (difference > 1) {
      throw new HttpException('Overall score should be close to the average of individual scores', HttpStatus.BAD_REQUEST);
    }
  }

  async validateUserAndTest(user_id: string, test_id: string): Promise<void> {
    // Note: This would typically check if user and test exist
    // For now, we'll assume they exist since we have foreign key constraints
    if (!user_id || !test_id) {
      throw new HttpException('User ID and Test ID are required', HttpStatus.BAD_REQUEST);
    }
  }

  async checkDuplicateResult(user_id: string, test_id: string, excludeResultId?: string): Promise<void> {
    const existingResults = await this.testResultRepository.findByUser(user_id);
    const duplicateResult = existingResults.find(result => 
      result.test_id === test_id && 
      (excludeResultId ? result.result_id !== excludeResultId : true)
    );

    if (duplicateResult) {
      throw new HttpException('User already has a result for this test', HttpStatus.CONFLICT);
    }
  }
}

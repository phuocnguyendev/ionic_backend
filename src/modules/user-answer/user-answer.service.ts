import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserAnswerRepository } from './repositories/user-answer.repository';
import { UserAnswerValidator } from './validators';

import { USER_ANSWER_NOT_FOUND } from '../../constants/message.constant';
import {
  UserAnswerCreateData,
  UserAnswerResponse,
  UserAnswerStatistics,
  UserAnswerUpdateData,
  UserProgressData,
} from 'src/interfaces';

@Injectable()
export class UserAnswerService {
  constructor(
    private readonly userAnswerRepository: UserAnswerRepository,
    private readonly userAnswerValidator: UserAnswerValidator,
  ) {}

  async findAnswerById(answer_id: string): Promise<UserAnswerResponse> {
    const answer = await this.userAnswerRepository.findAnswerById(answer_id);
    if (!answer) {
      throw new HttpException(USER_ANSWER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return answer;
  }

  async findAnswersByResult(result_id: string): Promise<UserAnswerResponse[]> {
    return this.userAnswerRepository.findAnswersByResult(result_id);
  }

  async findAnswersByUser(user_id: string): Promise<UserAnswerResponse[]> {
    return this.userAnswerRepository.findAnswersByUser(user_id);
  }

  async findAnswersByQuestion(
    question_id: string,
  ): Promise<UserAnswerResponse[]> {
    return this.userAnswerRepository.findAnswersByQuestion(question_id);
  }

  async findUserAnswerForQuestion(
    result_id: string,
    question_id: string,
  ): Promise<UserAnswerResponse | null> {
    return this.userAnswerRepository.findUserAnswerForQuestion(
      result_id,
      question_id,
    );
  }

  async submitAnswer(
    createData: UserAnswerCreateData,
    section?: any,
    test_id?: string,
  ): Promise<UserAnswerResponse> {
    // Validate the submission including section if provided
    await this.userAnswerValidator.validateCreateAnswer(
      createData,
      section,
      test_id,
    );

    // Check if answer already exists for this question (business logic)
    const existingAnswer =
      await this.userAnswerRepository.findUserAnswerForQuestion(
        createData.result_id,
        createData.question_id,
      );

    if (existingAnswer) {
      // Update existing answer instead of creating new one
      return this.updateAnswer(existingAnswer.answer_id, {
        option_id: createData.option_id,
        answer_content: createData.answer_content,
        answer_text: createData.answer_text,
        time_spent: createData.time_spent,
        is_flagged: createData.is_flagged,
      });
    } else {
      // Create new answer
      return this.userAnswerRepository.createAnswer(createData);
    }
  }

  async updateAnswer(
    answer_id: string,
    updateData: UserAnswerUpdateData,
  ): Promise<UserAnswerResponse> {
    await this.findAnswerById(answer_id); // Validate answer exists
    await this.userAnswerValidator.validateUpdateAnswer(answer_id, updateData);
    return this.userAnswerRepository.updateAnswer(answer_id, updateData);
  }

  async flagAnswer(
    answer_id: string,
    is_flagged: boolean,
  ): Promise<UserAnswerResponse> {
    return this.updateAnswer(answer_id, { is_flagged });
  }

  async scoreAnswer(
    answer_id: string,
    score: number,
    is_correct?: boolean,
  ): Promise<UserAnswerResponse> {
    await this.userAnswerValidator.validateScoreAnswer(
      answer_id,
      score,
      is_correct,
    );
    return this.updateAnswer(answer_id, { score, is_correct });
  }

  async deleteAnswer(answer_id: string): Promise<void> {
    await this.findAnswerById(answer_id); // Validate answer exists
    await this.userAnswerRepository.deleteAnswer(answer_id);
  }

  async getAnswerStatistics(
    question_id: string,
  ): Promise<UserAnswerStatistics> {
    return this.userAnswerRepository.getAnswerStatistics(question_id);
  }

  async getUserProgress(
    user_id: string,
    test_id: string,
  ): Promise<UserProgressData> {
    return this.userAnswerRepository.getUserProgress(user_id, test_id);
  }

  async autoScoreObjectiveAnswers(result_id: string): Promise<void> {
    const answers =
      await this.userAnswerRepository.findAnswersByResult(result_id);

    for (const answer of answers) {
      // Only auto-score if option is selected and question has correct options
      if (answer.option_id && answer.question_option) {
        const isCorrect = answer.question_option.is_correct;
        await this.updateAnswer(answer.answer_id, {
          is_correct: isCorrect,
          score: isCorrect ? answer.test_question?.marks || 1 : 0,
        });
      }
    }
  }

  async calculateSectionScore(
    result_id: string,
    section: string,
  ): Promise<number> {
    const answers =
      await this.userAnswerRepository.findAnswersByResult(result_id);
    const sectionAnswers = answers.filter(
      (answer) => answer.test_question?.section === section,
    );

    const totalScore = sectionAnswers.reduce((sum, answer) => {
      return sum + (answer.score || 0);
    }, 0);

    return totalScore;
  }
}

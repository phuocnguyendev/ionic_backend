import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';
import {
  UserAnswerCreateData,
  UserAnswerResponse,
  UserAnswerUpdateData,
} from 'src/interfaces';

@Injectable()
export class UserAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAnswerById(answer_id: string): Promise<UserAnswerResponse | null> {
    return this.prisma.user_answer.findUnique({
      where: { answer_id },
      include: {
        test_question: {
          include: {
            options: true,
          },
        },
        question_option: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    }) as Promise<UserAnswerResponse | null>;
  }

  async findAnswersByResult(result_id: string): Promise<UserAnswerResponse[]> {
    return this.prisma.user_answer.findMany({
      where: { result_id },
      orderBy: [
        { test_question: { section: 'asc' } },
        { test_question: { question_number: 'asc' } },
      ],
      include: {
        test_question: {
          include: {
            options: true,
          },
        },
        question_option: true,
      },
    }) as Promise<UserAnswerResponse[]>;
  }

  async findAnswersByUser(user_id: string): Promise<UserAnswerResponse[]> {
    return this.prisma.user_answer.findMany({
      where: { user_id },
      orderBy: { answered_at: 'desc' },
      include: {
        test_question: {
          include: {
            options: true,
          },
        },
        question_option: true,
        test_result: {
          select: {
            result_id: true,
            test_id: true,
            overall_score: true,
          },
        },
      },
    }) as Promise<UserAnswerResponse[]>;
  }

  async findAnswersByQuestion(
    question_id: string,
  ): Promise<UserAnswerResponse[]> {
    return this.prisma.user_answer.findMany({
      where: { question_id },
      include: {
        question_option: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    }) as Promise<UserAnswerResponse[]>;
  }

  async findUserAnswerForQuestion(
    result_id: string,
    question_id: string,
  ): Promise<UserAnswerResponse | null> {
    return this.prisma.user_answer.findFirst({
      where: {
        result_id,
        question_id,
      },
      include: {
        test_question: {
          include: {
            options: true,
          },
        },
        question_option: true,
      },
    }) as Promise<UserAnswerResponse | null>;
  }

  async createAnswer(
    createData: UserAnswerCreateData,
  ): Promise<UserAnswerResponse> {
    const answer = await this.prisma.user_answer.create({
      data: {
        result_id: createData.result_id,
        question_id: createData.question_id,
        user_id: createData.user_id,
        option_id: createData.option_id,
        answer_content: createData.answer_content,
        answer_text: createData.answer_text,
        time_spent: createData.time_spent,
        is_flagged: createData.is_flagged || false,
        attempt_count: 1,
        answered_at: new Date(),
      },
      include: {
        test_question: {
          include: {
            options: true,
          },
        },
        question_option: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return answer as UserAnswerResponse;
  }

  async updateAnswer(
    answer_id: string,
    updateData: UserAnswerUpdateData,
  ): Promise<UserAnswerResponse> {
    // Get current answer to increment attempt_count if answer changed
    const currentAnswer = await this.prisma.user_answer.findUnique({
      where: { answer_id },
    });

    const shouldIncrementAttempts =
      currentAnswer &&
      (updateData.option_id !== undefined ||
        updateData.answer_content !== undefined) &&
      (updateData.option_id !== currentAnswer.option_id ||
        updateData.answer_content !== currentAnswer.answer_content);

    const updatePayload: any = {};

    if (updateData.option_id !== undefined)
      updatePayload.option_id = updateData.option_id;
    if (updateData.answer_content !== undefined)
      updatePayload.answer_content = updateData.answer_content;
    if (updateData.answer_text !== undefined)
      updatePayload.answer_text = updateData.answer_text;
    if (updateData.score !== undefined) updatePayload.score = updateData.score;
    if (updateData.is_correct !== undefined)
      updatePayload.is_correct = updateData.is_correct;
    if (updateData.time_spent !== undefined)
      updatePayload.time_spent = updateData.time_spent;
    if (updateData.answered_at !== undefined) {
      updatePayload.answered_at =
        updateData.answered_at instanceof Date
          ? updateData.answered_at
          : updateData.answered_at
            ? new Date(updateData.answered_at)
            : null;
    }
    if (updateData.is_flagged !== undefined)
      updatePayload.is_flagged = updateData.is_flagged;

    if (shouldIncrementAttempts) {
      updatePayload.attempt_count = (currentAnswer?.attempt_count || 0) + 1;
      updatePayload.answered_at = new Date();
    }

    const answer = await this.prisma.user_answer.update({
      where: { answer_id },
      data: updatePayload,
      include: {
        test_question: {
          include: {
            options: true,
          },
        },
        question_option: true,
        user: {
          select: {
            user_id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    return answer as UserAnswerResponse;
  }

  async deleteAnswer(answer_id: string): Promise<void> {
    await this.prisma.user_answer.delete({
      where: { answer_id },
    });
  }

  async getAnswerStatistics(question_id: string): Promise<any> {
    const stats = await this.prisma.user_answer.groupBy({
      by: ['option_id', 'is_correct'],
      where: { question_id },
      _count: {
        answer_id: true,
      },
    });

    const totalAnswers = await this.prisma.user_answer.count({
      where: { question_id },
    });

    return {
      total_answers: totalAnswers,
      option_stats: stats,
    };
  }

  async getUserProgress(user_id: string, test_id: string): Promise<any> {
    const totalQuestions = await this.prisma.test_question.count({
      where: { test_id },
    });

    const answeredQuestions = await this.prisma.user_answer.count({
      where: {
        user_id,
        test_question: { test_id },
      },
    });

    const correctAnswers = await this.prisma.user_answer.count({
      where: {
        user_id,
        test_question: { test_id },
        is_correct: true,
      },
    });

    return {
      total_questions: totalQuestions,
      answered_questions: answeredQuestions,
      correct_answers: correctAnswers,
      progress_percentage:
        totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0,
      accuracy_percentage:
        answeredQuestions > 0 ? (correctAnswers / answeredQuestions) * 100 : 0,
    };
  }
}

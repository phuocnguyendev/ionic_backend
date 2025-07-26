import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../config/prisma/prisma.service';
import { CreateUserAnswerDto } from '../dto/create-user-answer.dto';
import { test_section } from '@prisma/client';
import { UserAnswerUpdateData } from 'src/interfaces';

@Injectable()
export class UserAnswerValidator {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Validate user answer creation data
   */
  async validateCreateAnswer(
    createData: CreateUserAnswerDto,
    section?: any,
    test_id?: string,
  ): Promise<void> {
    // Check if test result exists
    await this.validateTestResult(createData.result_id);

    // Check if question exists
    await this.validateQuestion(createData.question_id);

    // Check if user exists
    await this.validateUser(createData.user_id);

    // Validate option if provided
    if (createData.option_id) {
      await this.validateQuestionOption(
        createData.question_id,
        createData.option_id,
      );
    }

    // Validate answer content
    this.validateAnswerContent(createData);

    // Validate section submission if section and test_id are provided
    if (section && test_id) {
      await this.validateSectionSubmission(
        createData.user_id,
        test_id,
        section,
      );
    }

    // Check if answer already exists (removed from here since service handles it)
    // await this.checkDuplicateAnswer(createData.result_id, createData.question_id);
  }

  /**
   * Validate user answer update data
   */
  async validateUpdateAnswer(
    answer_id: string,
    updateData: UserAnswerUpdateData,
  ): Promise<void> {
    // Check if answer exists
    const existingAnswer = await this.prisma.user_answer.findUnique({
      where: { answer_id },
      include: {
        test_question: true,
        test_result: true,
      },
    });

    if (!existingAnswer) {
      throw new BadRequestException('User answer not found');
    }

    // Validate option if provided
    if (updateData.option_id) {
      await this.validateQuestionOption(
        existingAnswer.question_id,
        updateData.option_id,
      );
    }

    // Validate score if provided
    if (updateData.score !== undefined && updateData.score !== null) {
      this.validateScore(
        updateData.score,
        existingAnswer.test_question?.marks
          ? Number(existingAnswer.test_question.marks)
          : undefined,
      );
    }

    // Validate time spent
    if (updateData.time_spent !== undefined && updateData.time_spent !== null) {
      this.validateTimeSpent(updateData.time_spent);
    }
  }

  /**
   * Validate scoring operation
   */
  async validateScoreAnswer(
    answer_id: string,
    score: number,
    is_correct?: boolean,
  ): Promise<void> {
    const answer = await this.prisma.user_answer.findUnique({
      where: { answer_id },
      include: {
        test_question: true,
      },
    });

    if (!answer) {
      throw new BadRequestException('User answer not found');
    }

    this.validateScore(
      score,
      answer.test_question?.marks
        ? Number(answer.test_question.marks)
        : undefined,
    );

    // Validate consistency between score and is_correct
    if (is_correct !== undefined && answer.test_question?.marks) {
      const maxScore = answer.test_question.marks;
      if (is_correct && score <= 0) {
        throw new BadRequestException(
          'Correct answer must have a positive score',
        );
      }
      if (!is_correct && score > 0) {
        throw new BadRequestException(
          'Incorrect answer should not have a positive score',
        );
      }
    }
  }

  /**
   * Validate if user can submit answer for this section
   */
  async validateSectionSubmission(
    user_id: string,
    test_id: string,
    section: test_section,
  ): Promise<void> {
    // Check if test session exists and is in progress
    const session = await this.prisma.test_session.findFirst({
      where: {
        user_id,
        test_id,
        status: {
          in: ['in_progress', 'paused'],
        },
      },
    });

    if (!session) {
      throw new BadRequestException(
        'No active test session found for this user',
      );
    }

    // Check if section is available
    const sectionAttempt = await this.prisma.test_section_attempt.findFirst({
      where: {
        session_id: session.session_id,
        section,
      },
    });

    if (!sectionAttempt) {
      throw new BadRequestException(
        `Section ${section} is not available in this session`,
      );
    }

    if (sectionAttempt.is_completed) {
      throw new BadRequestException(
        `Section ${section} has already been completed`,
      );
    }
  }

  // Private helper methods
  private async validateTestResult(result_id: string): Promise<void> {
    const result = await this.prisma.test_result.findUnique({
      where: { result_id },
    });

    if (!result) {
      throw new BadRequestException('Test result not found');
    }
  }

  private async validateQuestion(question_id: string): Promise<void> {
    const question = await this.prisma.test_question.findUnique({
      where: { question_id },
    });

    if (!question) {
      throw new BadRequestException('Question not found');
    }
  }

  private async validateUser(user_id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { user_id },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
  }

  private async validateQuestionOption(
    question_id: string,
    option_id: string,
  ): Promise<void> {
    const option = await this.prisma.question_option.findFirst({
      where: {
        option_id,
        question_id,
      },
    });

    if (!option) {
      throw new BadRequestException(
        'Option does not belong to the specified question',
      );
    }
  }

  private validateAnswerContent(data: CreateUserAnswerDto): void {
    const hasOption = !!data.option_id;
    const hasContent = !!(data.answer_content || data.answer_text);

    if (!hasOption && !hasContent) {
      throw new BadRequestException(
        'Either option_id or answer content must be provided',
      );
    }
  }

  private async checkDuplicateAnswer(
    result_id: string,
    question_id: string,
  ): Promise<void> {
    const existingAnswer = await this.prisma.user_answer.findFirst({
      where: {
        result_id,
        question_id,
      },
    });

    if (existingAnswer) {
      throw new BadRequestException(
        'Answer for this question already exists. Use update instead.',
      );
    }
  }

  private validateScore(score: number, maxMarks?: number | null): void {
    if (score < 0) {
      throw new BadRequestException('Score cannot be negative');
    }

    if (maxMarks && score > maxMarks) {
      throw new BadRequestException(
        `Score (${score}) cannot exceed maximum marks (${maxMarks})`,
      );
    }
  }

  private validateTimeSpent(timeSpent: number): void {
    if (timeSpent < 0) {
      throw new BadRequestException('Time spent cannot be negative');
    }

    // Maximum reasonable time: 4 hours (14400 seconds)
    if (timeSpent > 14400) {
      throw new BadRequestException(
        'Time spent seems unreasonably high (max 4 hours)',
      );
    }
  }
}

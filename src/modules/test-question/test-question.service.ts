import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { test_section } from '@prisma/client';
import {
  QuestionOptionCreateData,
  QuestionOptionData,
  QuestionOptionUpdateData,
  TestQuestionCreateData,
  TestQuestionResponse,
  TestQuestionUpdateData,
} from '../test/interfaces/test-question.interface';
import {
  CreateQuestionOptionDto,
  CreateTestQuestionDto,
  UpdateQuestionOptionDto,
  UpdateTestQuestionDto,
} from './dto';
import { TestQuestionRepository } from './test-question.repository';

@Injectable()
export class TestQuestionService {
  constructor(
    private readonly testQuestionRepository: TestQuestionRepository,
  ) {}

  // Test Question methods
  async findQuestionById(question_id: string): Promise<TestQuestionResponse> {
    const question =
      await this.testQuestionRepository.findQuestionById(question_id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${question_id} not found`);
    }
    return question;
  }

  async findQuestionsByTest(test_id: string): Promise<TestQuestionResponse[]> {
    return this.testQuestionRepository.findQuestionsByTest(test_id);
  }

  async findQuestionsBySection(
    test_id: string,
    section: test_section,
  ): Promise<TestQuestionResponse[]> {
    return this.testQuestionRepository.findQuestionsBySection(test_id, section);
  }

  async findQuestionsByPart(
    test_id: string,
    section: test_section,
    part_number: number,
  ): Promise<TestQuestionResponse[]> {
    return this.testQuestionRepository.findQuestionsBySection(test_id, section);
  }

  async createQuestion(
    createData: CreateTestQuestionDto,
  ): Promise<TestQuestionResponse> {
    // Validate parent question exists if provided
    if (createData.parent_question_id) {
      const parentQuestion = await this.testQuestionRepository.findQuestionById(
        createData.parent_question_id,
      );
      if (!parentQuestion) {
        throw new BadRequestException('Parent question not found');
      }
    }

    const questionData: TestQuestionCreateData = {
      test_id: createData.test_id,
      section: createData.section,
      part_number: createData.part_number,
      question_number: createData.question_number,
      parent_question_id: createData.parent_question_id,
      content_html: createData.content_html,
      instruction: createData.instruction,
      question_type: createData.question_type,
      audio_url: createData.audio_url,
      image_url: createData.image_url,
      marks: createData.marks,
      difficulty_level: createData.difficulty_level,
      word_limit_min: createData.word_limit_min,
      word_limit_max: createData.word_limit_max,
      time_limit: createData.time_limit,
    };

    return this.testQuestionRepository.createQuestion(questionData);
  }

  async updateQuestion(
    question_id: string,
    updateData: UpdateTestQuestionDto,
  ): Promise<TestQuestionResponse> {
    const existingQuestion =
      await this.testQuestionRepository.findQuestionById(question_id);
    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${question_id} not found`);
    }

    const questionUpdateData: TestQuestionUpdateData = {
      section: updateData.section,
      part_number: updateData.part_number,
      parent_question_id: updateData.parent_question_id,
      content_html: updateData.content_html,
      instruction: updateData.instruction,
      question_type: updateData.question_type,
      audio_url: updateData.audio_url,
      image_url: updateData.image_url,
      marks: updateData.marks,
      difficulty_level: updateData.difficulty_level,
      word_limit_min: updateData.word_limit_min,
      word_limit_max: updateData.word_limit_max,
      time_limit: updateData.time_limit,
    };

    return this.testQuestionRepository.updateQuestion(
      question_id,
      questionUpdateData,
    );
  }

  async deleteQuestion(question_id: string): Promise<void> {
    const existingQuestion =
      await this.testQuestionRepository.findQuestionById(question_id);
    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${question_id} not found`);
    }

    await this.testQuestionRepository.deleteQuestion(question_id);
  }

  // Question Option methods
  async findOptionsByQuestion(
    question_id: string,
  ): Promise<QuestionOptionData[]> {
    return this.testQuestionRepository.findOptionsByQuestion(question_id);
  }

  async findOptionById(option_id: string): Promise<QuestionOptionData> {
    const option = await this.testQuestionRepository.findOptionById(option_id);
    if (!option) {
      throw new NotFoundException(`Option with ID ${option_id} not found`);
    }
    return option;
  }

  async createOption(
    createData: CreateQuestionOptionDto,
  ): Promise<QuestionOptionData> {
    // Validate question exists
    const question = await this.testQuestionRepository.findQuestionById(
      createData.question_id,
    );
    if (!question) {
      throw new BadRequestException('Question not found');
    }

    const optionData: QuestionOptionCreateData = {
      question_id: createData.question_id,
      content_html: createData.content_html,
      content_text: createData.content_text,
      is_correct: createData.is_correct,
      option_index: createData.option_index,
      option_label: createData.option_label,
      is_mixable: createData.is_mixable,
      explanation: createData.explanation,
    };

    return this.testQuestionRepository.createOption(optionData);
  }

  async updateOption(
    option_id: string,
    updateData: UpdateQuestionOptionDto,
  ): Promise<QuestionOptionData> {
    const existingOption =
      await this.testQuestionRepository.findOptionById(option_id);
    if (!existingOption) {
      throw new NotFoundException(`Option with ID ${option_id} not found`);
    }

    const optionUpdateData: QuestionOptionUpdateData = {
      content_html: updateData.content_html,
      content_text: updateData.content_text,
      is_correct: updateData.is_correct,
      option_index: updateData.option_index,
      option_label: updateData.option_label,
      is_mixable: updateData.is_mixable,
      explanation: updateData.explanation,
    };

    return this.testQuestionRepository.updateOption(
      option_id,
      optionUpdateData,
    );
  }

  async deleteOption(option_id: string): Promise<void> {
    const existingOption =
      await this.testQuestionRepository.findOptionById(option_id);
    if (!existingOption) {
      throw new NotFoundException(`Option with ID ${option_id} not found`);
    }

    await this.testQuestionRepository.deleteOption(option_id);
  }
}

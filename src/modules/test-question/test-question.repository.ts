import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import {
  TestQuestionResponse,
  TestQuestionCreateData,
  TestQuestionUpdateData,
  QuestionOptionData,
  QuestionOptionCreateData,
  QuestionOptionUpdateData,
  TestSectionTimeData,
  TestSectionTimeCreateData,
  TestSectionTimeUpdateData,
} from '../test/interfaces/test-question.interface';

@Injectable()
export class TestQuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Test Question methods
  async findQuestionById(
    question_id: string,
  ): Promise<TestQuestionResponse | null> {
    return this.prisma.test_question.findUnique({
      where: { question_id },
      include: {
        parent_question: true,
        sub_questions: true,
        options: true,
      },
    }) as Promise<TestQuestionResponse | null>;
  }

  async findQuestionsByTest(test_id: string): Promise<TestQuestionResponse[]> {
    return this.prisma.test_question.findMany({
      where: { test_id },
      orderBy: [
        { section: 'asc' },
        { part_number: 'asc' },
        { question_number: 'asc' },
      ],
      include: {
        parent_question: true,
        sub_questions: true,
        options: true,
      },
    }) as Promise<TestQuestionResponse[]>;
  }

  async findQuestionsBySection(
    test_id: string,
    section: string,
  ): Promise<TestQuestionResponse[]> {
    return this.prisma.test_question.findMany({
      where: {
        test_id,
        section: section as any,
      },
      orderBy: [{ part_number: 'asc' }, { question_number: 'asc' }],
      include: {
        parent_question: true,
        sub_questions: true,
        options: true,
      },
    }) as Promise<TestQuestionResponse[]>;
  }

  async createQuestion(
    createData: TestQuestionCreateData,
  ): Promise<TestQuestionResponse> {
    const question = await this.prisma.test_question.create({
      data: {
        test_id: createData.test_id,
        section: createData.section as any,
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
      },
      include: {
        parent_question: true,
        sub_questions: true,
        options: true,
      },
    });
    return question as TestQuestionResponse;
  }

  async updateQuestion(
    question_id: string,
    updateData: TestQuestionUpdateData,
  ): Promise<TestQuestionResponse> {
    const question = await this.prisma.test_question.update({
      where: { question_id },
      data: {
        section: updateData.section as any,
        part_number: updateData.part_number,
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
      },
      include: {
        parent_question: true,
        sub_questions: true,
        options: true,
      },
    });
    return question as TestQuestionResponse;
  }

  async deleteQuestion(question_id: string): Promise<void> {
    await this.prisma.test_question.delete({
      where: { question_id },
    });
  }

  // Question Option methods
  async findOptionById(option_id: string): Promise<QuestionOptionData | null> {
    return this.prisma.question_option.findUnique({
      where: { option_id },
    }) as Promise<QuestionOptionData | null>;
  }

  async findOptionsByQuestion(
    question_id: string,
  ): Promise<QuestionOptionData[]> {
    return this.prisma.question_option.findMany({
      where: { question_id },
      orderBy: { option_index: 'asc' },
    }) as Promise<QuestionOptionData[]>;
  }

  async createOption(
    createData: QuestionOptionCreateData,
  ): Promise<QuestionOptionData> {
    const option = await this.prisma.question_option.create({
      data: {
        question_id: createData.question_id,
        content_html: createData.content_html,
        content_text: createData.content_text,
        is_correct: createData.is_correct,
        option_index: createData.option_index,
        option_label: createData.option_label,
        is_mixable: createData.is_mixable,
        explanation: createData.explanation,
      },
    });
    return option as QuestionOptionData;
  }

  async updateOption(
    option_id: string,
    updateData: QuestionOptionUpdateData,
  ): Promise<QuestionOptionData> {
    const option = await this.prisma.question_option.update({
      where: { option_id },
      data: {
        content_html: updateData.content_html,
        content_text: updateData.content_text,
        is_correct: updateData.is_correct,
        option_index: updateData.option_index,
        option_label: updateData.option_label,
        is_mixable: updateData.is_mixable,
        explanation: updateData.explanation,
      },
    });
    return option as QuestionOptionData;
  }

  async deleteOption(option_id: string): Promise<void> {
    await this.prisma.question_option.delete({
      where: { option_id },
    });
  }

  // Test Section Time methods
  async findSectionTimesByTest(
    test_id: string,
  ): Promise<TestSectionTimeData[]> {
    return this.prisma.test_section_time.findMany({
      where: { test_id },
      orderBy: { section: 'asc' },
    }) as Promise<TestSectionTimeData[]>;
  }

  async createSectionTime(
    createData: TestSectionTimeCreateData,
  ): Promise<TestSectionTimeData> {
    const sectionTime = await this.prisma.test_section_time.create({
      data: {
        test_id: createData.test_id,
        section: createData.section as any,
        duration: createData.duration,
      },
    });
    return sectionTime as TestSectionTimeData;
  }

  async updateSectionTime(
    id: string,
    updateData: TestSectionTimeUpdateData,
  ): Promise<TestSectionTimeData> {
    const sectionTime = await this.prisma.test_section_time.update({
      where: { id },
      data: {
        duration: updateData.duration,
      },
    });
    return sectionTime as TestSectionTimeData;
  }
}

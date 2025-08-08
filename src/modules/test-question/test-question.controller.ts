import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { test_section } from '@prisma/client';
import { SUCCESS } from '../../constants/message.constant';
import { ResponseMessage } from '../../core/customize';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  QuestionOptionData,
  TestQuestionResponse,
} from '../test/interfaces/test-question.interface';
import {
  CreateQuestionOptionDto,
  CreateTestQuestionDto,
  UpdateQuestionOptionDto,
  UpdateTestQuestionDto,
} from './dto';
import { TestQuestionService } from './test-question.service';

@ApiTags('TestQuestion')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('test-question')
export class TestQuestionController {
  constructor(private readonly testQuestionService: TestQuestionService) {}

  // Test Question endpoints
  @Get(':id')
  @ApiOperation({ summary: 'Get test question by ID' })
  @ResponseMessage(SUCCESS)
  async findQuestionById(
    @Param('id') question_id: string,
  ): Promise<TestQuestionResponse> {
    return this.testQuestionService.findQuestionById(question_id);
  }

  @Get('test/:testId')
  @ApiOperation({ summary: 'Get all questions for a test' })
  @ResponseMessage(SUCCESS)
  async findQuestionsByTest(
    @Param('testId') test_id: string,
  ): Promise<TestQuestionResponse[]> {
    return this.testQuestionService.findQuestionsByTest(test_id);
  }

  @Get('test/:testId/section/:section')
  @ApiOperation({ summary: 'Get questions by test and section' })
  @ResponseMessage(SUCCESS)
  async findQuestionsBySection(
    @Param('testId') test_id: string,
    @Param('section') section: test_section,
  ): Promise<TestQuestionResponse[]> {
    return this.testQuestionService.findQuestionsBySection(test_id, section);
  }

  @Get('test/:testId/section/:section/part/:partNumber')
  @ApiOperation({ summary: 'Get questions by test, section and part' })
  @ResponseMessage(SUCCESS)
  async findQuestionsByPart(
    @Param('testId') test_id: string,
    @Param('section') section: test_section,
    @Param('partNumber') part_number: string,
  ): Promise<TestQuestionResponse[]> {
    return this.testQuestionService.findQuestionsByPart(
      test_id,
      section,
      parseInt(part_number),
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new test question' })
  @ResponseMessage(SUCCESS)
  async createQuestion(
    @Body() createData: CreateTestQuestionDto,
  ): Promise<TestQuestionResponse> {
    return this.testQuestionService.createQuestion(createData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update test question' })
  @ResponseMessage(SUCCESS)
  async updateQuestion(
    @Param('id') question_id: string,
    @Body() updateData: UpdateTestQuestionDto,
  ): Promise<TestQuestionResponse> {
    return this.testQuestionService.updateQuestion(question_id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete test question' })
  @ResponseMessage(SUCCESS)
  async deleteQuestion(@Param('id') question_id: string): Promise<void> {
    await this.testQuestionService.deleteQuestion(question_id);
  }

  // Question Option endpoints
  @Get('question/:questionId/options')
  @ApiOperation({ summary: 'Get options for a question' })
  @ResponseMessage(SUCCESS)
  async findOptionsByQuestion(
    @Param('questionId') question_id: string,
  ): Promise<QuestionOptionData[]> {
    return this.testQuestionService.findOptionsByQuestion(question_id);
  }

  @Get('option/:optionId')
  @ApiOperation({ summary: 'Get question option by ID' })
  @ResponseMessage(SUCCESS)
  async findOptionById(
    @Param('optionId') option_id: string,
  ): Promise<QuestionOptionData> {
    return this.testQuestionService.findOptionById(option_id);
  }

  @Post('option')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create question option' })
  @ResponseMessage(SUCCESS)
  async createOption(
    @Body() createData: CreateQuestionOptionDto,
  ): Promise<QuestionOptionData> {
    return this.testQuestionService.createOption(createData);
  }

  @Put('option/:optionId')
  @ApiOperation({ summary: 'Update question option' })
  @ResponseMessage(SUCCESS)
  async updateOption(
    @Param('optionId') option_id: string,
    @Body() updateData: UpdateQuestionOptionDto,
  ): Promise<QuestionOptionData> {
    return this.testQuestionService.updateOption(option_id, updateData);
  }

  @Delete('option/:optionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete question option' })
  @ResponseMessage(SUCCESS)
  async deleteOption(@Param('optionId') option_id: string): Promise<void> {
    await this.testQuestionService.deleteOption(option_id);
  }
}

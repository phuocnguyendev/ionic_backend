import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserAnswerService } from './user-answer.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SUCCESS } from '../../constants/message.constant';
import {
  UserAnswerResponse,
  UserAnswerStatistics,
  UserProgressData,
} from 'src/interfaces';
import {
  CreateUserAnswerDto,
  SubmitAnswerDto,
  UpdateUserAnswerDto,
} from './dto';
import { ResponseMessage } from 'src/core';

@ApiTags('UserAnswer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('UserAnswer')
export class UserAnswerController {
  constructor(private readonly userAnswerService: UserAnswerService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user answer by ID' })
  @ResponseMessage(SUCCESS)
  async findAnswerById(
    @Param('id') answer_id: string,
  ): Promise<UserAnswerResponse> {
    return this.userAnswerService.findAnswerById(answer_id);
  }

  @Get('result/:resultId')
  @ApiOperation({ summary: 'Get user answers by test result ID' })
  @ResponseMessage(SUCCESS)
  async findAnswersByResult(
    @Param('resultId') result_id: string,
  ): Promise<UserAnswerResponse[]> {
    return this.userAnswerService.findAnswersByResult(result_id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user answers by user ID' })
  @ResponseMessage(SUCCESS)
  async findAnswersByUser(
    @Param('userId') user_id: string,
  ): Promise<UserAnswerResponse[]> {
    return this.userAnswerService.findAnswersByUser(user_id);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: 'Get user answers by question ID' })
  @ResponseMessage(SUCCESS)
  async findAnswersByQuestion(
    @Param('questionId') question_id: string,
  ): Promise<UserAnswerResponse[]> {
    return this.userAnswerService.findAnswersByQuestion(question_id);
  }

  @Get('result/:resultId/question/:questionId')
  @ApiOperation({ summary: 'Get user answer for specific question in result' })
  @ResponseMessage(SUCCESS)
  async findUserAnswerForQuestion(
    @Param('resultId') result_id: string,
    @Param('questionId') question_id: string,
  ): Promise<UserAnswerResponse | null> {
    return this.userAnswerService.findUserAnswerForQuestion(
      result_id,
      question_id,
    );
  }

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit user answer' })
  @ResponseMessage(SUCCESS)
  async submitAnswer(
    @Body() submitData: SubmitAnswerDto,
  ): Promise<UserAnswerResponse> {
    const createData: CreateUserAnswerDto = {
      result_id: submitData.result_id,
      question_id: submitData.question_id,
      user_id: submitData.user_id,
      option_id: submitData.option_id,
      answer_content: submitData.answer_content,
      answer_text: submitData.answer_text,
    };

    return this.userAnswerService.submitAnswer(
      createData,
      submitData.section,
      submitData.test_id,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user answer' })
  @ResponseMessage(SUCCESS)
  async updateAnswer(
    @Param('id') answer_id: string,
    @Body() updateData: UpdateUserAnswerDto,
  ): Promise<UserAnswerResponse> {
    return this.userAnswerService.updateAnswer(answer_id, updateData);
  }

  @Put(':id/flag')
  @ApiOperation({ summary: 'Flag/unflag user answer for review' })
  @ResponseMessage(SUCCESS)
  async flagAnswer(
    @Param('id') answer_id: string,
    @Query('flagged') is_flagged: boolean,
  ): Promise<UserAnswerResponse> {
    return this.userAnswerService.flagAnswer(answer_id, is_flagged);
  }

  @Put(':id/score')
  @ApiOperation({ summary: 'Score user answer' })
  @ResponseMessage(SUCCESS)
  async scoreAnswer(
    @Param('id') answer_id: string,
    @Query('score') score: number,
    @Query('correct') is_correct?: boolean,
  ): Promise<UserAnswerResponse> {
    return this.userAnswerService.scoreAnswer(answer_id, score, is_correct);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user answer' })
  @ResponseMessage(SUCCESS)
  async deleteAnswer(@Param('id') answer_id: string): Promise<void> {
    await this.userAnswerService.deleteAnswer(answer_id);
  }

  @Get('question/:questionId/statistics')
  @ApiOperation({ summary: 'Get answer statistics for a question' })
  @ResponseMessage(SUCCESS)
  async getAnswerStatistics(
    @Param('questionId') question_id: string,
  ): Promise<UserAnswerStatistics> {
    return this.userAnswerService.getAnswerStatistics(question_id);
  }

  @Get('user/:userId/test/:testId/progress')
  @ApiOperation({ summary: 'Get user progress for a test' })
  @ResponseMessage(SUCCESS)
  async getUserProgress(
    @Param('userId') user_id: string,
    @Param('testId') test_id: string,
  ): Promise<UserProgressData> {
    return this.userAnswerService.getUserProgress(user_id, test_id);
  }

  @Post('result/:resultId/auto-score')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Auto-score objective answers in a result' })
  @ResponseMessage(SUCCESS)
  async autoScoreObjectiveAnswers(
    @Param('resultId') result_id: string,
  ): Promise<{ message: string }> {
    await this.userAnswerService.autoScoreObjectiveAnswers(result_id);
    return { message: 'Objective answers scored successfully' };
  }

  @Get('result/:resultId/section/:section/score')
  @ApiOperation({ summary: 'Calculate score for a section' })
  @ResponseMessage(SUCCESS)
  async calculateSectionScore(
    @Param('resultId') result_id: string,
    @Param('section') section: string,
  ): Promise<{ section: string; score: number }> {
    const score = await this.userAnswerService.calculateSectionScore(
      result_id,
      section,
    );
    return { section, score };
  }
}

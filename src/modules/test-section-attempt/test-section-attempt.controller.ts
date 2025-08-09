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
  CreateTestSectionAttemptDto,
  UpdateTestSectionAttemptDto,
} from './dto';
import { TestSectionAttemptResponse } from './interfaces/test-section-attempt.interface';
import { TestSectionAttemptService } from './test-section-attempt.service';

@ApiTags('TestSectionAttempt')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('test-section-attempt')
export class TestSectionAttemptController {
  constructor(
    private readonly testSectionAttemptService: TestSectionAttemptService,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get test section attempt by ID' })
  @ResponseMessage(SUCCESS)
  async findById(
    @Param('id') attempt_id: string,
  ): Promise<TestSectionAttemptResponse> {
    return this.testSectionAttemptService.findById(attempt_id);
  }

  @Get('session/:sessionId')
  @ApiOperation({ summary: 'Get all section attempts for a session' })
  @ResponseMessage(SUCCESS)
  async findBySessionId(
    @Param('sessionId') session_id: string,
  ): Promise<TestSectionAttemptResponse[]> {
    return this.testSectionAttemptService.findBySessionId(session_id);
  }

  @Get('session/:sessionId/section/:section')
  @ApiOperation({ summary: 'Get section attempt by session and section' })
  @ResponseMessage(SUCCESS)
  async findBySessionAndSection(
    @Param('sessionId') session_id: string,
    @Param('section') section: test_section,
  ): Promise<TestSectionAttemptResponse> {
    return this.testSectionAttemptService.findBySessionAndSection(
      session_id,
      section,
    );
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create test section attempt' })
  @ResponseMessage(SUCCESS)
  async create(
    @Body() createData: CreateTestSectionAttemptDto,
  ): Promise<TestSectionAttemptResponse> {
    return this.testSectionAttemptService.create(createData);
  }

  @Post('session/:sessionId/initialize')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Initialize all sections for a test session' })
  @ResponseMessage(SUCCESS)
  async initializeSessionSections(
    @Param('sessionId') session_id: string,
  ): Promise<TestSectionAttemptResponse[]> {
    return this.testSectionAttemptService.initializeSessionSections(session_id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update test section attempt' })
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') attempt_id: string,
    @Body() updateData: UpdateTestSectionAttemptDto,
  ): Promise<TestSectionAttemptResponse> {
    return this.testSectionAttemptService.update(attempt_id, updateData);
  }

  @Put(':id/start')
  @ApiOperation({ summary: 'Start section attempt' })
  @ResponseMessage(SUCCESS)
  async startSection(
    @Param('id') attempt_id: string,
  ): Promise<TestSectionAttemptResponse> {
    return this.testSectionAttemptService.startSection(attempt_id);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Complete section attempt' })
  @ResponseMessage(SUCCESS)
  async completeSection(
    @Param('id') attempt_id: string,
  ): Promise<TestSectionAttemptResponse> {
    return this.testSectionAttemptService.completeSection(attempt_id);
  }

  @Put(':id/submit')
  @ApiOperation({ summary: 'Submit section attempt' })
  @ResponseMessage(SUCCESS)
  async submitSection(
    @Param('id') attempt_id: string,
  ): Promise<TestSectionAttemptResponse> {
    return this.testSectionAttemptService.submitSection(attempt_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete section attempt' })
  @ResponseMessage(SUCCESS)
  async delete(@Param('id') attempt_id: string): Promise<void> {
    await this.testSectionAttemptService.delete(attempt_id);
  }

  @Delete('session/:sessionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete all section attempts for a session' })
  @ResponseMessage(SUCCESS)
  async deleteBySessionId(
    @Param('sessionId') session_id: string,
  ): Promise<void> {
    await this.testSectionAttemptService.deleteBySessionId(session_id);
  }

  @Get('session/:sessionId/progress')
  @ApiOperation({ summary: 'Get session progress' })
  @ResponseMessage(SUCCESS)
  async getSessionProgress(@Param('sessionId') session_id: string): Promise<{
    total_sections: number;
    completed_sections: number;
    in_progress_sections: number;
    percentage_completed: number;
  }> {
    return this.testSectionAttemptService.getSessionProgress(session_id);
  }

  @Get('session/:sessionId/completed-sections')
  @ApiOperation({ summary: 'Get completed sections for a session' })
  @ResponseMessage(SUCCESS)
  async getCompletedSectionsBySession(
    @Param('sessionId') session_id: string,
  ): Promise<{ completed_sections: test_section[] }> {
    const completedSections =
      await this.testSectionAttemptService.getCompletedSectionsBySession(
        session_id,
      );
    return { completed_sections: completedSections };
  }
}

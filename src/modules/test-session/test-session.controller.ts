import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TestSessionService } from './test-session.service';
import { CreateTestSessionDto } from '../test/dto/create-test-session.dto';
import { UpdateTestSessionDto } from '../test/dto/update-test-session.dto';
import { TestSessionResponse } from './interfaces/test-session.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { transformUpdateTestSessionDto } from './utils/transform.utils';
import { ResponseMessage } from 'src/core';
import { SUCCESS } from 'src/constants';

@ApiTags('TestSession')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('TestSession')
export class TestSessionController {
  constructor(private readonly testSessionService: TestSessionService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get test session by ID' })
  @ResponseMessage(SUCCESS)
  async findSessionById(
    @Param('id') session_id: string,
  ): Promise<TestSessionResponse> {
    return this.testSessionService.findSessionById(session_id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get test sessions by user ID' })
  @ResponseMessage(SUCCESS)
  async findSessionsByUser(
    @Param('userId') user_id: string,
  ): Promise<TestSessionResponse[]> {
    return this.testSessionService.findSessionsByUser(user_id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new test session' })
  @ResponseMessage(SUCCESS)
  async createSession(
    @Body() createData: CreateTestSessionDto,
  ): Promise<TestSessionResponse> {
    return this.testSessionService.createSession(createData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update test session' })
  @ResponseMessage(SUCCESS)
  async updateSession(
    @Param('id') session_id: string,
    @Body() updateData: UpdateTestSessionDto,
  ): Promise<TestSessionResponse> {
    const transformedData = transformUpdateTestSessionDto(updateData);
    return this.testSessionService.updateSession(session_id, transformedData);
  }

  @Put(':id/start')
  @ApiOperation({ summary: 'Start test session' })
  @ResponseMessage(SUCCESS)
  async startSession(
    @Param('id') session_id: string,
  ): Promise<TestSessionResponse> {
    return this.testSessionService.startSession(session_id);
  }

  @Put(':id/pause')
  @ApiOperation({ summary: 'Pause test session' })
  @ResponseMessage(SUCCESS)
  async pauseSession(
    @Param('id') session_id: string,
  ): Promise<TestSessionResponse> {
    return this.testSessionService.pauseSession(session_id);
  }

  @Put(':id/resume')
  @ApiOperation({ summary: 'Resume test session' })
  @ResponseMessage(SUCCESS)
  async resumeSession(
    @Param('id') session_id: string,
  ): Promise<TestSessionResponse> {
    return this.testSessionService.resumeSession(session_id);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Complete test session' })
  @ResponseMessage(SUCCESS)
  async completeSession(
    @Param('id') session_id: string,
  ): Promise<TestSessionResponse> {
    return this.testSessionService.completeSession(session_id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete test session' })
  @ResponseMessage(SUCCESS)
  async deleteSession(@Param('id') session_id: string): Promise<void> {
    await this.testSessionService.deleteSession(session_id);
  }
}

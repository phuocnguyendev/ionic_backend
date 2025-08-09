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
import { CreateTestSectionTimeDto, UpdateTestSectionTimeDto } from './dto';
import { TestSectionTimeResponse } from './interfaces/test-section-time.interface';
import { TestSectionTimeService } from './test-section-time.service';

@ApiTags('TestSectionTime')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('test-section-time')
export class TestSectionTimeController {
  constructor(
    private readonly testSectionTimeService: TestSectionTimeService,
  ) {}

  @Get('test/:testId')
  @ApiOperation({ summary: 'Get all section times for a test' })
  @ResponseMessage(SUCCESS)
  async findByTestId(
    @Param('testId') test_id: string,
  ): Promise<TestSectionTimeResponse[]> {
    return this.testSectionTimeService.findByTestId(test_id);
  }

  @Get('test/:testId/section/:section')
  @ApiOperation({ summary: 'Get section time by test and section' })
  @ResponseMessage(SUCCESS)
  async findByTestAndSection(
    @Param('testId') test_id: string,
    @Param('section') section: test_section,
  ): Promise<TestSectionTimeResponse> {
    return this.testSectionTimeService.findByTestAndSection(test_id, section);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get section time by ID' })
  @ResponseMessage(SUCCESS)
  async findById(@Param('id') id: string): Promise<TestSectionTimeResponse> {
    return this.testSectionTimeService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create section time' })
  @ResponseMessage(SUCCESS)
  async create(
    @Body() createData: CreateTestSectionTimeDto,
  ): Promise<TestSectionTimeResponse> {
    return this.testSectionTimeService.create(createData);
  }

  @Post('test/:testId/default')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Set default section times for a test' })
  @ResponseMessage(SUCCESS)
  async setDefaultSectionTimes(
    @Param('testId') test_id: string,
  ): Promise<TestSectionTimeResponse[]> {
    return this.testSectionTimeService.setDefaultSectionTimes(test_id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update section time' })
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateTestSectionTimeDto,
  ): Promise<TestSectionTimeResponse> {
    return this.testSectionTimeService.update(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete section time' })
  @ResponseMessage(SUCCESS)
  async delete(@Param('id') id: string): Promise<void> {
    await this.testSectionTimeService.delete(id);
  }

  @Delete('test/:testId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete all section times for a test' })
  @ResponseMessage(SUCCESS)
  async deleteByTestId(@Param('testId') test_id: string): Promise<void> {
    await this.testSectionTimeService.deleteByTestId(test_id);
  }

  @Get('test/:testId/total-duration')
  @ApiOperation({ summary: 'Get total test duration' })
  @ResponseMessage(SUCCESS)
  async getTotalTestDuration(
    @Param('testId') test_id: string,
  ): Promise<{ total_duration: number }> {
    const totalDuration =
      await this.testSectionTimeService.getTotalTestDuration(test_id);
    return { total_duration: totalDuration };
  }
}

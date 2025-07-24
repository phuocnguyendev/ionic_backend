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
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CreateTestResultDto } from './dto/create-test-result.dto';
import { UpdateTestResultDto } from './dto/update-test-result.dto';
import { TestResultResponse } from './interfaces/test-result.interface';
import { TestResultService } from './test-result.service';

@ApiTags('Test-results')
@Controller('test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @Post()
  @ResponseMessage('Tạo kết quả test thành công')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createDto: CreateTestResultDto,
  ): Promise<TestResultResponse> {
    return this.testResultService.create(createDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách kết quả test thành công')
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'searchText',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'user_id',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'test_id',
    required: false,
    type: String,
  })
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('searchText') searchText?: string,
    @Query('user_id') user_id?: string,
    @Query('test_id') test_id?: string,
  ): Promise<BaseResponse<TestResultResponse> | TestResultResponse[]> {
    if (user_id) {
      return this.testResultService.findByUser(user_id);
    }
    if (test_id) {
      return this.testResultService.findByTest(test_id);
    }

    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize, 10) : 30;
    const search = searchText || '';

    return this.testResultService.findAll(pageNumber, pageSizeNumber, search);
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<TestResultResponse> {
    return this.testResultService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateTestResultDto,
  ): Promise<TestResultResponse> {
    return this.testResultService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.testResultService.remove(id);
  }
}

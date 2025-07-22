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
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestResponse } from './interfaces/test.interface';
import { TestService } from './test.service';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  @ResponseMessage('Tạo bài kiểm tra thành công')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateTestDto): Promise<TestResponse> {
    return this.testService.create(createDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách bài kiểm tra thành công')
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
    name: 'center_id',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'test_quarter',
    required: false,
    type: String,
    enum: ['q1', 'q2', 'q3', 'q4'],
  })
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('searchText') searchText?: string,
    @Query('center_id') center_id?: string,
    @Query('test_quarter') test_quarter?: 'q1' | 'q2' | 'q3' | 'q4',
  ): Promise<BaseResponse<TestResponse> | TestResponse[]> {
    if (center_id) {
      return this.testService.findByCenter(center_id);
    }
    if (test_quarter) {
      return this.testService.findByQuarter(test_quarter);
    }

    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize, 10) : 30;
    const search = searchText || '';

    return this.testService.findAll(pageNumber, pageSizeNumber, search);
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') test_id: string): Promise<TestResponse> {
    return this.testService.findOne(test_id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') test_id: string,
    @Body() updateDto: UpdateTestDto,
  ): Promise<TestResponse> {
    return this.testService.update(test_id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') test_id: string): Promise<void> {
    return this.testService.remove(test_id);
  }
}

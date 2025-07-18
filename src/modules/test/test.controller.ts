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
import { ApiTags } from '@nestjs/swagger';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestResponse } from './interfaces/test.interface';
import { TestService } from './test.service';

@ApiTags('tests')
@Controller('tests')
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
  async findAll(
    @Query('center_id') center_id?: string,
    @Query('test_quarter') test_quarter?: 'q1' | 'q2' | 'q3' | 'q4',
  ): Promise<TestResponse[]> {
    if (center_id) {
      return this.testService.findByCenter(center_id);
    }
    if (test_quarter) {
      return this.testService.findByQuarter(test_quarter);
    }
    return this.testService.findAll();
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

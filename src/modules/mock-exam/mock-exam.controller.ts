import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CreatemockexamDto } from './dto/create-mock-exam.dto';
import { UpdatemockexamDto } from './dto/update-mock-exam.dto';
import { mockexamService } from './mock-exam.service';

@ApiTags('mockexam')
@Controller('mock-exam')
export class mockexamController {
  constructor(private readonly lmockexamService: mockexamService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatemockexamDto): Promise<any> {
    return this.lmockexamService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lmockexamService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lmockexamService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatemockexamDto,
  ): Promise<any> {
    return this.lmockexamService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lmockexamService.remove(id);
  }
}

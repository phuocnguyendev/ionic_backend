import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { coursetestService } from './course-test.service';
import { CreatecoursetestDto } from './dto/create-course-test.dto';
import { UpdatecoursetestDto } from './dto/update-course-test.dto';

@Controller('course-test')
export class coursetestController {
  constructor(private readonly lcoursetestService: coursetestService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatecoursetestDto): Promise<any> {
    return this.lcoursetestService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lcoursetestService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lcoursetestService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatecoursetestDto,
  ): Promise<any> {
    return this.lcoursetestService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lcoursetestService.remove(id);
  }
}

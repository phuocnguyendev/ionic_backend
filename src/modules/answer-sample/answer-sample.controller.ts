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
import { CreateanswersampleDto } from './dto/create-answer-sample.dto';
import { UpdateanswersampleDto } from './dto/update-answer-sample.dto';
import { answersampleService } from './answer-sample.service';

@ApiTags('answersample')
@Controller('answer-sample')
export class answersampleController {
  constructor(private readonly lanswersampleService: answersampleService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreateanswersampleDto): Promise<any> {
    return this.lanswersampleService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lanswersampleService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lanswersampleService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateanswersampleDto,
  ): Promise<any> {
    return this.lanswersampleService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lanswersampleService.remove(id);
  }
}

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
import { CreatetesthistoryDto } from './dto/create-test-history.dto';
import { UpdatetesthistoryDto } from './dto/update-test-history.dto';
import { testhistoryService } from './test-history.service';

@ApiTags('testhistory')
@Controller('test-history')
export class testhistoryController {
  constructor(private readonly ltesthistoryService: testhistoryService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatetesthistoryDto): Promise<any> {
    return this.ltesthistoryService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.ltesthistoryService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.ltesthistoryService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatetesthistoryDto,
  ): Promise<any> {
    return this.ltesthistoryService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.ltesthistoryService.remove(id);
  }
}

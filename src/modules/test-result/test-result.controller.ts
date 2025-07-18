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
import { CreatetestresultDto } from './dto/create-test-result.dto';
import { UpdatetestresultDto } from './dto/update-test-result.dto';
import { testresultService } from './test-result.service';

@ApiTags('testresult')
@Controller('test-result')
export class testresultController {
  constructor(private readonly ltestresultService: testresultService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatetestresultDto): Promise<any> {
    return this.ltestresultService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.ltestresultService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.ltestresultService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatetestresultDto,
  ): Promise<any> {
    return this.ltestresultService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.ltestresultService.remove(id);
  }
}

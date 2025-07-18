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
import { CreatesystemlogDto } from './dto/create-system-log.dto';
import { UpdatesystemlogDto } from './dto/update-system-log.dto';
import { systemlogService } from './system-log.service';

@ApiTags('systemlog')
@Controller('system-log')
export class systemlogController {
  constructor(private readonly lsystemlogService: systemlogService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatesystemlogDto): Promise<any> {
    return this.lsystemlogService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lsystemlogService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lsystemlogService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatesystemlogDto,
  ): Promise<any> {
    return this.lsystemlogService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lsystemlogService.remove(id);
  }
}

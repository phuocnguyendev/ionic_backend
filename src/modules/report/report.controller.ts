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
import { CreatereportDto } from './dto/create-report.dto';
import { UpdatereportDto } from './dto/update-report.dto';
import { reportService } from './report.service';

@ApiTags('report')
@Controller('report')
export class reportController {
  constructor(private readonly lreportService: reportService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatereportDto): Promise<any> {
    return this.lreportService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lreportService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lreportService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatereportDto,
  ): Promise<any> {
    return this.lreportService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lreportService.remove(id);
  }
}

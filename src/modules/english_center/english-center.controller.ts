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
import { CreateEnglishCenterDto } from './dto/create-english-center.dto';
import { UpdateEnglishCenterDto } from './dto/update-english-center.dto';
import { EnglishCenterResponse } from './dto/interfaces/english_center.interface';
import { EnglishCenterService } from './english-center.service';

@ApiTags('English Center')
@Controller('english-center')
export class EnglishCenterController {
  constructor(private readonly englishCenterService: EnglishCenterService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreateEnglishCenterDto): Promise<EnglishCenterResponse> {
    return this.englishCenterService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<EnglishCenterResponse[]> {
    return this.englishCenterService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') center_id: string): Promise<EnglishCenterResponse> {
    return this.englishCenterService.findOne(center_id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') center_id: string,
    @Body() updateDto: UpdateEnglishCenterDto,
  ): Promise<EnglishCenterResponse> {
    return this.englishCenterService.update(center_id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') center_id: string): Promise<void> {
    return this.englishCenterService.remove(center_id);
  }
}

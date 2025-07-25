import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CreateEnglishCenterDto } from './dto/create-english_center.dto';
import { EnglishCenterResponse } from './interfaces/english_center.interface';
import { UpdateEnglishCenterDto } from './dto/update-english_center.dto';
import { EnglishCenterService } from './english-center.service';

@ApiTags('EnglishCenter')
@Controller('EnglishCenter')
export class EnglishCenterController {
  constructor(private readonly englishCenterService: EnglishCenterService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(
    @Body() createDto: CreateEnglishCenterDto,
  ): Promise<EnglishCenterResponse> {
    return this.englishCenterService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
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
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('searchText') searchText?: string,
  ): Promise<BaseResponse<EnglishCenterResponse>> {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize, 10) : 30;
    const search = searchText || '';

    return this.englishCenterService.findAll(
      pageNumber,
      pageSizeNumber,
      search,
    );
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(
    @Param('id') center_id: string,
  ): Promise<EnglishCenterResponse> {
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

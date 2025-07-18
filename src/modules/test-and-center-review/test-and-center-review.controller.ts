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
import { CreatetestandcenterreviewDto } from './dto/create-test-and-center-review.dto';
import { UpdatetestandcenterreviewDto } from './dto/update-test-and-center-review.dto';
import { testandcenterreviewService } from './test-and-center-review.service';

@Controller('test-and-center-review')
export class testandcenterreviewController {
  constructor(
    private readonly ltestandcenterreviewService: testandcenterreviewService,
  ) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatetestandcenterreviewDto): Promise<any> {
    return this.ltestandcenterreviewService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.ltestandcenterreviewService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.ltestandcenterreviewService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatetestandcenterreviewDto,
  ): Promise<any> {
    return this.ltestandcenterreviewService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.ltestandcenterreviewService.remove(id);
  }
}

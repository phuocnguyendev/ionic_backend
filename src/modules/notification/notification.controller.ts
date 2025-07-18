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
import { CreatenotificationDto } from './dto/create-notification.dto';
import { UpdatenotificationDto } from './dto/update-notification.dto';
import { notificationService } from './notification.service';

@ApiTags('notification')
@Controller('notification')
export class notificationController {
  constructor(private readonly lnotificationService: notificationService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatenotificationDto): Promise<any> {
    return this.lnotificationService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lnotificationService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lnotificationService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatenotificationDto,
  ): Promise<any> {
    return this.lnotificationService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lnotificationService.remove(id);
  }
}

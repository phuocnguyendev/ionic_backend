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
import { CreatepermissionDto } from './dto/create-permission.dto';
import { UpdatepermissionDto } from './dto/update-permission.dto';
import { permissionService } from './permission.service';

@ApiTags('permission')
@Controller('permission')
export class permissionController {
  constructor(private readonly lpermissionService: permissionService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatepermissionDto): Promise<any> {
    return this.lpermissionService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lpermissionService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lpermissionService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatepermissionDto,
  ): Promise<any> {
    return this.lpermissionService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lpermissionService.remove(id);
  }
}

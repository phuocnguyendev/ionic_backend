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
import { courseenrollmentService } from './course-enrollment.service';
import { CreatecourseenrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdatecourseenrollmentDto } from './dto/update-course-enrollment.dto';

@Controller('course-enrollment')
export class courseenrollmentController {
  constructor(
    private readonly lcourseenrollmentService: courseenrollmentService,
  ) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatecourseenrollmentDto): Promise<any> {
    return this.lcourseenrollmentService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lcourseenrollmentService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lcourseenrollmentService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatecourseenrollmentDto,
  ): Promise<any> {
    return this.lcourseenrollmentService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lcourseenrollmentService.remove(id);
  }
}

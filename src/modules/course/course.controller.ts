import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseResponse } from './interfaces/course.interface';

@ApiTags('courses')
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @ResponseMessage('Tạo khóa học thành công')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseResponse> {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ResponseMessage('Lấy danh sách khóa học thành công')
  async findAll(
    @Query('center_id') center_id?: string,
  ): Promise<CourseResponse[]> {
    return center_id
      ? this.courseService.findByCenter(center_id)
      : this.courseService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<CourseResponse> {
    return this.courseService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponse> {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.courseService.remove(id);
  }
}

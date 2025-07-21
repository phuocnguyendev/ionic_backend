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
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/dto/base-response.dto';
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
  @ApiQuery({
    name: 'center_id',
    required: false,
    type: String,
  })
  async findAll(
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
    @Query('searchText') searchText?: string,
    @Query('center_id') center_id?: string,
  ): Promise<BaseResponse<CourseResponse> | CourseResponse[]> {
    if (center_id) {
      return this.courseService.findByCenter(center_id);
    }

    const pageNumber = page ? parseInt(page, 10) : 1;
    const pageSizeNumber = pageSize ? parseInt(pageSize, 10) : 30;
    const search = searchText || '';

    return this.courseService.findAll(pageNumber, pageSizeNumber, search);
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

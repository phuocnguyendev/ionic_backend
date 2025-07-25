import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CourseEnrollmentResponse } from 'src/interfaces';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { JoinCourseDto } from './dto/join-course.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';

@ApiTags('CourseEnrollment')
@Controller('CourseEnrollment')
export class CourseEnrollmentController {
  constructor(
    private readonly courseEnrollmentService: CourseEnrollmentService,
  ) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreateCourseEnrollmentDto): Promise<any> {
    return this.courseEnrollmentService.create(createDto);
  }

  @Post('join')
  @ResponseMessage(SUCCESS)
  async joinCourse(
    @Body() joinDto: JoinCourseDto,
    @Request() req: any,
  ): Promise<any> {
    const user_id = req.user?.user_id;
    return this.courseEnrollmentService.joinCourse(user_id, joinDto);
  }

  @Delete('leave/:course_id')
  @ResponseMessage(SUCCESS)
  async leaveCourse(
    @Param('course_id', ParseUUIDPipe) course_id: string,
    @Request() req: any,
  ): Promise<void> {
    const user_id = req.user?.user_id;
    return this.courseEnrollmentService.leaveCourse(user_id, course_id);
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
  ): Promise<BaseResponse<CourseEnrollmentResponse>> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 30;
    const search = searchText || '';

    return this.courseEnrollmentService.findAll(pageNum, size, search);
  }

  @Get('my-enrollments')
  @ResponseMessage(SUCCESS)
  async getMyEnrollments(@Request() req: any): Promise<any[]> {
    const user_id = req.user?.user_id;
    return this.courseEnrollmentService.findByUser(user_id);
  }

  @Get('user/:user_id')
  @ResponseMessage(SUCCESS)
  async findByUser(
    @Param('user_id', ParseUUIDPipe) user_id: string,
  ): Promise<any[]> {
    return this.courseEnrollmentService.findByUser(user_id);
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    return this.courseEnrollmentService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCourseEnrollmentDto,
  ): Promise<any> {
    return this.courseEnrollmentService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.courseEnrollmentService.remove(id);
  }

  @Delete(':id/hard')
  @ResponseMessage(SUCCESS)
  async hardDelete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.courseEnrollmentService.hardDelete(id);
  }
}

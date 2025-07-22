import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { SUCCESS } from 'src/constants/message.constant';
import { ResponseMessage } from 'src/core/customize';
import { CourseEnrollmentService } from './course-enrollment.service';
import { CreateCourseEnrollmentDto } from './dto/create-course-enrollment.dto';
import { UpdateCourseEnrollmentDto } from './dto/update-course-enrollment.dto';
import { JoinCourseDto } from './dto/join-course.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Course-enrollment')
@Controller('course-enrollment')
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
  @ResponseMessage('Đăng ký khóa học thành công')
  async joinCourse(
    @Body() joinDto: JoinCourseDto,
    @Request() req: any,
  ): Promise<any> {
    const user_id = req.user?.user_id;
    return this.courseEnrollmentService.joinCourse(user_id, joinDto);
  }

  @Delete('leave/:course_id')
  @ResponseMessage('Rời khóa học thành công')
  async leaveCourse(
    @Param('course_id') course_id: string,
    @Request() req: any,
  ): Promise<void> {
    const user_id = req.user?.user_id;
    return this.courseEnrollmentService.leaveCourse(user_id, course_id);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.courseEnrollmentService.findAll();
  }

  @Get('my-enrollments')
  @ResponseMessage(SUCCESS)
  async getMyEnrollments(@Request() req: any): Promise<any[]> {
    const user_id = req.user?.user_id;
    return this.courseEnrollmentService.findByUser(user_id);
  }

  @Get('user/:user_id')
  @ResponseMessage(SUCCESS)
  async findByUser(@Param('user_id') user_id: string): Promise<any[]> {
    return this.courseEnrollmentService.findByUser(user_id);
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.courseEnrollmentService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage('Cập nhật đăng ký thành công')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCourseEnrollmentDto,
  ): Promise<any> {
    return this.courseEnrollmentService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage('Xóa đăng ký thành công')
  async remove(@Param('id') id: string): Promise<void> {
    return this.courseEnrollmentService.remove(id);
  }

  @Delete(':id/hard')
  @ResponseMessage('Xóa vĩnh viễn đăng ký thành công')
  async hardDelete(@Param('id') id: string): Promise<void> {
    return this.courseEnrollmentService.hardDelete(id);
  }
}

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
import { CreatestudentevaluationDto } from './dto/create-student-evaluation.dto';
import { UpdatestudentevaluationDto } from './dto/update-student-evaluation.dto';
import { studentevaluationService } from './student-evaluation.service';

@ApiTags('studentevaluation')
@Controller('student-evaluation')
export class studentevaluationController {
  constructor(private readonly lstudentevaluationService: studentevaluationService) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreatestudentevaluationDto): Promise<any> {
    return this.lstudentevaluationService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lstudentevaluationService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lstudentevaluationService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdatestudentevaluationDto,
  ): Promise<any> {
    return this.lstudentevaluationService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lstudentevaluationService.remove(id);
  }
}

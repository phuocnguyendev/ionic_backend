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
import { airecommendationService } from './ai-recommendation.service';
import { CreateairecommendationDto } from './dto/create-ai-recommendation.dto';
import { UpdateairecommendationDto } from './dto/update-ai-recommendation.dto';

@Controller('ai-recommendation')
export class airecommendationController {
  constructor(
    private readonly lairecommendationService: airecommendationService,
  ) {}

  @Post()
  @ResponseMessage(SUCCESS)
  async create(@Body() createDto: CreateairecommendationDto): Promise<any> {
    return this.lairecommendationService.create(createDto);
  }

  @Get()
  @ResponseMessage(SUCCESS)
  async findAll(): Promise<any[]> {
    return this.lairecommendationService.findAll();
  }

  @Get(':id')
  @ResponseMessage(SUCCESS)
  async findOne(@Param('id') id: string): Promise<any> {
    return this.lairecommendationService.findOne(id);
  }

  @Put(':id')
  @ResponseMessage(SUCCESS)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateairecommendationDto,
  ): Promise<any> {
    return this.lairecommendationService.update(id, updateDto);
  }

  @Delete(':id')
  @ResponseMessage(SUCCESS)
  async remove(@Param('id') id: string): Promise<void> {
    return this.lairecommendationService.remove(id);
  }
}

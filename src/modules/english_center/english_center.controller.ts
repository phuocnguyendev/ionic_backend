import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EnglishCenterService } from './english_center.service';
import { CreateEnglishCenterDto } from './dto/create-english_center.dto';
import { UpdateEnglishCenterDto } from './dto/update-english_center.dto';

@ApiTags('english-centers')
@Controller('english-center')
export class EnglishCenterController {
  constructor(private readonly englishCenterService: EnglishCenterService) {}

  @Post()
  create(@Body() createEnglishCenterDto: CreateEnglishCenterDto) {
    return this.englishCenterService.create(createEnglishCenterDto);
  }

  @Get()
  findAll() {
    return this.englishCenterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.englishCenterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnglishCenterDto: UpdateEnglishCenterDto) {
    return this.englishCenterService.update(+id, updateEnglishCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.englishCenterService.remove(+id);
  }
}

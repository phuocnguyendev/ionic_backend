import { Injectable } from '@nestjs/common';
import { CreateEnglishCenterDto } from './dto/create-english_center.dto';
import { UpdateEnglishCenterDto } from './dto/update-english_center.dto';

@Injectable()
export class EnglishCenterService {
  create(createEnglishCenterDto: CreateEnglishCenterDto) {
    return 'This action adds a new englishCenter';
  }

  findAll() {
    return `This action returns all englishCenter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} englishCenter`;
  }

  update(id: number, updateEnglishCenterDto: UpdateEnglishCenterDto) {
    return `This action updates a #${id} englishCenter`;
  }

  remove(id: number) {
    return `This action removes a #${id} englishCenter`;
  }
}

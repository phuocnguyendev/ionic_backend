import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnglishCenterRepository } from './english-center.repository';
import { EnglishCenterData } from './dto/interfaces/english_center.interface';

@Injectable()
export class EnglishCenterValidator {
  constructor(private readonly englishCenterRepository: EnglishCenterRepository) {}

  async validateCenterName(center_name: string, excludeId?: string): Promise<void> {
    if (!center_name) return;

    const center = await this.englishCenterRepository.findByName(center_name);

    if (center && center.center_id !== excludeId) {
      throw new HttpException(
        `Trung tâm với tên ${center_name} đã tồn tại`,
        HttpStatus.CONFLICT,
      );
    }
  }

  async ensureCenterExists(center_id: string): Promise<EnglishCenterData> {
    const center = await this.englishCenterRepository.findById(center_id);
    if (!center) {
      throw new HttpException(
        `Trung tâm với ID ${center_id} không tồn tại`,
        HttpStatus.NOT_FOUND,
      );
    }
    return center;
  }
}

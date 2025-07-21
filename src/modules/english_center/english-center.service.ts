import { Injectable } from '@nestjs/common';
import { BaseResponse } from 'src/common/dto/base-response.dto';
import {
  EnglishCenterCreateData,
  EnglishCenterResponse,
  EnglishCenterUpdateData,
} from './dto/interfaces/english_center.interface';
import { EnglishCenterRepository } from './english-center.repository';
import { EnglishCenterValidator } from './english-center.validator';

@Injectable()
export class EnglishCenterService {
  constructor(
    private readonly englishCenterRepository: EnglishCenterRepository,
    private readonly englishCenterValidator: EnglishCenterValidator,
  ) {}

  async create(
    createData: EnglishCenterCreateData,
  ): Promise<EnglishCenterResponse> {
    await this.englishCenterValidator.validateCenterName(
      createData.center_name,
    );

    const sanitizedCreateData = {
      ...createData,
      address: createData.address ?? undefined,
    };
    const center =
      await this.englishCenterRepository.createCenter(sanitizedCreateData);
    return center;
  }

  async findAll(
    page = 1,
    pageSize = 30,
    searchText = '',
  ): Promise<BaseResponse<EnglishCenterResponse>> {
    const [data, count] = await this.englishCenterRepository.paginateCenters(
      page,
      pageSize,
      searchText,
    );

    return new BaseResponse<EnglishCenterResponse>(data, count);
  }

  async findOne(center_id: string): Promise<EnglishCenterResponse> {
    return this.englishCenterValidator.ensureCenterExists(center_id);
  }

  async update(
    center_id: string,
    updateData: EnglishCenterUpdateData,
  ): Promise<EnglishCenterResponse> {
    await this.englishCenterValidator.ensureCenterExists(center_id);

    if (updateData.center_name) {
      await this.englishCenterValidator.validateCenterName(
        updateData.center_name,
        center_id,
      );
    }

    const center = await this.englishCenterRepository.updateCenter(
      center_id,
      updateData,
    );
    return center;
  }

  async remove(center_id: string): Promise<void> {
    await this.englishCenterValidator.ensureCenterExists(center_id);
    await this.englishCenterRepository.deleteCenter(center_id);
  }
}

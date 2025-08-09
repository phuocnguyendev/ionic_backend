import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { test_section } from '@prisma/client';
import { CreateTestSectionTimeDto, UpdateTestSectionTimeDto } from './dto';
import {
  TestSectionTimeCreateData,
  TestSectionTimeResponse,
  TestSectionTimeUpdateData,
} from './interfaces/test-section-time.interface';
import { TestSectionTimeRepository } from './test-section-time.repository';

@Injectable()
export class TestSectionTimeService {
  constructor(
    private readonly testSectionTimeRepository: TestSectionTimeRepository,
  ) {}

  async findByTestId(test_id: string): Promise<TestSectionTimeResponse[]> {
    return this.testSectionTimeRepository.findByTestId(test_id);
  }

  async findByTestAndSection(
    test_id: string,
    section: test_section,
  ): Promise<TestSectionTimeResponse> {
    const sectionTime =
      await this.testSectionTimeRepository.findByTestAndSection(
        test_id,
        section,
      );
    if (!sectionTime) {
      throw new NotFoundException(
        `Section time for test ${test_id} and section ${section} not found`,
      );
    }
    return sectionTime;
  }

  async findById(id: string): Promise<TestSectionTimeResponse> {
    const sectionTime = await this.testSectionTimeRepository.findById(id);
    if (!sectionTime) {
      throw new NotFoundException(`Section time with ID ${id} not found`);
    }
    return sectionTime;
  }

  async create(
    createData: CreateTestSectionTimeDto,
  ): Promise<TestSectionTimeResponse> {
    // Check if section time already exists for this test and section
    const existing = await this.testSectionTimeRepository.findByTestAndSection(
      createData.test_id,
      createData.section,
    );

    if (existing) {
      throw new BadRequestException(
        `Section time already exists for test ${createData.test_id} and section ${createData.section}`,
      );
    }

    const sectionTimeData: TestSectionTimeCreateData = {
      test_id: createData.test_id,
      section: createData.section,
      duration: createData.duration,
    };

    return this.testSectionTimeRepository.create(sectionTimeData);
  }

  async update(
    id: string,
    updateData: UpdateTestSectionTimeDto,
  ): Promise<TestSectionTimeResponse> {
    const existing = await this.testSectionTimeRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Section time with ID ${id} not found`);
    }

    // If updating test_id or section, check for conflicts
    if (updateData.test_id || updateData.section) {
      const test_id = updateData.test_id || existing.test_id;
      const section = updateData.section || existing.section;

      const conflicting =
        await this.testSectionTimeRepository.findByTestAndSection(
          test_id,
          section,
        );
      if (conflicting && conflicting.id !== id) {
        throw new BadRequestException(
          `Section time already exists for test ${test_id} and section ${section}`,
        );
      }
    }

    const sectionTimeUpdateData: TestSectionTimeUpdateData = {
      test_id: updateData.test_id,
      section: updateData.section,
      duration: updateData.duration,
    };

    return this.testSectionTimeRepository.update(id, sectionTimeUpdateData);
  }

  async delete(id: string): Promise<void> {
    const existing = await this.testSectionTimeRepository.findById(id);
    if (!existing) {
      throw new NotFoundException(`Section time with ID ${id} not found`);
    }

    await this.testSectionTimeRepository.delete(id);
  }

  async deleteByTestId(test_id: string): Promise<void> {
    await this.testSectionTimeRepository.deleteByTestId(test_id);
  }

  // Utility method to get total test duration
  async getTotalTestDuration(test_id: string): Promise<number> {
    const sectionTimes =
      await this.testSectionTimeRepository.findByTestId(test_id);
    return sectionTimes.reduce(
      (total, sectionTime) => total + sectionTime.duration,
      0,
    );
  }

  // Method to set default section times for a test
  async setDefaultSectionTimes(
    test_id: string,
  ): Promise<TestSectionTimeResponse[]> {
    const defaultTimes = [
      { section: test_section.listening, duration: 2400 }, // 40 minutes
      { section: test_section.reading, duration: 3600 }, // 60 minutes
      { section: test_section.writing, duration: 3600 }, // 60 minutes
      { section: test_section.speaking, duration: 840 }, // 14 minutes
    ];

    const results: TestSectionTimeResponse[] = [];

    for (const defaultTime of defaultTimes) {
      const existing =
        await this.testSectionTimeRepository.findByTestAndSection(
          test_id,
          defaultTime.section,
        );

      if (!existing) {
        const created = await this.testSectionTimeRepository.create({
          test_id,
          section: defaultTime.section,
          duration: defaultTime.duration,
        });
        results.push(created);
      } else {
        results.push(existing);
      }
    }

    return results;
  }
}

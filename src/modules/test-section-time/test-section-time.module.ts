import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { TestSectionTimeController } from './test-section-time.controller';
import { TestSectionTimeRepository } from './test-section-time.repository';
import { TestSectionTimeService } from './test-section-time.service';

@Module({
  controllers: [TestSectionTimeController],
  providers: [TestSectionTimeService, TestSectionTimeRepository, PrismaService],
  exports: [TestSectionTimeService, TestSectionTimeRepository],
})
export class TestSectionTimeModule {}

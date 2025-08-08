import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { TestSectionAttemptController } from './test-section-attempt.controller';
import { TestSectionAttemptRepository } from './test-section-attempt.repository';
import { TestSectionAttemptService } from './test-section-attempt.service';

@Module({
  controllers: [TestSectionAttemptController],
  providers: [
    TestSectionAttemptService,
    TestSectionAttemptRepository,
    PrismaService,
  ],
  exports: [TestSectionAttemptService, TestSectionAttemptRepository],
})
export class TestSectionAttemptModule {}

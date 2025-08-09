import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { TestQuestionController } from './test-question.controller';
import { TestQuestionRepository } from './test-question.repository';
import { TestQuestionService } from './test-question.service';

@Module({
  controllers: [TestQuestionController],
  providers: [TestQuestionService, TestQuestionRepository, PrismaService],
  exports: [TestQuestionService, TestQuestionRepository],
})
export class TestQuestionModule {}

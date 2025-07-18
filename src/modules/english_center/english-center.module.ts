import { Module } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { EnglishCenterController } from './english-center.controller';
import { EnglishCenterRepository } from './english-center.repository';
import { EnglishCenterService } from './english-center.service';
import { EnglishCenterValidator } from './english-center.validator';

@Module({
  imports: [],
  controllers: [EnglishCenterController],
  providers: [
    EnglishCenterService,
    EnglishCenterRepository,
    EnglishCenterValidator,
    PrismaService,
  ],
  exports: [EnglishCenterService, EnglishCenterRepository],
})
export class EnglishCenterModule {}

import { Module } from '@nestjs/common';
import { UserAnswerController } from './user-answer.controller';
import { UserAnswerService } from './user-answer.service';
import { UserAnswerRepository } from './repositories/user-answer.repository';
import { UserAnswerValidator } from './validators';
import { PrismaModule } from '../../config/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserAnswerController],
  providers: [UserAnswerService, UserAnswerRepository, UserAnswerValidator],
  exports: [UserAnswerService, UserAnswerRepository, UserAnswerValidator],
})
export class UserAnswerModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './module/role/role.module';
import { UserModule } from './module/user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RoleModule, UserModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

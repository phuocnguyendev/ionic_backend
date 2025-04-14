import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './module/role/role.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [RoleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

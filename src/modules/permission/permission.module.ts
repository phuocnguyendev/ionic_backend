import { Module } from '@nestjs/common';
import { permissionController } from './permission.controller';
import { permissionService } from './permission.service';

@Module({
  imports: [],
  controllers: [permissionController],
  providers: [permissionService],
  exports: [permissionService],
})
export class permissionModule {}

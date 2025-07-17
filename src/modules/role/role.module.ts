import { Module } from '@nestjs/common';
import { ElasticsearchService } from 'src/config/elasticsearch/elasticsearch.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { RoleValidator } from './role.validator';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [
    RoleService,
    RoleRepository,
    RoleValidator,
    PrismaService,
    ElasticsearchService,
  ],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}

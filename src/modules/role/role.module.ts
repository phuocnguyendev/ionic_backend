import { Module } from '@nestjs/common';
import { ElasticsearchService } from 'src/config/elasticsearch/elasticsearch.service';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [],
  controllers: [RoleController],
  providers: [RoleService, PrismaService, ElasticsearchService],
})
export class RoleModule {}

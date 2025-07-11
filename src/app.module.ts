import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from './config/elasticsearch/elasticsearch.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { PrismaService } from './config/prisma/prisma.service';
import { RedisModule } from './config/redis/redis.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';
import { CacheModule } from './common/cache/cache.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoleModule,
    UserModule,
    PrismaModule,
    ConfigModule,
    RedisModule,
    ElasticsearchModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

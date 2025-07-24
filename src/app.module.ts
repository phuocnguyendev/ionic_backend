import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElasticsearchModule } from './config/elasticsearch/elasticsearch.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { PrismaService } from './config/prisma/prisma.service';

// Core modules
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { UserModule } from './modules/user/user.module';

// Business modules
import { EnglishCenterModule } from './modules/english_center/english-center.module';
import { TestModule } from './modules/test/test.module';

// TODO: Uncomment these modules after implementing them properly
import { CourseModule } from './modules/course/course.module';
import { TestResultModule } from './modules/test-result/test-result.module';
// import { NotificationModule } from './modules/notification/notification.module';
// import { PermissionModule } from './modules/permission/permission.module';
// import { MockExamModule } from './modules/mock-exam/mock-exam.module';
// import { StudentEvaluationModule } from './modules/student-evaluation/student-evaluation.module';
// import { TestHistoryModule } from './modules/test-history/test-history.module';
// import { CourseTestModule } from './modules/course-test/course-test.module';
import { CourseEnrollmentModule } from './modules/course-enrollment/course-enrollment.module';
// import { SystemLogModule } from './modules/system-log/system-log.module';
// import { AiRecommendationModule } from './modules/ai-recommendation/ai-recommendation.module';
// import { AnswerSampleModule } from './modules/answer-sample/answer-sample.module';
// import { ReportModule } from './modules/report/report.module';
// import { TestAndCenterReviewModule } from './modules/test-and-center-review/test-and-center-review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Core modules
    RoleModule,
    UserModule,
    AuthModule,

    // Infrastructure
    PrismaModule,
    ConfigModule,
    ElasticsearchModule,

    // Business modules (implemented)
    EnglishCenterModule,
    TestModule,

    // TODO: Add these modules after proper implementation
    CourseModule,

    TestResultModule,
    // NotificationModule,
    // PermissionModule,
    // MockExamModule,
    // StudentEvaluationModule,
    // TestHistoryModule,
    // CourseTestModule,
    CourseEnrollmentModule,
    // SystemLogModule,
    // AiRecommendationModule,
    // AnswerSampleModule,
    // ReportModule,
    // TestAndCenterReviewModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

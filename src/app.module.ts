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
import { TestSessionModule } from './modules/test-session/test-session.module';
import { UserAnswerModule } from './modules/user-answer/user-answer.module';
// import { SpeakingAssessmentModule } from './modules/speaking-assessment/speaking-assessment.module';
// import { NotificationModule } from './modules/notification/notification.module';
// System modules
import { PermissionModule } from './modules/permission/permission.module';
// import { MockExamModule } from './modules/mock-exam/mock-exam.module';
// import { StudentEvaluationModule } from './modules/student-evaluation/student-evaluation.module';
// import { TestHistoryModule } from './modules/test-history/test-history.module';
// import { CourseTestModule } from './modules/course-test/course-test.module';
import { CourseEnrollmentModule } from './modules/course-enrollment/course-enrollment.module';

// NEW CRITICAL MODULES
import { TestQuestionModule } from './modules/test-question/test-question.module';
import { TestSectionAttemptModule } from './modules/test-section-attempt/test-section-attempt.module';
import { TestSectionTimeModule } from './modules/test-section-time/test-section-time.module';
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

    // NEW CRITICAL MODULES - IMPLEMENTED
    TestQuestionModule,
    TestSectionTimeModule,
    TestSectionAttemptModule,

    // TODO: Add these modules after proper implementation
    CourseModule,

    TestResultModule,
    TestSessionModule,
    UserAnswerModule,
    // SpeakingAssessmentModule,
    // NotificationModule,
    // System modules
    PermissionModule,
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

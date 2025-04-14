-- CreateEnum
CREATE TYPE "TestSection" AS ENUM ('Listening', 'Reading', 'Writing', 'Speaking');

-- CreateEnum
CREATE TYPE "TestQuarter" AS ENUM ('Q1', 'Q2', 'Q3', 'Q4');

-- CreateTable
CREATE TABLE "Role" (
    "role_id" UUID NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "EnglishCenter" (
    "center_id" UUID NOT NULL,
    "center_name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "contact_email" VARCHAR(100),
    "contact_phone" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnglishCenter_pkey" PRIMARY KEY ("center_id")
);

-- CreateTable
CREATE TABLE "StudentEvaluations" (
    "evaluation_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "evaluator_id" UUID NOT NULL,
    "evaluation_comments" TEXT,
    "evaluation_score" DECIMAL(3,1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentEvaluations_pkey" PRIMARY KEY ("evaluation_id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notification_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "notification_type" VARCHAR(100) NOT NULL,
    "content" TEXT,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "role_id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Test" (
    "test_id" UUID NOT NULL,
    "test_name" VARCHAR(255) NOT NULL,
    "test_quarter" "TestQuarter" NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "center_id" UUID NOT NULL,
    "test_sections" "TestSection"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("test_id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "result_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "listening_score" DECIMAL(3,1) NOT NULL,
    "reading_score" DECIMAL(3,1) NOT NULL,
    "writing_score" DECIMAL(3,1) NOT NULL,
    "speaking_score" DECIMAL(3,1) NOT NULL,
    "overall_score" DECIMAL(3,1) NOT NULL,
    "feedback" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "TestHistory" (
    "history_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "test_status" TEXT NOT NULL,
    "total_score" DECIMAL(3,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" UUID NOT NULL,
    "course_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "center_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "CourseTest" (
    "course_test_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseTest_pkey" PRIMARY KEY ("course_test_id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "enrollment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "permission_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "permission_type" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "SystemLog" (
    "log_id" UUID NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemLog_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "AIRecommendation" (
    "recommendation_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "recommended_changes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIRecommendation_pkey" PRIMARY KEY ("recommendation_id")
);

-- CreateTable
CREATE TABLE "AnswerSample" (
    "sample_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "sample_answer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnswerSample_pkey" PRIMARY KEY ("sample_id")
);

-- CreateTable
CREATE TABLE "Report" (
    "report_id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "report_type" TEXT NOT NULL,
    "content" TEXT,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "MockExam" (
    "mock_exam_id" UUID NOT NULL,
    "mock_exam_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "center_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "mock_exam_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockExam_pkey" PRIMARY KEY ("mock_exam_id")
);

-- CreateTable
CREATE TABLE "TestAndCenterReview" (
    "review_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "rating" DECIMAL(3,1) NOT NULL,
    "review_comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TestAndCenterReview_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "_PermissionToUser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_PermissionToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "_PermissionToUser_B_index" ON "_PermissionToUser"("B");

-- AddForeignKey
ALTER TABLE "StudentEvaluations" ADD CONSTRAINT "StudentEvaluations_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "TestResult"("result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEvaluations" ADD CONSTRAINT "StudentEvaluations_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "EnglishCenter"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "EnglishCenter"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestHistory" ADD CONSTRAINT "TestHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestHistory" ADD CONSTRAINT "TestHistory_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "EnglishCenter"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTest" ADD CONSTRAINT "CourseTest_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTest" ADD CONSTRAINT "CourseTest_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permission" ADD CONSTRAINT "Permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemLog" ADD CONSTRAINT "SystemLog_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIRecommendation" ADD CONSTRAINT "AIRecommendation_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "TestResult"("result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerSample" ADD CONSTRAINT "AnswerSample_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "EnglishCenter"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MockExam" ADD CONSTRAINT "MockExam_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "EnglishCenter"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAndCenterReview" ADD CONSTRAINT "TestAndCenterReview_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAndCenterReview" ADD CONSTRAINT "TestAndCenterReview_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAndCenterReview" ADD CONSTRAINT "TestAndCenterReview_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "EnglishCenter"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PermissionToUser" ADD CONSTRAINT "_PermissionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `AIRecommendation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnswerSample` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseEnrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseTest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnglishCenter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MockExam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentEvaluations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SystemLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestAndCenterReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PermissionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "test_section" AS ENUM ('listening', 'reading', 'writing', 'speaking');

-- CreateEnum
CREATE TYPE "test_quarter" AS ENUM ('q1', 'q2', 'q3', 'q4');

-- DropForeignKey
ALTER TABLE "AIRecommendation" DROP CONSTRAINT "AIRecommendation_result_id_fkey";

-- DropForeignKey
ALTER TABLE "AnswerSample" DROP CONSTRAINT "AnswerSample_test_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_center_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseEnrollment" DROP CONSTRAINT "CourseEnrollment_course_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseEnrollment" DROP CONSTRAINT "CourseEnrollment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseTest" DROP CONSTRAINT "CourseTest_course_id_fkey";

-- DropForeignKey
ALTER TABLE "CourseTest" DROP CONSTRAINT "CourseTest_test_id_fkey";

-- DropForeignKey
ALTER TABLE "MockExam" DROP CONSTRAINT "MockExam_center_id_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Permission" DROP CONSTRAINT "Permission_role_id_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_center_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentEvaluations" DROP CONSTRAINT "StudentEvaluations_evaluator_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentEvaluations" DROP CONSTRAINT "StudentEvaluations_result_id_fkey";

-- DropForeignKey
ALTER TABLE "SystemLog" DROP CONSTRAINT "SystemLog_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_center_id_fkey";

-- DropForeignKey
ALTER TABLE "TestAndCenterReview" DROP CONSTRAINT "TestAndCenterReview_center_id_fkey";

-- DropForeignKey
ALTER TABLE "TestAndCenterReview" DROP CONSTRAINT "TestAndCenterReview_test_id_fkey";

-- DropForeignKey
ALTER TABLE "TestAndCenterReview" DROP CONSTRAINT "TestAndCenterReview_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TestHistory" DROP CONSTRAINT "TestHistory_test_id_fkey";

-- DropForeignKey
ALTER TABLE "TestHistory" DROP CONSTRAINT "TestHistory_user_id_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_test_id_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_center_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToUser" DROP CONSTRAINT "_PermissionToUser_B_fkey";

-- DropTable
DROP TABLE "AIRecommendation";

-- DropTable
DROP TABLE "AnswerSample";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "CourseEnrollment";

-- DropTable
DROP TABLE "CourseTest";

-- DropTable
DROP TABLE "EnglishCenter";

-- DropTable
DROP TABLE "MockExam";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Permission";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "StudentEvaluations";

-- DropTable
DROP TABLE "SystemLog";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "TestAndCenterReview";

-- DropTable
DROP TABLE "TestHistory";

-- DropTable
DROP TABLE "TestResult";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_PermissionToUser";

-- DropEnum
DROP TYPE "TestQuarter";

-- DropEnum
DROP TYPE "TestSection";

-- CreateTable
CREATE TABLE "role" (
    "role_id" UUID NOT NULL,
    "role_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "english_center" (
    "center_id" UUID NOT NULL,
    "center_name" VARCHAR(100) NOT NULL,
    "address" VARCHAR(255),
    "contact_email" VARCHAR(100),
    "contact_phone" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "english_center_pkey" PRIMARY KEY ("center_id")
);

-- CreateTable
CREATE TABLE "student_evaluations" (
    "evaluation_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "evaluator_id" UUID NOT NULL,
    "evaluation_comments" TEXT,
    "evaluation_score" DECIMAL(3,1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "student_evaluations_pkey" PRIMARY KEY ("evaluation_id")
);

-- CreateTable
CREATE TABLE "notification" (
    "notification_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "notification_type" VARCHAR(100) NOT NULL,
    "content" TEXT,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("notification_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" UUID NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "role_id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "test" (
    "test_id" UUID NOT NULL,
    "test_name" VARCHAR(255) NOT NULL,
    "test_quarter" "test_quarter" NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "center_id" UUID NOT NULL,
    "test_sections" "test_section"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_pkey" PRIMARY KEY ("test_id")
);

-- CreateTable
CREATE TABLE "test_result" (
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

    CONSTRAINT "test_result_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "test_history" (
    "history_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "test_date" TIMESTAMP(3) NOT NULL,
    "test_status" TEXT NOT NULL,
    "total_score" DECIMAL(3,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_history_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "course" (
    "course_id" UUID NOT NULL,
    "course_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "center_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_pkey" PRIMARY KEY ("course_id")
);

-- CreateTable
CREATE TABLE "course_test" (
    "course_test_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_test_pkey" PRIMARY KEY ("course_test_id")
);

-- CreateTable
CREATE TABLE "course_enrollment" (
    "enrollment_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "course_id" UUID NOT NULL,
    "enrollment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "course_enrollment_pkey" PRIMARY KEY ("enrollment_id")
);

-- CreateTable
CREATE TABLE "permission" (
    "permission_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "permission_type" TEXT NOT NULL,
    "resource_type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("permission_id")
);

-- CreateTable
CREATE TABLE "system_log" (
    "log_id" UUID NOT NULL,
    "action" VARCHAR(255) NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "system_log_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "ai_recommendation" (
    "recommendation_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "recommended_changes" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_recommendation_pkey" PRIMARY KEY ("recommendation_id")
);

-- CreateTable
CREATE TABLE "answer_sample" (
    "sample_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "sample_answer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answer_sample_pkey" PRIMARY KEY ("sample_id")
);

-- CreateTable
CREATE TABLE "report" (
    "report_id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "report_type" TEXT NOT NULL,
    "content" TEXT,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_pkey" PRIMARY KEY ("report_id")
);

-- CreateTable
CREATE TABLE "mock_exam" (
    "mock_exam_id" UUID NOT NULL,
    "mock_exam_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "center_id" UUID NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "mock_exam_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mock_exam_pkey" PRIMARY KEY ("mock_exam_id")
);

-- CreateTable
CREATE TABLE "test_and_center_review" (
    "review_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "center_id" UUID NOT NULL,
    "rating" DECIMAL(3,1) NOT NULL,
    "review_comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_and_center_review_pkey" PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "_permissionTouser" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_permissionTouser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_role_name_key" ON "role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "_permissionTouser_B_index" ON "_permissionTouser"("B");

-- AddForeignKey
ALTER TABLE "student_evaluations" ADD CONSTRAINT "student_evaluations_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "test_result"("result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_evaluations" ADD CONSTRAINT "student_evaluations_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "english_center"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test" ADD CONSTRAINT "test_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "english_center"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_result" ADD CONSTRAINT "test_result_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_result" ADD CONSTRAINT "test_result_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_history" ADD CONSTRAINT "test_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_history" ADD CONSTRAINT "test_history_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "english_center"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_test" ADD CONSTRAINT "course_test_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_test" ADD CONSTRAINT "course_test_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_enrollment" ADD CONSTRAINT "course_enrollment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_enrollment" ADD CONSTRAINT "course_enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("course_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission" ADD CONSTRAINT "permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_log" ADD CONSTRAINT "system_log_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_recommendation" ADD CONSTRAINT "ai_recommendation_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "test_result"("result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_sample" ADD CONSTRAINT "answer_sample_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "english_center"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_exam" ADD CONSTRAINT "mock_exam_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "english_center"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_and_center_review" ADD CONSTRAINT "test_and_center_review_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_and_center_review" ADD CONSTRAINT "test_and_center_review_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_and_center_review" ADD CONSTRAINT "test_and_center_review_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "english_center"("center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permissionTouser" ADD CONSTRAINT "_permissionTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "permission"("permission_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_permissionTouser" ADD CONSTRAINT "_permissionTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

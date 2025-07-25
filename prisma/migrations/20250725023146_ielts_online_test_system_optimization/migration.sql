/*
  Warnings:

  - The `status` column on the `test_session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `ielts_band_mapping` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,course_id]` on the table `course_enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role_id,permission_type,resource_type]` on the table `permission` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,test_id]` on the table `test_result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session_id,section]` on the table `test_section_attempt` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[test_id,section]` on the table `test_section_time` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[result_id,question_id]` on the table `user_answer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('not_started', 'in_progress', 'paused', 'submitted', 'completed', 'timeout', 'cancelled');

-- DropForeignKey
ALTER TABLE "ielts_band_mapping" DROP CONSTRAINT "ielts_band_mapping_test_id_fkey";

-- AlterTable
ALTER TABLE "test_result" ADD COLUMN     "listening_completed_at" TIMESTAMP(3),
ADD COLUMN     "reading_completed_at" TIMESTAMP(3),
ADD COLUMN     "speaking_completed_at" TIMESTAMP(3),
ADD COLUMN     "writing_completed_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "test_section_attempt" ADD COLUMN     "auto_submit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'not_started',
ADD COLUMN     "submitted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "test_session" DROP COLUMN "status",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'not_started';

-- DropTable
DROP TABLE "ielts_band_mapping";

-- DropEnum
DROP TYPE "ielts_band_score";

-- DropEnum
DROP TYPE "test_session_status";

-- CreateTable
CREATE TABLE "section_submission" (
    "submission_id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "section" "test_section" NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submission_type" TEXT NOT NULL,
    "answers_count" INTEGER,
    "time_remaining" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "section_submission_pkey" PRIMARY KEY ("submission_id")
);

-- CreateIndex
CREATE INDEX "course_enrollment_user_id_idx" ON "course_enrollment"("user_id");

-- CreateIndex
CREATE INDEX "course_enrollment_course_id_idx" ON "course_enrollment"("course_id");

-- CreateIndex
CREATE UNIQUE INDEX "course_enrollment_user_id_course_id_key" ON "course_enrollment"("user_id", "course_id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_role_id_permission_type_resource_type_key" ON "permission"("role_id", "permission_type", "resource_type");

-- CreateIndex
CREATE INDEX "system_log_user_id_idx" ON "system_log"("user_id");

-- CreateIndex
CREATE INDEX "system_log_created_at_idx" ON "system_log"("created_at");

-- CreateIndex
CREATE INDEX "test_history_user_id_idx" ON "test_history"("user_id");

-- CreateIndex
CREATE INDEX "test_history_test_id_idx" ON "test_history"("test_id");

-- CreateIndex
CREATE INDEX "test_history_test_date_idx" ON "test_history"("test_date");

-- CreateIndex
CREATE INDEX "test_result_user_id_idx" ON "test_result"("user_id");

-- CreateIndex
CREATE INDEX "test_result_test_id_idx" ON "test_result"("test_id");

-- CreateIndex
CREATE INDEX "test_result_created_at_idx" ON "test_result"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "test_result_user_id_test_id_key" ON "test_result"("user_id", "test_id");

-- CreateIndex
CREATE UNIQUE INDEX "test_section_attempt_session_id_section_key" ON "test_section_attempt"("session_id", "section");

-- CreateIndex
CREATE UNIQUE INDEX "test_section_time_test_id_section_key" ON "test_section_time"("test_id", "section");

-- CreateIndex
CREATE INDEX "user_answer_user_id_idx" ON "user_answer"("user_id");

-- CreateIndex
CREATE INDEX "user_answer_question_id_idx" ON "user_answer"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_answer_result_id_question_id_key" ON "user_answer"("result_id", "question_id");

-- AddForeignKey
ALTER TABLE "section_submission" ADD CONSTRAINT "section_submission_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "test_session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

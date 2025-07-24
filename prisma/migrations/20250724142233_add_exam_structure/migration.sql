/*
  Warnings:

  - You are about to alter the column `listening_score` on the `test_result` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `Decimal(2,1)`.
  - You are about to alter the column `reading_score` on the `test_result` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `Decimal(2,1)`.
  - You are about to alter the column `writing_score` on the `test_result` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `Decimal(2,1)`.
  - You are about to alter the column `speaking_score` on the `test_result` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `Decimal(2,1)`.
  - You are about to alter the column `overall_score` on the `test_result` table. The data in that column could be lost. The data in that column will be cast from `Decimal(3,1)` to `Decimal(2,1)`.

*/
-- CreateEnum
CREATE TYPE "test_session_status" AS ENUM ('not_started', 'in_progress', 'paused', 'completed', 'timeout', 'cancelled');

-- CreateEnum
CREATE TYPE "ielts_band_score" AS ENUM ('BAND_0_0', 'BAND_0_5', 'BAND_1_0', 'BAND_1_5', 'BAND_2_0', 'BAND_2_5', 'BAND_3_0', 'BAND_3_5', 'BAND_4_0', 'BAND_4_5', 'BAND_5_0', 'BAND_5_5', 'BAND_6_0', 'BAND_6_5', 'BAND_7_0', 'BAND_7_5', 'BAND_8_0', 'BAND_8_5', 'BAND_9_0');

-- AlterTable
ALTER TABLE "test_result" ADD COLUMN     "completion_time" TIMESTAMP(3),
ADD COLUMN     "is_completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "listening_raw_score" INTEGER,
ADD COLUMN     "reading_raw_score" INTEGER,
ADD COLUMN     "session_id" UUID,
ADD COLUMN     "speaking_raw_score" INTEGER,
ADD COLUMN     "writing_raw_score" INTEGER,
ALTER COLUMN "listening_score" SET DATA TYPE DECIMAL(2,1),
ALTER COLUMN "reading_score" SET DATA TYPE DECIMAL(2,1),
ALTER COLUMN "writing_score" SET DATA TYPE DECIMAL(2,1),
ALTER COLUMN "speaking_score" SET DATA TYPE DECIMAL(2,1),
ALTER COLUMN "overall_score" SET DATA TYPE DECIMAL(2,1);

-- CreateTable
CREATE TABLE "ielts_band_mapping" (
    "mapping_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "section" "test_section" NOT NULL,
    "raw_score_min" INTEGER NOT NULL,
    "raw_score_max" INTEGER NOT NULL,
    "band_score" DECIMAL(2,1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ielts_band_mapping_pkey" PRIMARY KEY ("mapping_id")
);

-- CreateTable
CREATE TABLE "test_session" (
    "session_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "status" "test_session_status" NOT NULL DEFAULT 'not_started',
    "current_section" "test_section",
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "pause_count" INTEGER NOT NULL DEFAULT 0,
    "total_pause_time" INTEGER NOT NULL DEFAULT 0,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "test_section_attempt" (
    "attempt_id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "section" "test_section" NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "time_spent" INTEGER,
    "is_completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_section_attempt_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateTable
CREATE TABLE "writing_assessment" (
    "assessment_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "task_number" INTEGER NOT NULL,
    "task_achievement" DECIMAL(2,1) NOT NULL,
    "coherence_cohesion" DECIMAL(2,1) NOT NULL,
    "lexical_resource" DECIMAL(2,1) NOT NULL,
    "grammar_accuracy" DECIMAL(2,1) NOT NULL,
    "overall_task_score" DECIMAL(2,1) NOT NULL,
    "word_count" INTEGER,
    "time_spent" INTEGER,
    "examiner_comments" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "writing_assessment_pkey" PRIMARY KEY ("assessment_id")
);

-- CreateTable
CREATE TABLE "speaking_assessment" (
    "assessment_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "fluency_coherence" DECIMAL(2,1) NOT NULL,
    "lexical_resource" DECIMAL(2,1) NOT NULL,
    "grammar_accuracy" DECIMAL(2,1) NOT NULL,
    "pronunciation" DECIMAL(2,1) NOT NULL,
    "overall_speaking_score" DECIMAL(2,1) NOT NULL,
    "total_duration" INTEGER,
    "examiner_comments" TEXT,
    "audio_recording_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_assessment_pkey" PRIMARY KEY ("assessment_id")
);

-- CreateTable
CREATE TABLE "speaking_part_attempt" (
    "attempt_id" UUID NOT NULL,
    "assessment_id" UUID NOT NULL,
    "part_number" INTEGER NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "duration" INTEGER,
    "audio_url" TEXT,
    "transcript" TEXT,
    "part_score" DECIMAL(2,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speaking_part_attempt_pkey" PRIMARY KEY ("attempt_id")
);

-- CreateTable
CREATE TABLE "test_question" (
    "question_id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "section" "test_section" NOT NULL,
    "part_number" INTEGER,
    "question_number" INTEGER NOT NULL,
    "parent_question_id" UUID,
    "content_html" TEXT NOT NULL,
    "instruction" TEXT,
    "question_type" TEXT,
    "audio_url" TEXT,
    "image_url" TEXT,
    "marks" DECIMAL(3,1),
    "difficulty_level" TEXT,
    "word_limit_min" INTEGER,
    "word_limit_max" INTEGER,
    "time_limit" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "test_question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "question_option" (
    "option_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "content_html" TEXT NOT NULL,
    "content_text" TEXT,
    "is_correct" BOOLEAN NOT NULL,
    "option_index" INTEGER,
    "option_label" TEXT,
    "is_mixable" BOOLEAN,
    "explanation" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "question_option_pkey" PRIMARY KEY ("option_id")
);

-- CreateTable
CREATE TABLE "test_section_time" (
    "id" UUID NOT NULL,
    "test_id" UUID NOT NULL,
    "section" "test_section" NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "test_section_time_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_answer" (
    "answer_id" UUID NOT NULL,
    "result_id" UUID NOT NULL,
    "question_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "option_id" UUID,
    "answer_content" TEXT,
    "answer_text" TEXT,
    "score" DECIMAL(3,1),
    "is_correct" BOOLEAN,
    "time_spent" INTEGER,
    "answered_at" TIMESTAMP(3),
    "attempt_count" INTEGER NOT NULL DEFAULT 1,
    "is_flagged" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_answer_pkey" PRIMARY KEY ("answer_id")
);

-- AddForeignKey
ALTER TABLE "ielts_band_mapping" ADD CONSTRAINT "ielts_band_mapping_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_session" ADD CONSTRAINT "test_session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_session" ADD CONSTRAINT "test_session_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_section_attempt" ADD CONSTRAINT "test_section_attempt_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "test_session"("session_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "writing_assessment" ADD CONSTRAINT "writing_assessment_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "test_result"("result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speaking_assessment" ADD CONSTRAINT "speaking_assessment_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "test_result"("result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "speaking_part_attempt" ADD CONSTRAINT "speaking_part_attempt_assessment_id_fkey" FOREIGN KEY ("assessment_id") REFERENCES "speaking_assessment"("assessment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_question" ADD CONSTRAINT "test_question_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_question" ADD CONSTRAINT "test_question_parent_question_id_fkey" FOREIGN KEY ("parent_question_id") REFERENCES "test_question"("question_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "question_option" ADD CONSTRAINT "question_option_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "test_question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_section_time" ADD CONSTRAINT "test_section_time_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "test"("test_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_result_id_fkey" FOREIGN KEY ("result_id") REFERENCES "test_result"("result_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "test_question"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "question_option"("option_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answer" ADD CONSTRAINT "user_answer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

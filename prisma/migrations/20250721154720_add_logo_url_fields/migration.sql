/*
  Warnings:

  - You are about to drop the column `avatarURL` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "course" ADD COLUMN     "logo_url" TEXT;

-- AlterTable
ALTER TABLE "english_center" ADD COLUMN     "logo_url" TEXT;

-- AlterTable
ALTER TABLE "mock_exam" ADD COLUMN     "logo_url" TEXT;

-- AlterTable
ALTER TABLE "test" ADD COLUMN     "logo_url" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatarURL",
ADD COLUMN     "avatar_url" TEXT;

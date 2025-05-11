-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_center_id_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "center_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_center_id_fkey" FOREIGN KEY ("center_id") REFERENCES "english_center"("center_id") ON DELETE SET NULL ON UPDATE CASCADE;

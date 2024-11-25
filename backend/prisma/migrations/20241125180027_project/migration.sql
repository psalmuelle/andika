/*
  Warnings:

  - The `feedback` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "overallProgress" SET DEFAULT 0,
DROP COLUMN "feedback",
ADD COLUMN     "feedback" TEXT[];

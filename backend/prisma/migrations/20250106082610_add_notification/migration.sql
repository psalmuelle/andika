/*
  Warnings:

  - You are about to drop the column `description` on the `ProjectTask` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ProjectTask` table. All the data in the column will be lost.
  - Added the required column `task` to the `ProjectTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectTask" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "task" TEXT NOT NULL;

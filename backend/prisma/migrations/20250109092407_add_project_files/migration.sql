/*
  Warnings:

  - You are about to drop the column `files` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "files";

-- CreateTable
CREATE TABLE "ProjectFiles" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "hostname" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ProjectFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectFiles" ADD CONSTRAINT "ProjectFiles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

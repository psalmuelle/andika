/*
  Warnings:

  - You are about to drop the column `feedback` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "feedback";

-- CreateTable
CREATE TABLE "ProjectFeedback" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "feedback" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectFeedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectFeedback_projectId_key" ON "ProjectFeedback"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectFeedback" ADD CONSTRAINT "ProjectFeedback_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

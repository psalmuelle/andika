/*
  Warnings:

  - You are about to drop the column `articleId` on the `PaymentDetail` table. All the data in the column will be lost.
  - You are about to drop the column `articleId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the `Article` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticleApproval` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticleDraft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticleRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArticleReview` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reward` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TitleProposal` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `invoiceId` to the `PaymentDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `PaymentDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `improvements` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('SHORT_TERM', 'STARTUP', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('OPEN', 'CLOSED');

-- CreateEnum
CREATE TYPE "DeliverableType" AS ENUM ('ARTICLE', 'API_DOCUMENTATION', 'TECHNICAL_DOCUMENTATION', 'WHITEPAPER');

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_articleRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleApproval" DROP CONSTRAINT "ArticleApproval_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleApproval" DROP CONSTRAINT "ArticleApproval_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleDraft" DROP CONSTRAINT "ArticleDraft_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleDraft" DROP CONSTRAINT "ArticleDraft_createdById_fkey";

-- DropForeignKey
ALTER TABLE "ArticleRequest" DROP CONSTRAINT "ArticleRequest_userId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleReview" DROP CONSTRAINT "ArticleReview_articleId_fkey";

-- DropForeignKey
ALTER TABLE "ArticleReview" DROP CONSTRAINT "ArticleReview_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentDetail" DROP CONSTRAINT "PaymentDetail_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_articleId_fkey";

-- DropForeignKey
ALTER TABLE "Reward" DROP CONSTRAINT "Reward_userId_fkey";

-- DropForeignKey
ALTER TABLE "TitleProposal" DROP CONSTRAINT "TitleProposal_articleRequestId_fkey";

-- DropForeignKey
ALTER TABLE "TitleProposal" DROP CONSTRAINT "TitleProposal_proposerId_fkey";

-- DropIndex
DROP INDEX "PaymentDetail_articleId_key";

-- DropIndex
DROP INDEX "Rating_articleId_key";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "adminId" INTEGER,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PaymentDetail" DROP COLUMN "articleId",
ADD COLUMN     "invoiceId" INTEGER NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "articleId",
ADD COLUMN     "improvements" TEXT NOT NULL;

-- DropTable
DROP TABLE "Article";

-- DropTable
DROP TABLE "ArticleApproval";

-- DropTable
DROP TABLE "ArticleDraft";

-- DropTable
DROP TABLE "ArticleRequest";

-- DropTable
DROP TABLE "ArticleReview";

-- DropTable
DROP TABLE "Reward";

-- DropTable
DROP TABLE "TitleProposal";

-- DropEnum
DROP TYPE "ArticleStatus";

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" "ProjectType" NOT NULL,
    "industry" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliverable" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "type" "DeliverableType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "eta" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Deliverable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentTimeline" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTimeline_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliverable" ADD CONSTRAINT "Deliverable_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTimeline" ADD CONSTRAINT "PaymentTimeline_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentDetail" ADD CONSTRAINT "PaymentDetail_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "PaymentTimeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

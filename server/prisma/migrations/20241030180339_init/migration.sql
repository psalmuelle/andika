/*
  Warnings:

  - You are about to drop the `EmailVerification` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verificationCode" TEXT,
ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "EmailVerification";
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('NEW', 'STARTED');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('TECHNICAL_ARTICLE', 'WHITEPAPER', 'API_DOC', 'EDITING');

-- CreateTable
CREATE TABLE "ProjectRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "requestType" "RequestType" NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnicalArticleRequest" (
    "id" SERIAL NOT NULL,
    "numberOfArticles" INTEGER NOT NULL,
    "audience" TEXT NOT NULL,
    "primaryGoal" TEXT NOT NULL,
    "contentStructure" TEXT[],
    "idealLength" TEXT NOT NULL,
    "usefulLinks" TEXT NOT NULL,
    "proposedTopics" TEXT NOT NULL,
    "projectRequestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TechnicalArticleRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhitepaperRequest" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "niche" TEXT NOT NULL,
    "projectRequestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WhitepaperRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiDocRequest" (
    "id" SERIAL NOT NULL,
    "startupName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "docType" TEXT NOT NULL,
    "usefulLinks" TEXT NOT NULL,
    "projectRequestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiDocRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EditingRequest" (
    "id" SERIAL NOT NULL,
    "drafts" TEXT[],
    "usefulLinks" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "projectRequestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EditingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TechnicalArticleRequest_projectRequestId_key" ON "TechnicalArticleRequest"("projectRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "WhitepaperRequest_projectRequestId_key" ON "WhitepaperRequest"("projectRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiDocRequest_projectRequestId_key" ON "ApiDocRequest"("projectRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "EditingRequest_projectRequestId_key" ON "EditingRequest"("projectRequestId");

-- AddForeignKey
ALTER TABLE "ProjectRequest" ADD CONSTRAINT "ProjectRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnicalArticleRequest" ADD CONSTRAINT "TechnicalArticleRequest_projectRequestId_fkey" FOREIGN KEY ("projectRequestId") REFERENCES "ProjectRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhitepaperRequest" ADD CONSTRAINT "WhitepaperRequest_projectRequestId_fkey" FOREIGN KEY ("projectRequestId") REFERENCES "ProjectRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiDocRequest" ADD CONSTRAINT "ApiDocRequest_projectRequestId_fkey" FOREIGN KEY ("projectRequestId") REFERENCES "ProjectRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EditingRequest" ADD CONSTRAINT "EditingRequest_projectRequestId_fkey" FOREIGN KEY ("projectRequestId") REFERENCES "ProjectRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

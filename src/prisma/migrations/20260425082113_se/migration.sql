-- CreateEnum
CREATE TYPE "QuinielaRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "QuinielaUserStatus" AS ENUM ('ACTIVE', 'REMOVED');

-- CreateEnum
CREATE TYPE "RuleType" AS ENUM ('EXACT_SCORE', 'WINNER', 'RED_CARD');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "hadRedCard" BOOLEAN;

-- CreateTable
CREATE TABLE "Quiniela" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "leagueId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quiniela_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuinielaUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "quinielaId" INTEGER NOT NULL,
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "role" "QuinielaRole" NOT NULL DEFAULT 'USER',
    "status" "QuinielaUserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuinielaUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,
    "quinielaUserId" INTEGER NOT NULL,
    "matchId" INTEGER NOT NULL,
    "predictedHome" INTEGER NOT NULL,
    "predictedAway" INTEGER NOT NULL,
    "predictedRedCard" BOOLEAN,
    "pointsEarned" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointsLog" (
    "id" SERIAL NOT NULL,
    "quinielaUserId" INTEGER NOT NULL,
    "matchId" INTEGER,
    "points" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PointsLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuinielaRule" (
    "id" SERIAL NOT NULL,
    "quinielaId" INTEGER NOT NULL,
    "type" "RuleType" NOT NULL,
    "points" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuinielaRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Quiniela_inviteCode_key" ON "Quiniela"("inviteCode");

-- CreateIndex
CREATE UNIQUE INDEX "QuinielaUser_userId_quinielaId_key" ON "QuinielaUser"("userId", "quinielaId");

-- CreateIndex
CREATE UNIQUE INDEX "Prediction_quinielaUserId_matchId_key" ON "Prediction"("quinielaUserId", "matchId");

-- AddForeignKey
ALTER TABLE "Quiniela" ADD CONSTRAINT "Quiniela_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuinielaUser" ADD CONSTRAINT "QuinielaUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuinielaUser" ADD CONSTRAINT "QuinielaUser_quinielaId_fkey" FOREIGN KEY ("quinielaId") REFERENCES "Quiniela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_quinielaUserId_fkey" FOREIGN KEY ("quinielaUserId") REFERENCES "QuinielaUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsLog" ADD CONSTRAINT "PointsLog_quinielaUserId_fkey" FOREIGN KEY ("quinielaUserId") REFERENCES "QuinielaUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointsLog" ADD CONSTRAINT "PointsLog_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuinielaRule" ADD CONSTRAINT "QuinielaRule_quinielaId_fkey" FOREIGN KEY ("quinielaId") REFERENCES "Quiniela"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

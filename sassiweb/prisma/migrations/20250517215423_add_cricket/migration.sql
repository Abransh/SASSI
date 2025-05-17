-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('UPCOMING', 'LIVE', 'COMPLETED', 'ABANDONED');

-- CreateEnum
CREATE TYPE "PlayerRole" AS ENUM ('BATSMAN', 'BOWLER', 'ALL_ROUNDER', 'WICKET_KEEPER');

-- CreateEnum
CREATE TYPE "DismissalType" AS ENUM ('BOWLED', 'CAUGHT', 'LBW', 'RUN_OUT', 'STUMPED', 'HIT_WICKET', 'RETIRED_HURT', 'OBSTRUCTING_FIELD', 'TIMED_OUT', 'HANDLED_BALL');

-- CreateEnum
CREATE TYPE "ExtrasType" AS ENUM ('WIDE', 'NO_BALL', 'BYE', 'LEG_BYE');

-- CreateTable
CREATE TABLE "CricketMatch" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "venue" TEXT NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'UPCOMING',
    "teamAId" TEXT NOT NULL,
    "teamBId" TEXT NOT NULL,
    "winnerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "CricketMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CricketTeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CricketTeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CricketPlayer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "PlayerRole" NOT NULL,
    "teamId" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CricketPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CricketInnings" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "inningsNumber" INTEGER NOT NULL,
    "battingTeamId" TEXT NOT NULL,
    "bowlingTeamId" TEXT NOT NULL,
    "totalRuns" INTEGER NOT NULL DEFAULT 0,
    "wickets" INTEGER NOT NULL DEFAULT 0,
    "overs" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "extras" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CricketInnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CricketBatting" (
    "id" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "runs" INTEGER NOT NULL DEFAULT 0,
    "ballsFaced" INTEGER NOT NULL DEFAULT 0,
    "fours" INTEGER NOT NULL DEFAULT 0,
    "sixes" INTEGER NOT NULL DEFAULT 0,
    "isOut" BOOLEAN NOT NULL DEFAULT false,
    "dismissalType" "DismissalType",
    "dismissalInfo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CricketBatting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CricketBowling" (
    "id" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "overs" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "maidens" INTEGER NOT NULL DEFAULT 0,
    "runs" INTEGER NOT NULL DEFAULT 0,
    "wickets" INTEGER NOT NULL DEFAULT 0,
    "noBalls" INTEGER NOT NULL DEFAULT 0,
    "wides" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CricketBowling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CricketBallEvent" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "inningsId" TEXT NOT NULL,
    "over" INTEGER NOT NULL,
    "ballInOver" INTEGER NOT NULL,
    "batsmanOnStrikeId" TEXT NOT NULL,
    "nonStrikerId" TEXT NOT NULL,
    "bowlerId" TEXT NOT NULL,
    "runs" INTEGER NOT NULL DEFAULT 0,
    "extras" INTEGER NOT NULL DEFAULT 0,
    "extrasType" "ExtrasType",
    "isWicket" BOOLEAN NOT NULL DEFAULT false,
    "wicketType" "DismissalType",
    "comment" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CricketBallEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CricketMatch" ADD CONSTRAINT "CricketMatch_teamAId_fkey" FOREIGN KEY ("teamAId") REFERENCES "CricketTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketMatch" ADD CONSTRAINT "CricketMatch_teamBId_fkey" FOREIGN KEY ("teamBId") REFERENCES "CricketTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketMatch" ADD CONSTRAINT "CricketMatch_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "CricketTeam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketMatch" ADD CONSTRAINT "CricketMatch_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketPlayer" ADD CONSTRAINT "CricketPlayer_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "CricketTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketInnings" ADD CONSTRAINT "CricketInnings_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "CricketMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketInnings" ADD CONSTRAINT "CricketInnings_battingTeamId_fkey" FOREIGN KEY ("battingTeamId") REFERENCES "CricketTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketInnings" ADD CONSTRAINT "CricketInnings_bowlingTeamId_fkey" FOREIGN KEY ("bowlingTeamId") REFERENCES "CricketTeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBatting" ADD CONSTRAINT "CricketBatting_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "CricketInnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBatting" ADD CONSTRAINT "CricketBatting_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "CricketPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBowling" ADD CONSTRAINT "CricketBowling_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "CricketInnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBowling" ADD CONSTRAINT "CricketBowling_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "CricketPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBallEvent" ADD CONSTRAINT "CricketBallEvent_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "CricketMatch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBallEvent" ADD CONSTRAINT "CricketBallEvent_inningsId_fkey" FOREIGN KEY ("inningsId") REFERENCES "CricketInnings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBallEvent" ADD CONSTRAINT "CricketBallEvent_batsmanOnStrikeId_fkey" FOREIGN KEY ("batsmanOnStrikeId") REFERENCES "CricketPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBallEvent" ADD CONSTRAINT "CricketBallEvent_nonStrikerId_fkey" FOREIGN KEY ("nonStrikerId") REFERENCES "CricketPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CricketBallEvent" ADD CONSTRAINT "CricketBallEvent_bowlerId_fkey" FOREIGN KEY ("bowlerId") REFERENCES "CricketPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

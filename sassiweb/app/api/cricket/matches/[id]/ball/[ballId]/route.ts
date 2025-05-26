// app/api/cricket/matches/[id]/ball/[ballId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ExtrasType } from "@/lib/cricket/types";

// Helper function to recalculate all stats for an innings from ball events
async function recalculateInningsStats(inningsId: string, tx: any) {
  // Get all ball events for this innings
  const ballEvents = await tx.cricketBallEvent.findMany({
    where: { inningsId },
    orderBy: [{ over: 'asc' }, { ballInOver: 'asc' }],
  });

  // Reset innings stats
  await tx.cricketInnings.update({
    where: { id: inningsId },
    data: {
      totalRuns: 0,
      wickets: 0,
      overs: 0,
      extras: 0,
    },
  });

  // Delete all existing batting and bowling records for this innings
  await tx.cricketBatting.deleteMany({ where: { inningsId } });
  await tx.cricketBowling.deleteMany({ where: { inningsId } });

  // Recalculate from ball events
  const battingStats = new Map();
  const bowlingStats = new Map();
  let totalRuns = 0;
  let totalExtras = 0;
  let totalWickets = 0;
  let legalBalls = 0;

  for (const ball of ballEvents) {
    const isLegalDelivery = !ball.extrasType || 
      (ball.extrasType !== ExtrasType.WIDE && ball.extrasType !== ExtrasType.NO_BALL);

    // Update totals
    totalRuns += ball.runs + ball.extras;
    totalExtras += ball.extras;
    if (ball.isWicket) totalWickets++;
    if (isLegalDelivery) legalBalls++;

    // Update batting stats
    const battingKey = ball.batsmanOnStrikeId;
    if (!battingStats.has(battingKey)) {
      battingStats.set(battingKey, {
        playerId: battingKey,
        runs: 0,
        ballsFaced: 0,
        fours: 0,
        sixes: 0,
        isOut: false,
        dismissalType: null,
      });
    }
    
    const batting = battingStats.get(battingKey);
    batting.runs += ball.runs;
    if (isLegalDelivery) batting.ballsFaced++;
    if (ball.runs === 4) batting.fours++;
    if (ball.runs === 6) batting.sixes++;
    if (ball.isWicket) {
      batting.isOut = true;
      batting.dismissalType = ball.wicketType;
    }

    // Update bowling stats
    const bowlingKey = ball.bowlerId;
    if (!bowlingStats.has(bowlingKey)) {
      bowlingStats.set(bowlingKey, {
        playerId: bowlingKey,
        overs: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        noBalls: 0,
        wides: 0,
      });
    }
    
    const bowling = bowlingStats.get(bowlingKey);
    if (isLegalDelivery) {
      const currentBalls = Math.floor(bowling.overs * 10) % 10;
      if (currentBalls === 5) {
        bowling.overs = Math.floor(bowling.overs) + 1;
      } else {
        bowling.overs += 0.1;
      }
    }
    bowling.runs += ball.runs + ball.extras;
    if (ball.isWicket) bowling.wickets++;
    if (ball.extrasType === ExtrasType.NO_BALL) bowling.noBalls++;
    if (ball.extrasType === ExtrasType.WIDE) bowling.wides++;
  }

  // Calculate overs from legal balls
  const wholeOvers = Math.floor(legalBalls / 6);
  const remainingBalls = legalBalls % 6;
  const totalOvers = wholeOvers + (remainingBalls / 10);

  // Update innings with recalculated stats
  await tx.cricketInnings.update({
    where: { id: inningsId },
    data: {
      totalRuns,
      wickets: totalWickets,
      overs: totalOvers,
      extras: totalExtras,
    },
  });

  // Create batting records
  for (const [playerId, stats] of battingStats) {
    await tx.cricketBatting.create({
      data: {
        inningsId,
        ...stats,
      },
    });
  }

  // Create bowling records  
  for (const [playerId, stats] of bowlingStats) {
    await tx.cricketBowling.create({
      data: {
        inningsId,
        ...stats,
      },
    });
  }
}

// PATCH - Edit a ball event
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string; ballId: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const matchId = params.id;
    const ballId = params.ballId;
    const data = await req.json();

    return await prisma.$transaction(async (tx) => {
      // Get the existing ball event
      const existingBall = await tx.cricketBallEvent.findUnique({
        where: { id: ballId },
      });

      if (!existingBall) {
        throw new Error("Ball event not found");
      }

      // Update the ball event
      const updatedBall = await tx.cricketBallEvent.update({
        where: { id: ballId },
        data: {
          batsmanOnStrikeId: data.batsmanOnStrikeId || existingBall.batsmanOnStrikeId,
          nonStrikerId: data.nonStrikerId || existingBall.nonStrikerId,
          bowlerId: data.bowlerId || existingBall.bowlerId,
          runs: data.runs !== undefined ? data.runs : existingBall.runs,
          extras: data.extras !== undefined ? data.extras : existingBall.extras,
          extrasType: data.extrasType !== undefined ? data.extrasType : existingBall.extrasType,
          isWicket: data.isWicket !== undefined ? data.isWicket : existingBall.isWicket,
          wicketType: data.wicketType !== undefined ? data.wicketType : existingBall.wicketType,
          comment: data.comment !== undefined ? data.comment : existingBall.comment,
        },
      });

      // Recalculate all stats for the innings
      await recalculateInningsStats(existingBall.inningsId, tx);

      return NextResponse.json({ 
        success: true, 
        ballEvent: updatedBall 
      });
    });
  } catch (error) {
    console.error("Error editing ball event:", error);
    return NextResponse.json(
      { error: "Failed to edit ball event" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a ball event
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string; ballId: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const params = await context.params;
    const ballId = params.ballId;

    return await prisma.$transaction(async (tx) => {
      // Get the ball event before deletion
      const ballEvent = await tx.cricketBallEvent.findUnique({
        where: { id: ballId },
      });

      if (!ballEvent) {
        throw new Error("Ball event not found");
      }

      // Delete the ball event
      await tx.cricketBallEvent.delete({
        where: { id: ballId },
      });

      // Recalculate all stats for the innings
      await recalculateInningsStats(ballEvent.inningsId, tx);

      return NextResponse.json({ 
        success: true,
        message: "Ball event deleted successfully"
      });
    });
  } catch (error) {
    console.error("Error deleting ball event:", error);
    return NextResponse.json(
      { error: "Failed to delete ball event" },
      { status: 500 }
    );
  }
}

// GET - Get a specific ball event
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string; ballId: string }> }
) {
  try {
    const params = await context.params;
    const ballId = params.ballId;

    const ballEvent = await prisma.cricketBallEvent.findUnique({
      where: { id: ballId },
      include: {
        batsmanOnStrike: true,
        nonStriker: true,
        bowler: true,
      },
    });

    if (!ballEvent) {
      return NextResponse.json(
        { error: "Ball event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(ballEvent);
  } catch (error) {
    console.error("Error fetching ball event:", error);
    return NextResponse.json(
      { error: "Failed to fetch ball event" },
      { status: 500 }
    );
  }
}
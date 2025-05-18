// app/api/cricket/matches/[id]/ball/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { calculateOvers, updateScorecardAfterBall } from "@/lib/cricket/calculations";
import { ExtrasType } from "@/lib/cricket/types";

export async function POST(req: NextRequest,
     context: { params: Promise<{ id: string }> })
      {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const params = await context.params;
    const matchId = params.id;
    const data = await req.json();
    
    // Basic validation
    if (!data.inningsId || !data.batsmanOnStrikeId || !data.nonStrikerId || !data.bowlerId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Start transaction to ensure all updates happen atomically
    return await prisma.$transaction(async (tx) => {
      // 1. Create the ball event
      const ballEvent = await tx.cricketBallEvent.create({
        data: {
          matchId,
          inningsId: data.inningsId,
          over: data.over,
          ballInOver: data.ballInOver,
          batsmanOnStrikeId: data.batsmanOnStrikeId,
          nonStrikerId: data.nonStrikerId,
          bowlerId: data.bowlerId,
          runs: data.runs || 0,
          extras: data.extras || 0,
          extrasType: data.extrasType,
          isWicket: data.isWicket || false,
          wicketType: data.wicketType,
          comment: data.comment,
        },
        include: {
          batsmanOnStrike: true,
          nonStriker: true,
          bowler: true,
        }
      });
      
      // 2. Get the current innings
      const innings = await tx.cricketInnings.findUnique({
        where: { id: data.inningsId },
        include: {
          batting: true,
          bowling: true,
        },
      });
      
      if (!innings) {
        throw new Error("Innings not found");
      }
      
      // 3. Update batting stats
      let battingEntry = innings.batting.find(b => b.playerId === data.batsmanOnStrikeId);
      
      if (!battingEntry) {
        // Create new batting entry if doesn't exist
        battingEntry = await tx.cricketBatting.create({
          data: {
            inningsId: data.inningsId,
            playerId: data.batsmanOnStrikeId,
          },
        });
      }
      
      // Update batting stats (only if not extras like wide/no-ball)
      const isLegalDelivery = !data.extrasType || 
        (data.extrasType !== ExtrasType.WIDE && data.extrasType !== ExtrasType.NO_BALL);
      
      if (isLegalDelivery) {
        await tx.cricketBatting.update({
          where: { id: battingEntry.id },
          data: {
            runs: { increment: data.runs || 0 },
            ballsFaced: { increment: 1 },
            fours: data.runs === 4 ? { increment: 1 } : undefined,
            sixes: data.runs === 6 ? { increment: 1 } : undefined,
            isOut: data.isWicket ? true : undefined,
            dismissalType: data.isWicket ? data.wicketType : undefined,
          },
        });
      } else if (data.runs > 0) {
        // For extras with runs (e.g., byes credited to batsman)
        await tx.cricketBatting.update({
          where: { id: battingEntry.id },
          data: {
            runs: { increment: data.runs || 0 },
            fours: data.runs === 4 ? { increment: 1 } : undefined,
            sixes: data.runs === 6 ? { increment: 1 } : undefined,
          },
        });
      }
      
      // 4. Update bowling stats
      let bowlingEntry = innings.bowling.find(b => b.playerId === data.bowlerId);
      
      if (!bowlingEntry) {
        // Create new bowling entry if doesn't exist
        bowlingEntry = await tx.cricketBowling.create({
          data: {
            inningsId: data.inningsId,
            playerId: data.bowlerId,
          },
        });
      }
      
      // Update bowling stats
      await tx.cricketBowling.update({
        where: { id: bowlingEntry.id },
        data: {
          overs: isLegalDelivery 
            ? calculateOvers(bowlingEntry.overs, 1) 
            : bowlingEntry.overs,
          runs: { increment: (data.runs || 0) + (data.extras || 0) },
          wickets: data.isWicket ? { increment: 1 } : undefined,
          noBalls: data.extrasType === ExtrasType.NO_BALL ? { increment: 1 } : undefined,
          wides: data.extrasType === ExtrasType.WIDE ? { increment: 1 } : undefined,
        },
      });
      
      // 5. Update innings summary
      await tx.cricketInnings.update({
        where: { id: data.inningsId },
        data: {
          totalRuns: { increment: (data.runs || 0) + (data.extras || 0) },
          wickets: data.isWicket ? { increment: 1 } : undefined,
          overs: isLegalDelivery 
            ? calculateOvers(innings.overs, 1) 
            : innings.overs,
          extras: data.extras ? { increment: data.extras } : undefined,
        },
      });
      
      // 6. Update match status to LIVE if it's not already
      await tx.cricketMatch.update({
        where: { id: matchId },
        data: {
          status: "LIVE",
        },
      });
      
      return NextResponse.json({
        success: true,
        ballEvent,
      });
    });
  } catch (error) {
    console.error("Error adding ball event:", error);
    return NextResponse.json(
      { error: "Failed to add ball event" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest,
     context: { params: Promise<{ id: string }> }) {
  try {
    
    const params = await context.params;
    const matchId = params.id;
    
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const inningsId = searchParams.get("inningsId");
    const limit = parseInt(searchParams.get("limit") || "30");
    
    // Build query criteria
    const where: any = { matchId };
    if (inningsId) {
      where.inningsId = inningsId;
    }
    
    // Fetch ball events
    const ballEvents = await prisma.cricketBallEvent.findMany({
      where,
      orderBy: {
        timestamp: "desc",
      },
      take: limit,
      include: {
        batsmanOnStrike: true,
        nonStriker: true,
        bowler: true,
      },
    });
    
    return NextResponse.json(ballEvents);
  } catch (error) {
    console.error("Error fetching ball events:", error);
    return NextResponse.json(
      { error: "Failed to fetch ball events" },
      { status: 500 }
    );
  }
}
// app/api/cricket/matches/[id]/innings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest, 
    context: { params: Promise<{ id: string }> }) 
     {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const params = await context.params;
    const matchId = params.id;
    const data = await req.json();
    
    // Validate required fields
    if (!data.battingTeamId || !data.bowlingTeamId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Validate that the teams are part of the match
    const match = await prisma.cricketMatch.findUnique({
      where: { id: matchId },
      include: {
        innings: true,
      },
    });
    
    if (!match) {
      return NextResponse.json(
        { error: "Match not found" },
        { status: 404 }
      );
    }
    
    // Check if either team is part of the match
    if (match.teamAId !== data.battingTeamId && match.teamBId !== data.battingTeamId) {
      return NextResponse.json(
        { error: "Batting team is not part of this match" },
        { status: 400 }
      );
    }
    
    if (match.teamAId !== data.bowlingTeamId && match.teamBId !== data.bowlingTeamId) {
      return NextResponse.json(
        { error: "Bowling team is not part of this match" },
        { status: 400 }
      );
    }
    
    // Calculate innings number
    const inningsNumber = match.innings.length + 1;
    
    // Create new innings
    const innings = await prisma.cricketInnings.create({
      data: {
        matchId,
        inningsNumber,
        battingTeamId: data.battingTeamId,
        bowlingTeamId: data.bowlingTeamId,
      },
      include: {
        battingTeam: {
          include: {
            players: true,
          },
        },
        bowlingTeam: {
          include: {
            players: true,
          },
        },
      },
    });
    
    // Update match status to LIVE
    await prisma.cricketMatch.update({
      where: { id: matchId },
      data: { status: "LIVE" },
    });
    
    return NextResponse.json(innings, { status: 201 });
  } catch (error) {
    console.error("Error creating innings:", error);
    return NextResponse.json(
      { error: "Failed to create innings" },
      { status: 500 }
    );
  }
}
export async function GET(
    req: NextRequest, 
    context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const matchId = params.id;
    
   
    const innings = await prisma.cricketInnings.findMany({
      where: { matchId },
      include: {
        battingTeam: {
          include: {
            players: true,
          },
        },
        bowlingTeam: {
          include: {
            players: true,
          },
        },
        batting: {
          include: {
            player: true,
          },
        },
        bowling: {
          include: {
            player: true,
          },
        },
      },
      orderBy: { inningsNumber: "asc" },
    });
    
    return NextResponse.json(innings);
  } catch (error) {
    console.error("Error fetching innings:", error);
    return NextResponse.json(
      { error: "Failed to fetch innings" },
      { status: 500 }
    );
  }
}
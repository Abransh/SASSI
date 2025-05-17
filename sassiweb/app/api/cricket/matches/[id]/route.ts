// app/api/cricket/matches/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  try {
    const matchId = context.params.id;
    
    const match = await prisma.cricketMatch.findUnique({
      where: { id: matchId },
      include: {
        teamA: {
          include: {
            players: true,
          },
        },
        teamB: {
          include: {
            players: true,
          },
        },
        winner: true,
        innings: {
          include: {
            battingTeam: true,
            bowlingTeam: true,
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
        },
      },
    });
    
    if (!match) {
      return NextResponse.json(
        { error: "Match not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(match);
  } catch (error) {
    console.error("Error fetching match:", error);
    return NextResponse.json(
      { error: "Failed to fetch match" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  try {
    // Check authentication (admin only)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const matchId = context.params.id;
    const data = await req.json();
    
    // Update the match
    const match = await prisma.cricketMatch.update({
      where: { id: matchId },
      data: {
        title: data.title,
        description: data.description,
        venue: data.venue,
        matchDate: data.matchDate ? new Date(data.matchDate) : undefined,
        status: data.status,
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        winnerId: data.winnerId,
      },
    });
    
    return NextResponse.json(match);
  } catch (error) {
    console.error("Error updating match:", error);
    return NextResponse.json(
      { error: "Failed to update match" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    // Check authentication (admin only)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const matchId = context.params.id;
    
    // First delete related records (innings and ball events)
    await prisma.$transaction([
      prisma.cricketBallEvent.deleteMany({
        where: { matchId },
      }),
      prisma.cricketBatting.deleteMany({
        where: {
          innings: {
            matchId,
          },
        },
      }),
      prisma.cricketBowling.deleteMany({
        where: {
          innings: {
            matchId,
          },
        },
      }),
      prisma.cricketInnings.deleteMany({
        where: { matchId },
      }),
      prisma.cricketMatch.delete({
        where: { id: matchId },
      }),
    ]);
    
    return NextResponse.json(
      { message: "Match deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting match:", error);
    return NextResponse.json(
      { error: "Failed to delete match" },
      { status: 500 }
    );
  }
}
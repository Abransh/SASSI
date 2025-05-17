// app/api/cricket/matches/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export async function GET(req: NextRequest) {
  try {
    // Get matches grouped by status
    const [liveMatches, upcomingMatches, recentMatches] = await Promise.all([
      // Live matches
      prisma.cricketMatch.findMany({
        where: { status: "LIVE" },
        include: {
          teamA: true,
          teamB: true,
          innings: {
            include: {
              battingTeam: true,
              bowlingTeam: true,
            },
          },
        },
      }),
      
      // Upcoming matches
      prisma.cricketMatch.findMany({
        where: { status: "UPCOMING" },
        orderBy: { matchDate: "asc" },
        include: {
          teamA: true,
          teamB: true,
        },
      }),
      
      // Recent completed matches
      prisma.cricketMatch.findMany({
        where: { status: "COMPLETED" },
        orderBy: { matchDate: "desc" },
        take: 5,
        include: {
          teamA: true,
          teamB: true,
          winner: true,
          innings: {
            include: {
              battingTeam: true,
              bowlingTeam: true,
            },
          },
        },
      }),
    ]);
    
    return NextResponse.json({
      liveMatches,
      upcomingMatches,
      recentMatches,
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication (admin only)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const data = await req.json();
    
    // Validate required fields
    if (!data.title || !data.venue || !data.matchDate || !data.teamAId || !data.teamBId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create the match
    const match = await prisma.cricketMatch.create({
      data: {
        title: data.title,
        description: data.description,
        venue: data.venue,
        matchDate: new Date(data.matchDate),
        teamAId: data.teamAId,
        teamBId: data.teamBId,
        eventId: data.eventId,
      },
    });
    
    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    console.error("Error creating match:", error);
    return NextResponse.json(
      { error: "Failed to create match" },
      { status: 500 }
    );
  }
}
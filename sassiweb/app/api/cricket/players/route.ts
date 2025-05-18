// app/api/cricket/players/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET /api/cricket/players - Get all players
export async function GET(request: NextRequest) {
  try {
    const players = await prisma.cricketPlayer.findMany({
      include: {
        team: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}

// POST /api/cricket/players - Create a new player (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication (admin only)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { name, role, teamId, profileImageUrl } = body;
    
    // Validate required fields
    if (!name || !role || !teamId) {
      return NextResponse.json(
        { error: "Name, role, and team are required" },
        { status: 400 }
      );
    }
    
    // Create the player
    const player = await prisma.cricketPlayer.create({
      data: {
        name,
        role,
        teamId,
        profileImageUrl,
      },
      include: {
        team: true,
      },
    });
    
    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error("Error creating player:", error);
    return NextResponse.json(
      { error: "Failed to create player" },
      { status: 500 }
    );
  }
}
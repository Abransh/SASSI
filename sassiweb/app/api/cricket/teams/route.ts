// app/api/cricket/teams/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const teams = await prisma.cricketTeam.findMany({
      include: {
        players: true,
      },
    });
    
    return NextResponse.json(teams);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const data = await req.json();
    
    // Validate required fields
    if (!data.name || !data.shortName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create team
    const team = await prisma.cricketTeam.create({
      data: {
        name: data.name,
        shortName: data.shortName,
        logoUrl: data.logoUrl,
      },
    });
    
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
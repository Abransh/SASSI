// app/api/cricket/teams/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Create a new PrismaClient instance directly in this file
// This avoids the import error with @/lib/prisma
const prisma = new PrismaClient();

// GET /api/cricket/teams - Get all teams
export async function GET(request: NextRequest) {
  try {
    // Get all teams with player count
    const teams = await prisma.$queryRaw`
      SELECT 
        t."id", 
        t."name", 
        t."shortName", 
        t."logoUrl",
        t."createdAt",
        t."updatedAt",
        COUNT(p."id") AS "playerCount"
      FROM "CricketTeam" t
      LEFT JOIN "CricketPlayer" p ON t."id" = p."teamId"
      GROUP BY t."id", t."name", t."shortName", t."logoUrl", t."createdAt", t."updatedAt"
      ORDER BY t."name" ASC
    `;
    
    // Optional: If you need to include players, you can do a separate query or join
    const teamsWithPlayers = await Promise.all((teams as any[]).map(async (team) => {
      const players = await prisma.$queryRaw`
        SELECT 
          p."id", 
          p."name", 
          p."role", 
          p."profileImageUrl"
        FROM "CricketPlayer" p
        WHERE p."teamId" = ${team.id}
        ORDER BY p."name" ASC
      `;
      
      return {
        ...team,
        players: players as any[],
      };
    }));
    
    return NextResponse.json(teamsWithPlayers);
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

// POST /api/cricket/teams - Create a new team (admin only)
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
    
    // Parse request body
    const body = await request.json();
    const { name, shortName, logoUrl } = body;
    
    // Validate required fields
    if (!name || !shortName) {
      return NextResponse.json(
        { error: "Name and shortName are required" },
        { status: 400 }
      );
    }
    
    // Check if team with same name already exists
    const existingTeam = await prisma.$queryRaw`
      SELECT "id" FROM "CricketTeam" WHERE "name" = ${name} OR "shortName" = ${shortName} LIMIT 1
    `;
    
    if ((existingTeam as any[]).length > 0) {
      return NextResponse.json(
        { error: "Team with this name or shortName already exists" },
        { status: 409 }
      );
    }
    
    // Create the team
    const team = await prisma.$executeRaw`
      INSERT INTO "CricketTeam" ("id", "name", "shortName", "logoUrl", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid(),
        ${name},
        ${shortName},
        ${logoUrl || null},
        NOW(),
        NOW()
      )
    `;
    
    // Get the newly created team
    const newTeam = await prisma.$queryRaw`
      SELECT * FROM "CricketTeam" WHERE "name" = ${name} LIMIT 1
    `;
    
    return NextResponse.json(
      (newTeam as any[])[0],
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating team:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
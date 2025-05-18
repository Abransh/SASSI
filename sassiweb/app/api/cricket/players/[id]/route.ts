// app/api/cricket/players/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Create a new PrismaClient instance directly
const prisma = new PrismaClient();

// GET /api/cricket/players/[id] - Get a specific player
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    // Get the player with team info
    const playerResult = await prisma.$queryRaw`
      SELECT 
        p."id", 
        p."name", 
        p."role", 
        p."teamId", 
        p."profileImageUrl",
        p."createdAt",
        p."updatedAt",
        t."id" as "team_id",
        t."name" as "team_name",
        t."shortName" as "team_shortName"
      FROM "CricketPlayer" p
      LEFT JOIN "CricketTeam" t ON p."teamId" = t."id"
      WHERE p."id" = ${id}
    `;
    
    const players = playerResult as any[];
    
    if (players.length === 0) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    
    const player = players[0];
    
    // Get batting stats
    const battingStatsResult = await prisma.$queryRaw`
      SELECT 
        SUM(b."runs") as "totalRuns",
        SUM(b."ballsFaced") as "totalBallsFaced",
        SUM(b."fours") as "totalFours",
        SUM(b."sixes") as "totalSixes",
        SUM(CASE WHEN b."isOut" = true THEN 1 ELSE 0 END) as "dismissals",
        MAX(b."runs") as "highestScore",
        COUNT(DISTINCT b."inningsId") as "innings"
      FROM "CricketBatting" b
      WHERE b."playerId" = ${id}
    `;
    
    // Get bowling stats
    const bowlingStatsResult = await prisma.$queryRaw`
      SELECT 
        SUM(b."overs") as "totalOvers",
        SUM(b."maidens") as "totalMaidens",
        SUM(b."runs") as "totalRuns",
        SUM(b."wickets") as "totalWickets",
        COUNT(DISTINCT b."inningsId") as "innings"
      FROM "CricketBowling" b
      WHERE b."playerId" = ${id}
    `;
    
    // Get all batting performances
    const battingPerformances = await prisma.$queryRaw`
      SELECT 
        b."id", 
        b."inningsId", 
        b."runs", 
        b."ballsFaced", 
        b."fours", 
        b."sixes", 
        b."isOut", 
        b."dismissalType",
        i."matchId",
        i."battingTeamId",
        i."bowlingTeamId",
        m."title" as "match_title",
        m."venue" as "match_venue",
        m."matchDate" as "match_date",
        bt."name" as "batting_team_name",
        bot."name" as "bowling_team_name"
      FROM "CricketBatting" b
      JOIN "CricketInnings" i ON b."inningsId" = i."id"
      JOIN "CricketMatch" m ON i."matchId" = m."id"
      JOIN "CricketTeam" bt ON i."battingTeamId" = bt."id"
      JOIN "CricketTeam" bot ON i."bowlingTeamId" = bot."id"
      WHERE b."playerId" = ${id}
      ORDER BY m."matchDate" DESC
    `;
    
    // Get all bowling performances
    const bowlingPerformances = await prisma.$queryRaw`
      SELECT 
        b."id", 
        b."inningsId", 
        b."overs", 
        b."maidens", 
        b."runs", 
        b."wickets", 
        b."noBalls", 
        b."wides",
        i."matchId",
        i."battingTeamId",
        i."bowlingTeamId",
        m."title" as "match_title",
        m."venue" as "match_venue",
        m."matchDate" as "match_date",
        bt."name" as "batting_team_name",
        bot."name" as "bowling_team_name"
      FROM "CricketBowling" b
      JOIN "CricketInnings" i ON b."inningsId" = i."id"
      JOIN "CricketMatch" m ON i."matchId" = m."id"
      JOIN "CricketTeam" bt ON i."battingTeamId" = bt."id"
      JOIN "CricketTeam" bot ON i."bowlingTeamId" = bot."id"
      WHERE b."playerId" = ${id}
      ORDER BY m."matchDate" DESC
    `;
    
    // Format batting and bowling stats
    const battingStats = battingStatsResult[0];
    const bowlingStats = bowlingStatsResult[0];
    
    // Calculate additional stats
    const totalRuns = Number(battingStats.totalRuns) || 0;
    const totalBallsFaced = Number(battingStats.totalBallsFaced) || 0;
    const totalWickets = Number(bowlingStats.totalWickets) || 0;
    const totalRunsConceded = Number(bowlingStats.totalRuns) || 0;
    const totalOvers = Number(bowlingStats.totalOvers) || 0;
    const dismissals = Number(battingStats.dismissals) || 0;
    
    const battingAverage = dismissals > 0 
      ? (totalRuns / dismissals).toFixed(2) 
      : totalRuns > 0 ? totalRuns.toString() : "0.00";
    
    const strikeRate = totalBallsFaced > 0 
      ? ((totalRuns / totalBallsFaced) * 100).toFixed(2) 
      : "0.00";
    
    const bowlingAverage = totalWickets > 0 
      ? (totalRunsConceded / totalWickets).toFixed(2) 
      : "0.00";
    
    const economyRate = totalOvers > 0 
      ? (totalRunsConceded / totalOvers).toFixed(2) 
      : "0.00";
    
    // Format the best bowling performance
    let bestBowling = "0/0";
    if (bowlingPerformances.length > 0) {
      const bestPerformance = [...bowlingPerformances].sort((a, b) => {
        if (b.wickets === a.wickets) {
          return a.runs - b.runs; // If same wickets, fewer runs is better
        }
        return b.wickets - a.wickets; // More wickets is better
      })[0];
      
      if (bestPerformance) {
        bestBowling = `${bestPerformance.wickets}/${bestPerformance.runs}`;
      }
    }
    
    // Format the response
    const response = {
      id: player.id,
      name: player.name,
      role: player.role,
      teamId: player.teamId,
      profileImageUrl: player.profileImageUrl,
      createdAt: player.createdAt,
      updatedAt: player.updatedAt,
      team: {
        id: player.team_id,
        name: player.team_name,
        shortName: player.team_shortName,
      },
      stats: {
        matches: Math.max(
          Number(battingStats.innings) || 0, 
          Number(bowlingStats.innings) || 0
        ),
        innings: Number(battingStats.innings) || 0,
        totalRuns,
        totalBallsFaced,
        totalFours: Number(battingStats.totalFours) || 0,
        totalSixes: Number(battingStats.totalSixes) || 0,
        highestScore: Number(battingStats.highestScore) || 0,
        totalWickets,
        totalOvers,
        totalMaidens: Number(bowlingStats.totalMaidens) || 0,
        battingAverage,
        strikeRate,
        bowlingAverage,
        economyRate,
        bestBowling,
      },
      batting: battingPerformances.map((perf: any) => ({
        id: perf.id,
        innings: {
          id: perf.inningsId,
          match: {
            id: perf.matchId,
            title: perf.match_title,
            venue: perf.match_venue,
            matchDate: perf.match_date,
          },
          battingTeam: {
            id: perf.battingTeamId,
            name: perf.batting_team_name,
          },
          bowlingTeam: {
            id: perf.bowlingTeamId,
            name: perf.bowling_team_name,
          },
        },
        runs: perf.runs,
        ballsFaced: perf.ballsFaced,
        fours: perf.fours,
        sixes: perf.sixes,
        isOut: perf.isOut,
        dismissalType: perf.dismissalType,
      })),
      bowling: bowlingPerformances.map((perf: any) => ({
        id: perf.id,
        innings: {
          id: perf.inningsId,
          match: {
            id: perf.matchId,
            title: perf.match_title,
            venue: perf.match_venue,
            matchDate: perf.match_date,
          },
          battingTeam: {
            id: perf.battingTeamId,
            name: perf.batting_team_name,
          },
          bowlingTeam: {
            id: perf.bowlingTeamId,
            name: perf.bowling_team_name,
          },
        },
        overs: perf.overs,
        maidens: perf.maidens,
        runs: perf.runs,
        wickets: perf.wickets,
        noBalls: perf.noBalls,
        wides: perf.wides,
      }))
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { error: "Failed to fetch player" },
      { status: 500 }
    );
  }
}

// PATCH /api/cricket/players/[id] - Update a player (admin only)
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication (admin only)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await context.params;
    const body = await request.json();
    
    // Validate request body
    const { name, role, teamId, profileImageUrl } = body;
    
    if (!name && !role && !teamId && profileImageUrl === undefined) {
      return NextResponse.json(
        { error: "At least one field is required" },
        { status: 400 }
      );
    }
    
    // Check if player exists
    const playerResult = await prisma.$queryRaw`
      SELECT "id" FROM "CricketPlayer" WHERE "id" = ${id}
    `;
    
    if ((playerResult as any[]).length === 0) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    
    // Build the update query dynamically based on provided fields
    let setClauses = [];
    let params = [id];
    let paramIndex = 2; // Start from 2 because id is $1
    
    if (name) {
      setClauses.push(`"name" = $${paramIndex++}`);
      params.push(name);
    }
    
    if (role) {
      setClauses.push(`"role" = $${paramIndex++}`);
      params.push(role);
    }
    
    if (teamId) {
      setClauses.push(`"teamId" = $${paramIndex++}`);
      params.push(teamId);
    }
    
    if (profileImageUrl !== undefined) {
      setClauses.push(`"profileImageUrl" = $${paramIndex++}`);
      params.push(profileImageUrl);
    }
    
    // Add updated timestamp
    setClauses.push(`"updatedAt" = NOW()`);
    
    // Update the player
    const updateQuery = `
      UPDATE "CricketPlayer"
      SET ${setClauses.join(', ')}
      WHERE "id" = $1
      RETURNING *
    `;
    
    const updated = await prisma.$queryRawUnsafe(updateQuery, ...params);
    
    return NextResponse.json((updated as any[])[0]);
  } catch (error) {
    console.error("Error updating player:", error);
    return NextResponse.json(
      { error: "Failed to update player" },
      { status: 500 }
    );
  }
}

// DELETE /api/cricket/players/[id] - Delete a player (admin only)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication (admin only)
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = await context.params;
    
    // Check if player exists
    const playerResult = await prisma.$queryRaw`
      SELECT "id" FROM "CricketPlayer" WHERE "id" = ${id}
    `;
    
    if ((playerResult as any[]).length === 0) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    
    // Check if player has any batting or bowling records
    const battingResult = await prisma.$queryRaw`
      SELECT COUNT(*) as "count" FROM "CricketBatting" WHERE "playerId" = ${id}
    `;
    
    const bowlingResult = await prisma.$queryRaw`
      SELECT COUNT(*) as "count" FROM "CricketBowling" WHERE "playerId" = ${id}
    `;
    
    const battingCount = Number((battingResult as any[])[0].count);
    const bowlingCount = Number((bowlingResult as any[])[0].count);
    
    if (battingCount > 0 || bowlingCount > 0) {
      return NextResponse.json(
        { 
          error: "Cannot delete player with existing stats", 
          battingRecords: battingCount,
          bowlingRecords: bowlingCount
        },
        { status: 409 }
      );
    }
    
    // Delete the player
    await prisma.$executeRaw`
      DELETE FROM "CricketPlayer" WHERE "id" = ${id}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting player:", error);
    return NextResponse.json(
      { error: "Failed to delete player" },
      { status: 500 }
    );
  }
}
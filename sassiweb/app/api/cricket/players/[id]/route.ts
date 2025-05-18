// app/api/cricket/players/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, 
    context: { params: Promise<{ id: string }>
 }) {
  try {
    const params = await context.params;
    const playerId = params.id;
    
    const player = await prisma.cricketPlayer.findUnique({
      where: { id: playerId },
      include: {
        team: true,
        batting: {
          include: {
            innings: {
              include: {
                match: true,
              },
            },
          },
        },
        bowling: {
          include: {
            innings: {
              include: {
                match: true,
              },
            },
          },
        },
      },
    });
    
    if (!player) {
      return NextResponse.json(
        { error: "Player not found" },
        { status: 404 }
      );
    }
    
    // Calculate player stats
    const totalRuns = player.batting.reduce((sum: any, b: any) => sum + b.runs, 0);
    const totalBallsFaced = player.batting.reduce((sum: any, b: any) => sum + b.ballsFaced, 0);
    const totalFours = player.batting.reduce((sum: any, b: any) => sum + b.fours, 0);
    const totalSixes = player.batting.reduce((sum: any , b: any) => sum + b.sixes, 0);
    const totalDismissals = player.batting.filter((b:any) => b.isOut).length;
    
    const totalWickets = player.bowling.reduce((sum: any, b: any) => sum + b.wickets, 0);
    const totalOvers = player.bowling.reduce((sum:any, b: any) => sum + b.overs, 0);
    const totalRunsConceded = player.bowling.reduce((sum: any, b: any) => sum + b.runs, 0);
    const totalMaidens = player.bowling.reduce((sum: any, b: any) => sum + b.maidens, 0);
    
    // Calculate averages and rates
    const battingAverage = totalDismissals > 0 ? totalRuns / totalDismissals : totalRuns;
    const strikeRate = totalBallsFaced > 0 ? (totalRuns / totalBallsFaced) * 100 : 0;
    const economyRate = totalOvers > 0 ? totalRunsConceded / totalOvers : 0;
    const bowlingAverage = totalWickets > 0 ? totalRunsConceded / totalWickets : 0;
    
    const playerStats = {
      ...player,
      stats: {
        matches: new Set([
          ...player.batting.map((b: any) => b.innings.matchId),
          ...player.bowling.map((b: any) => b.innings.matchId),
        ]).size,
        innings: player.batting.length,
        totalRuns,
        totalBallsFaced,
        totalFours,
        totalSixes,
        highestScore: Math.max(...player.batting.map((b: any) => b.runs), 0),
        totalWickets,
        totalOvers,
        totalRunsConceded,
        totalMaidens,
        bestBowling: player.bowling.length > 0 
          ? `${Math.max(...player.bowling.map((b: any) => b.wickets))}/${
              player.bowling.reduce((min: any, b: any) => 
                b.wickets === Math.max(...player.bowling.map((w: any) => w.wickets)) && b.runs < min ? b.runs : min, 
                Number.MAX_SAFE_INTEGER
              )
            }`
          : "0/0",
        battingAverage: battingAverage.toFixed(2),
        strikeRate: strikeRate.toFixed(2),
        economyRate: economyRate.toFixed(2),
        bowlingAverage: bowlingAverage.toFixed(2),
      },
    };
    
    return NextResponse.json(playerStats);
  } catch (error) {
    console.error("Error fetching player:", error);
    return NextResponse.json(
      { error: "Failed to fetch player" },
      { status: 500 }
    );
  }
}
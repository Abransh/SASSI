// app/api/cricket/leaderboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateStrikeRate, calculateEconomyRate } from "@/lib/cricket/calculations";

export async function GET(req: NextRequest) {
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category") || "batting";
    
    if (category === "batting") {
      // Fetch batting leaders
      const battingStats = await prisma.cricketBatting.findMany({
        include: {
          player: {
            include: {
              team: true,
            },
          },
        },
      });
      
      // Aggregate stats by player
      const playerStats = new Map();
      
      for (const stat of battingStats) {
        if (!playerStats.has(stat.playerId)) {
          playerStats.set(stat.playerId, {
            player: stat.player,
            innings: 0,
            runs: 0,
            ballsFaced: 0,
            fours: 0,
            sixes: 0,
            notOuts: 0,
          });
        }
        
        const playerStat = playerStats.get(stat.playerId);
        playerStat.innings += 1;
        playerStat.runs += stat.runs;
        playerStat.ballsFaced += stat.ballsFaced;
        playerStat.fours += stat.fours;
        playerStat.sixes += stat.sixes;
        playerStat.notOuts += stat.isOut ? 0 : 1;
      }
      
      // Convert to array and calculate averages and strike rates
      const battingLeaders = Array.from(playerStats.values())
        .map(stat => ({
          ...stat,
          dismissals: stat.innings - stat.notOuts,
          average: stat.dismissals > 0 ? (stat.runs / stat.dismissals).toFixed(2) : stat.runs.toFixed(2),
          strikeRate: calculateStrikeRate(stat.runs, stat.ballsFaced).toFixed(2),
        }))
        .sort((a, b) => b.runs - a.runs);
      
      return NextResponse.json(battingLeaders);
    } else if (category === "bowling") {
      // Fetch bowling leaders
      const bowlingStats = await prisma.cricketBowling.findMany({
        include: {
          player: {
            include: {
              team: true,
            },
          },
        },
      });
      
      // Aggregate stats by player
      const playerStats = new Map();
      
      for (const stat of bowlingStats) {
        if (!playerStats.has(stat.playerId)) {
          playerStats.set(stat.playerId, {
            player: stat.player,
            innings: 0,
            overs: 0,
            maidens: 0,
            runs: 0,
            wickets: 0,
            noBalls: 0,
            wides: 0,
          });
        }
        
        const playerStat = playerStats.get(stat.playerId);
        playerStat.innings += 1;
        playerStat.overs += stat.overs;
        playerStat.maidens += stat.maidens;
        playerStat.runs += stat.runs;
        playerStat.wickets += stat.wickets;
        playerStat.noBalls += stat.noBalls;
        playerStat.wides += stat.wides;
      }
      
      // Convert to array and calculate averages and economy rates
      const bowlingLeaders = Array.from(playerStats.values())
        .map(stat => ({
          ...stat,
          average: stat.wickets > 0 ? (stat.runs / stat.wickets).toFixed(2) : "-",
          economyRate: calculateEconomyRate(stat.runs, stat.overs).toFixed(2),
          strikeRate: stat.wickets > 0 ? ((stat.overs * 6) / stat.wickets).toFixed(2) : "-",
        }))
        .sort((a, b) => b.wickets - a.wickets);
      
      return NextResponse.json(bowlingLeaders);
    }
    
    return NextResponse.json(
      { error: "Invalid category" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
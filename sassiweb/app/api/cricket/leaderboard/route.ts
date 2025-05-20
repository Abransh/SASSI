// app/api/cricket/leaderboard/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get query parameters for filtering
    const searchParams = new URL(request.url).searchParams;
    const category = searchParams.get("category") || "batting";
    
    if (category === "batting") {
      // Get batting leaderboard
      const battingStats = await getBattingLeaderboard();
      return NextRes    ponse.json(battingStats);
    } else if (category === "bowling") {
      // Get bowling leaderboard
      const bowlingStats = await getBowlingLeaderboard();
      return NextResponse.json(bowlingStats);
    } else {
      return NextResponse.json(
        { error: "Invalid category. Use 'batting' or 'bowling'" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

// Get batting leaderboard
async function getBattingLeaderboard() {
  // Get all batting performances
  const battingPerformances = await prisma.cricketBatting.findMany({
    include: {
      player: {
        include: {
          team: true,
        },
      },
      innings: true,
    },
  });
  
  // Group by player and aggregate stats
  const playerStats = new Map();
  
  for (const performance of battingPerformances) {
    const playerId = performance.playerId;
    
    if (!playerStats.has(playerId)) {
      playerStats.set(playerId, {
        player: performance.player,
        innings: 0,
        runs: 0,
        ballsFaced: 0,
        fours: 0,
        sixes: 0,
        dismissals: 0,
        highestScore: 0,
      });
    }
    
    const stats = playerStats.get(playerId);
    stats.innings += 1;
    stats.runs += performance.runs;
    stats.ballsFaced += performance.ballsFaced;
    stats.fours += performance.fours;
    stats.sixes += performance.sixes;
    stats.dismissals += performance.isOut ? 1 : 0;
    stats.highestScore = Math.max(stats.highestScore, performance.runs);
  }
  
  // Calculate averages and strike rates
  const leaderboard = Array.from(playerStats.values()).map(stats => {
    const average = stats.dismissals > 0 
      ? (stats.runs / stats.dismissals).toFixed(2) 
      : stats.runs > 0 ? stats.runs.toString() : "0.00";
    
    const strikeRate = stats.ballsFaced > 0 
      ? ((stats.runs / stats.ballsFaced) * 100).toFixed(2) 
      : "0.00";
    
    return {
      player: stats.player,
      innings: stats.innings,
      runs: stats.runs,
      ballsFaced: stats.ballsFaced,
      fours: stats.fours,
      sixes: stats.sixes,
      dismissals: stats.dismissals,
      highestScore: stats.highestScore,
      average,
      strikeRate,
    };
  });
  
  // Sort by runs (descending)
  return leaderboard.sort((a, b) => b.runs - a.runs);
}

// Get bowling leaderboard
async function getBowlingLeaderboard() {
  // Get all bowling performances
  const bowlingPerformances = await prisma.cricketBowling.findMany({
    include: {
      player: {
        include: {
          team: true,
        },
      },
      innings: true,
    },
  });
  
  // Group by player and aggregate stats
  const playerStats = new Map();
  
  for (const performance of bowlingPerformances) {
    const playerId = performance.playerId;
    
    if (!playerStats.has(playerId)) {
      playerStats.set(playerId, {
        player: performance.player,
        innings: 0,
        overs: 0,
        maidens: 0,
        runs: 0,
        wickets: 0,
        noBalls: 0,
        wides: 0,
        bestBowlingWickets: 0,
        bestBowlingRuns: 0,
      });
    }
    
    const stats = playerStats.get(playerId);
    stats.innings += 1;
    stats.overs += performance.overs;
    stats.maidens += performance.maidens;
    stats.runs += performance.runs;
    stats.wickets += performance.wickets;
    stats.noBalls += performance.noBalls;
    stats.wides += performance.wides;
    
    // Track best bowling figures
    if (performance.wickets > stats.bestBowlingWickets || 
        (performance.wickets === stats.bestBowlingWickets && 
         performance.runs < stats.bestBowlingRuns)) {
      stats.bestBowlingWickets = performance.wickets;
      stats.bestBowlingRuns = performance.runs;
    }
  }
  
  // Calculate averages and economy rates
  const leaderboard = Array.from(playerStats.values()).map(stats => {
    const average = stats.wickets > 0 
      ? (stats.runs / stats.wickets).toFixed(2) 
      : "0.00";
    
    const economyRate = stats.overs > 0 
      ? (stats.runs / stats.overs).toFixed(2) 
      : "0.00";
    
    const bestBowling = `${stats.bestBowlingWickets}/${stats.bestBowlingRuns}`;
    
    return {
      player: stats.player,
      innings: stats.innings,
      overs: stats.overs,
      maidens: stats.maidens,
      runs: stats.runs,
      wickets: stats.wickets,
      noBalls: stats.noBalls,
      wides: stats.wides,
      average,
      economyRate,
      bestBowling,
    };
  });
  
  // Sort by wickets (descending), then economy rate (ascending)
  return leaderboard.sort((a, b) => {
    if (b.wickets !== a.wickets) {
      return b.wickets - a.wickets;
    }
    return parseFloat(a.economyRate) - parseFloat(b.economyRate);
  });
}
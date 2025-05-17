// lib/cricket/calculations.ts
import { BallEvent, Innings, BattingPerformance, BowlingPerformance } from "@/lib/cricket/types";

/**
 * Calculate run rate (runs per over)
 */
export function calculateRunRate(runs: number, overs: number): number {
  if (overs === 0) return 0;
  return runs / overs;
}

/**
 * Calculate required run rate
 */
export function calculateRequiredRunRate(
  targetRuns: number,
  currentRuns: number,
  oversLeft: number
): number {
  const runsNeeded = targetRuns - currentRuns;
  if (runsNeeded <= 0 || oversLeft === 0) return 0;
  return runsNeeded / oversLeft;
}

/**
 * Calculate strike rate (runs per 100 balls)
 */
export function calculateStrikeRate(runs: number, ballsFaced: number): number {
  if (ballsFaced === 0) return 0;
  return (runs / ballsFaced) * 100;
}

/**
 * Calculate economy rate (runs per over)
 */
export function calculateEconomyRate(runs: number, overs: number): number {
  if (overs === 0) return 0;
  return runs / overs;
}

/**
 * Calculate batting average (runs per dismissal)
 */
export function calculateBattingAverage(runs: number, dismissals: number): number {
  if (dismissals === 0) return runs; // Not out
  return runs / dismissals;
}

/**
 * Calculate bowling average (runs per wicket)
 */
export function calculateBowlingAverage(runs: number, wickets: number): number {
  if (wickets === 0) return Number.POSITIVE_INFINITY;
  return runs / wickets;
}

/**
 * Calculate overs (whole overs + balls/6)
 */
export function calculateOvers(currentOvers: number, ballsToAdd: number): number {
  const totalOvers = Math.floor(currentOvers);
  const balls = Math.round((currentOvers - totalOvers) * 10) + ballsToAdd;
  
  const newOvers = totalOvers + Math.floor(balls / 6);
  const remainingBalls = balls % 6;
  
  return newOvers + (remainingBalls / 10);
}

/**
 * Convert overs to balls
 */
export function oversToActualBalls(overs: number): number {
  const wholeOvers = Math.floor(overs);
  const balls = Math.round((overs - wholeOvers) * 10);
  
  return wholeOvers * 6 + balls;
}

/**
 * Calculate partnership runs
 */
export function calculatePartnership(
  ballEvents: BallEvent[],
  batsmanId1: string,
  batsmanId2: string
): number {
  return ballEvents
    .filter(
      b =>
        (b.batsmanOnStrikeId === batsmanId1 && b.nonStrikerId === batsmanId2) ||
        (b.batsmanOnStrikeId === batsmanId2 && b.nonStrikerId === batsmanId1)
    )
    .reduce((runs, ball) => runs + ball.runs + ball.extras, 0);
}

/**
 * Determine fall of wickets in sequence
 */
export function determineFallOfWickets(
  innings: Innings,
  ballEvents: BallEvent[]
): Array<{ wicketNumber: number; runs: number; overs: number; playerId: string }> {
  const wicketBalls = ballEvents
    .filter(ball => ball.isWicket)
    .sort((a, b) => {
      if (a.over !== b.over) return a.over - b.over;
      return a.ballInOver - b.ballInOver;
    });
  
  return wicketBalls.map((ball, index) => {
    const runsAtWicket = ballEvents
      .filter(b => {
        if (b.over < ball.over) return true;
        if (b.over === ball.over && b.ballInOver <= ball.ballInOver) return true;
        return false;
      })
      .reduce((runs, b) => runs + b.runs + b.extras, 0);
    
    return {
      wicketNumber: index + 1,
      runs: runsAtWicket,
      overs: ball.over + ball.ballInOver / 6,
      playerId: ball.batsmanOnStrikeId,
    };
  });
}
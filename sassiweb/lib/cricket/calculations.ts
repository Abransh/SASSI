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

/**
 * Update scorecard after a ball is bowled
 * This function handles updating all relevant statistics after a ball event
 */
export async function updateScorecardAfterBall(
    prisma: any,
    ballEvent: {
      matchId: string;
      inningsId: string;
      over: number;
      ballInOver: number;
      batsmanOnStrikeId: string;
      nonStrikerId: string;
      bowlerId: string;
      runs: number;
      extras: number;
      extrasType?: string;
      isWicket: boolean;
      wicketType?: string;
    }
  ) {
    try {
      // Start a transaction to ensure all updates are atomic
      return await prisma.$transaction(async (tx: any) => {
        // 1. Get the current innings
        const innings = await tx.cricketInnings.findUnique({
          where: { id: ballEvent.inningsId },
          include: {
            battingTeam: true,
            bowlingTeam: true,
          },
        });
  
        if (!innings) {
          throw new Error("Innings not found");
        }
  
        // 2. Update innings totals
        const isLegalDelivery = !ballEvent.extrasType || 
          (ballEvent.extrasType !== "WIDE" && ballEvent.extrasType !== "NO_BALL");
        
        // Calculate updated overs
        let updatedOvers = innings.overs;
        if (isLegalDelivery) {
          updatedOvers = calculateOvers(innings.overs, 1);
        }
  
        // Update innings runs and extras
        const updatedInnings = await tx.cricketInnings.update({
          where: { id: ballEvent.inningsId },
          data: {
            totalRuns: innings.totalRuns + ballEvent.runs + ballEvent.extras,
            extras: innings.extras + ballEvent.extras,
            overs: updatedOvers,
            wickets: ballEvent.isWicket ? innings.wickets + 1 : innings.wickets,
          },
        });
  
        // 3. Update batsman statistics
        // First check if the batsman already has a record for this innings
        let battingRecord = await tx.cricketBatting.findFirst({
          where: {
            inningsId: ballEvent.inningsId,
            playerId: ballEvent.batsmanOnStrikeId,
          },
        });
  
        if (battingRecord) {
          // Update existing batting record
          await tx.cricketBatting.update({
            where: { id: battingRecord.id },
            data: {
              runs: battingRecord.runs + ballEvent.runs,
              ballsFaced: isLegalDelivery ? battingRecord.ballsFaced + 1 : battingRecord.ballsFaced,
              fours: ballEvent.runs === 4 ? battingRecord.fours + 1 : battingRecord.fours,
              sixes: ballEvent.runs === 6 ? battingRecord.sixes + 1 : battingRecord.sixes,
              isOut: ballEvent.isWicket ? true : battingRecord.isOut,
              dismissalType: ballEvent.isWicket ? ballEvent.wicketType : battingRecord.dismissalType,
            },
          });
        } else {
          // Create new batting record
          await tx.cricketBatting.create({
            data: {
              inningsId: ballEvent.inningsId,
              playerId: ballEvent.batsmanOnStrikeId,
              runs: ballEvent.runs,
              ballsFaced: isLegalDelivery ? 1 : 0,
              fours: ballEvent.runs === 4 ? 1 : 0,
              sixes: ballEvent.runs === 6 ? 1 : 0,
              isOut: ballEvent.isWicket,
              dismissalType: ballEvent.isWicket ? ballEvent.wicketType : null,
            },
          });
        }
  
        // 4. Update bowler statistics
        let bowlingRecord = await tx.cricketBowling.findFirst({
          where: {
            inningsId: ballEvent.inningsId,
            playerId: ballEvent.bowlerId,
          },
        });
  
        // Calculate updated overs for bowler
        let bowlerOvers = 0;
        if (bowlingRecord) {
          bowlerOvers = bowlingRecord.overs;
          if (isLegalDelivery) {
            bowlerOvers = calculateOvers(bowlerOvers, 1);
          }
        } else if (isLegalDelivery) {
          bowlerOvers = 0.1; // First legal delivery
        }
  
        if (bowlingRecord) {
          // Update existing bowling record
          await tx.cricketBowling.update({
            where: { id: bowlingRecord.id },
            data: {
              overs: bowlerOvers,
              runs: bowlingRecord.runs + ballEvent.runs,
              wickets: ballEvent.isWicket ? bowlingRecord.wickets + 1 : bowlingRecord.wickets,
              noBalls: ballEvent.extrasType === "NO_BALL" ? bowlingRecord.noBalls + 1 : bowlingRecord.noBalls,
              wides: ballEvent.extrasType === "WIDE" ? bowlingRecord.wides + 1 : bowlingRecord.wides,
            },
          });
        } else {
          // Create new bowling record
          await tx.cricketBowling.create({
            data: {
              inningsId: ballEvent.inningsId,
              playerId: ballEvent.bowlerId,
              overs: bowlerOvers,
              runs: ballEvent.runs,
              wickets: ballEvent.isWicket ? 1 : 0,
              noBalls: ballEvent.extrasType === "NO_BALL" ? 1 : 0,
              wides: ballEvent.extrasType === "WIDE" ? 1 : 0,
            },
          });
        }
  
        // 5. Create the ball event record
        const createdBallEvent = await tx.cricketBallEvent.create({
          data: {
            matchId: ballEvent.matchId,
            inningsId: ballEvent.inningsId,
            over: ballEvent.over,
            ballInOver: ballEvent.ballInOver,
            batsmanOnStrikeId: ballEvent.batsmanOnStrikeId,
            nonStrikerId: ballEvent.nonStrikerId,
            bowlerId: ballEvent.bowlerId,
            runs: ballEvent.runs,
            extras: ballEvent.extras,
            extrasType: ballEvent.extrasType,
            isWicket: ballEvent.isWicket,
            wicketType: ballEvent.wicketType,
          },
        });
  
        // 6. Update match status to LIVE if not already
        await tx.cricketMatch.updateMany({
          where: {
            id: ballEvent.matchId,
            status: { not: "COMPLETED" },
          },
          data: {
            status: "LIVE",
          },
        });
  
        return {
          innings: updatedInnings,
          ballEvent: createdBallEvent,
        };
      });
    } catch (error) {
      console.error("Error updating scorecard:", error);
      throw error;
    }
  }
// lib/cricket/utils.ts
import { PlayerRole, DismissalType, ExtrasType } from "./types";

/**
 * Format player role for display
 */
export function formatRole(role: PlayerRole | string): string {
  switch (role) {
    case "BATSMAN":
      return "Batsman";
    case "BOWLER":
      return "Bowler";
    case "ALL_ROUNDER":
      return "All-Rounder";
    case "WICKET_KEEPER":
      return "Wicket-Keeper";
    default:
      return role.toString().replace("_", " ");
  }
}

/**
 * Format dismissal type for display
 */
export function formatDismissalType(type: DismissalType | string): string {
  switch (type) {
    case "BOWLED":
      return "Bowled";
    case "CAUGHT":
      return "Caught";
    case "LBW":
      return "LBW";
    case "RUN_OUT":
      return "Run Out";
    case "STUMPED":
      return "Stumped";
    case "HIT_WICKET":
      return "Hit Wicket";
    case "RETIRED_HURT":
      return "Retired Hurt";
    case "OBSTRUCTING_FIELD":
      return "Obstructing Field";
    case "TIMED_OUT":
      return "Timed Out";
    case "HANDLED_BALL":
      return "Handled Ball";
    default:
      return type.toString().replace("_", " ");
  }
}

/**
 * Format extras type for display
 */
export function formatExtrasType(type: ExtrasType | string): string {
  switch (type) {
    case "WIDE":
      return "Wide";
    case "NO_BALL":
      return "No Ball";
    case "BYE":
      return "Bye";
    case "LEG_BYE":
      return "Leg Bye";
    default:
      return type.toString().replace("_", " ");
  }
}

/**
 * Format overs (e.g., 4.3 means 4 overs and 3 balls) - FIXED
 * In cricket, the decimal part represents balls out of 6, not a true decimal
 */
export function formatOvers(overs: number): string {
  if (typeof overs !== 'number' || isNaN(overs)) {
    return "0.0";
  }
  
  const wholeOvers = Math.floor(overs);
  // Extract the decimal part and convert to balls (0.1 = 1 ball, 0.2 = 2 balls, etc.)
  const balls = Math.round((overs - wholeOvers) * 10);
  
  // Ensure balls don't exceed 5 (0-5 balls in an incomplete over)
  const validBalls = Math.min(balls, 5);
  
  return `${wholeOvers}.${validBalls}`;
}
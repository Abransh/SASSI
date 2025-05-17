// lib/cricket/api.ts
import { Match, Team, Player } from "./types";

/**
 * Fetch all matches grouped by status
 */
export async function getMatches() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cricket/matches`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching matches:', error);
    return {
      liveMatches: [],
      upcomingMatches: [],
      recentMatches: [],
    };
  }
}

/**
 * Fetch a single match by ID
 */
export async function getMatch(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cricket/matches/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch match');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching match ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch all teams
 */
export async function getTeams() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cricket/teams`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch teams');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

/**
 * Fetch a player by ID
 */
export async function getPlayer(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cricket/players/${id}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch player');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching player ${id}:`, error);
    throw error;
  }
}

/**
 * Fetch leaderboard data
 */
export async function getLeaderboard(category: string = "batting") {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/cricket/leaderboard?category=${category}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch leaderboard');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
}
// lib/cricket-event-service.ts
import prisma from "@/lib/prisma";
import { Event } from "@/types/event";
import { Match, MatchStatus } from "@/lib/cricket/types";

/**
 * Creates a cricket match from an Event
 */
export async function createCricketMatchFromEvent(eventId: string, matchData: Partial<Match>) {
  try {
    // Get the event
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });
    
    if (!event) {
      throw new Error("Event not found");
    }
    
    // Create the cricket match
    const match = await prisma.cricketMatch.create({
      data: {
        title: matchData.title || event.title,
        description: matchData.description || event.description || "",
        venue: matchData.venue || event.location,
        matchDate: matchData.matchDate || event.startDate,
        status: MatchStatus.UPCOMING,
        teamAId: matchData.teamA?.id || "",
        teamBId: matchData.teamB?.id || "",
        eventId: event.id,
      },
    });
    
    return match;
  } catch (error) {
    console.error("Error creating cricket match from event:", error);
    throw error;
  }
}

/**
 * Get all cricket matches for an event
 */
export async function getCricketMatchesForEvent(eventId: string) {
  try {
    const matches = await prisma.cricketMatch.findMany({
      where: { eventId },
      include: {
        teamA: true,
        teamB: true,
        winner: true,
        innings: {
          include: {
            battingTeam: true,
            bowlingTeam: true,
          },
        },
      },
    });
    
    return matches;
  } catch (error) {
    console.error("Error fetching cricket matches for event:", error);
    throw error;
  }
}

/**
 * Get all events that are cricket matches
 */
export async function getCricketEvents() {
  try {
    const events = await prisma.event.findMany({
      where: {
        cricketMatches: {
          some: {},
        },
      },
      include: {
        cricketMatches: {
          include: {
            teamA: true,
            teamB: true,
          },
        },
      },
    });
    
    return events;
  } catch (error) {
    console.error("Error fetching cricket events:", error);
    throw error;
  }
}
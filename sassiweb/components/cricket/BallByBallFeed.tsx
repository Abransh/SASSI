// components/cricket/BallByBallFeed.tsx
"use client";

import { useState, useEffect } from "react";
import { BallEvent, ExtrasType, DismissalType } from "@/lib/cricket/types";
import { formatOvers } from "@/lib/cricket/utils";
import useSWR from "swr";

interface BallByBallFeedProps {
  matchId: string;
  inningsId?: string;
  limit?: number;
  autoRefresh?: boolean;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BallByBallFeed({ 
  matchId, 
  inningsId,
  limit = 30,
  autoRefresh = true
}: BallByBallFeedProps) {
  // Construct API URL
  const apiUrl = `/api/cricket/matches/${matchId}/ball${
    inningsId ? `?inningsId=${inningsId}&` : '?'
  }limit=${limit}`;
  
  // Fetch ball events with SWR for auto-refresh
  const { data, error, isLoading, mutate } = useSWR(
    apiUrl, 
    fetcher, 
    { refreshInterval: autoRefresh ? 5000 : 0 }
  );
  
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">Loading ball-by-ball commentary...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-md text-center">
        <p className="text-red-700">Error loading ball-by-ball data</p>
        <button 
          onClick={() => mutate()} 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }
  
  const ballEvents: BallEvent[] = data || [];
  
  // Group balls by over
  const overGroups = ballEvents.reduce((groups, ball) => {
    const key = `${ball.over}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ball);
    return groups;
  }, {} as Record<string, BallEvent[]>);
  
  // Sort overs in descending order (most recent first)
  const sortedOvers = Object.keys(overGroups)
    .map(over => parseInt(over))
    .sort((a, b) => b - a);
  
  if (ballEvents.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">No ball-by-ball data available yet</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {sortedOvers.map(over => (
        <div key={over} className="border rounded-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 font-medium border-b">
            Over {over}
          </div>
          <div className="divide-y">
            {overGroups[over.toString()]
              .sort((a, b) => a.ballInOver - b.ballInOver)
              .map(ball => (
                <BallEventRow key={ball.id} ball={ball} />
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );
}

interface BallEventRowProps {
  ball: BallEvent;
}

function BallEventRow({ ball }: BallEventRowProps) {
  // Format the ball number (e.g., "1.4" for 1st over, 4th ball)
  const ballNumber = `${ball.over}.${ball.ballInOver}`;
  
  // Get event type
  const eventType = getEventType(ball);
  
  // Get event color
  const eventColor = getEventColor(ball);
  
  return (
    <div className="px-4 py-3 flex items-start">
      {/* Ball number */}
      <div className="w-10 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 text-sm font-medium mr-3">
        {ballNumber}
      </div>
      
      {/* Event content */}
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-medium">{ball.batsmanOnStrike.name}</span>
          <span className="mx-1 text-gray-400">to</span>
          <span className="font-medium">{ball.bowler.name}</span>
        </div>
        
        <div className="text-sm text-gray-600 mt-1 flex items-center">
          <span className={`inline-block w-6 h-6 rounded-full ${eventColor} text-white text-xs font-medium flex items-center justify-center mr-2`}>
            {getEventLabel(ball)}
          </span>
          <span>
            {eventType}
            {ball.comment && ` - ${ball.comment}`}
          </span>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function getEventType(ball: BallEvent): string {
  if (ball.isWicket) {
    return `WICKET! ${getDismissalDescription(ball)}`;
  }
  
  if (ball.extrasType) {
    switch (ball.extrasType) {
      case ExtrasType.WIDE:
        return `Wide ball, ${ball.extras} run${ball.extras !== 1 ? 's' : ''}`;
      case ExtrasType.NO_BALL:
        return `No ball, ${ball.extras} run${ball.extras !== 1 ? 's' : ''}`;
      case ExtrasType.BYE:
        return `Bye, ${ball.extras} run${ball.extras !== 1 ? 's' : ''}`;
      case ExtrasType.LEG_BYE:
        return `Leg bye, ${ball.extras} run${ball.extras !== 1 ? 's' : ''}`;
    }
  }
  
  if (ball.runs === 0) {
    return "Dot ball";
  }
  
  if (ball.runs === 4) {
    return "FOUR! Boundary";
  }
  
  if (ball.runs === 6) {
    return "SIX! Over the boundary";
  }
  
  return `${ball.runs} run${ball.runs !== 1 ? 's' : ''}`;
}

function getEventLabel(ball: BallEvent): string {
  if (ball.isWicket) return "W";
  if (ball.extrasType === ExtrasType.WIDE) return "WD";
  if (ball.extrasType === ExtrasType.NO_BALL) return "NB";
  return ball.runs.toString();
}

function getEventColor(ball: BallEvent): string {
  if (ball.isWicket) return "bg-red-600";
  if (ball.runs === 4) return "bg-blue-600";
  if (ball.runs === 6) return "bg-purple-600";
  if (ball.extrasType) return "bg-yellow-600";
  if (ball.runs === 0) return "bg-gray-600";
  return "bg-green-600";
}

function getDismissalDescription(ball: BallEvent): string {
  const batsman = ball.batsmanOnStrike.name;
  
  switch (ball.wicketType) {
    case DismissalType.BOWLED:
      return `${batsman} is bowled by ${ball.bowler.name}`;
    case DismissalType.CAUGHT:
      return `${batsman} is caught`;
    case DismissalType.LBW:
      return `${batsman} is LBW to ${ball.bowler.name}`;
    case DismissalType.RUN_OUT:
      return `${batsman} is run out`;
    case DismissalType.STUMPED:
      return `${batsman} is stumped`;
    case DismissalType.HIT_WICKET:
      return `${batsman} hit wicket`;
    default:
      return `${batsman} is out`;
  }
}
// components/cricket/Scoreboard.tsx
"use client";

import { Match, Innings } from "@/lib/cricket/types";
import {  calculateRunRate, calculateRequiredRunRate } from "@/lib/cricket/calculations";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { formatOvers } from "@/lib/cricket/utils";

interface ScoreboardProps {
  match: Match;
}

export default function Scoreboard({ match }: ScoreboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentBatsmen, setCurrentBatsmen] = useState<{
    striker: { id: string; name: string } | null;
    nonStriker: { id: string; name: string } | null;
    bowler: { id: string; name: string } | null;
  }>({
    striker: null,
    nonStriker: null,
    bowler: null
  });
  
  // Update the current time every second for live matches
  useEffect(() => {
    if (match.status === "LIVE") {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [match.status]);

  // Get current innings and fetch current batsmen/bowler info
  useEffect(() => {
    if (match.status === "LIVE" && match.innings?.length > 0) {
      const fetchCurrentPlayers = async () => {
        try {
          const currentInnings = match.innings[match.innings.length - 1];
          const response = await fetch(`/api/cricket/matches/${match.id}/ball?inningsId=${currentInnings.id}&limit=1`);
          
          if (response.ok) {
            const ballEvents = await response.json();
            
            if (ballEvents && ballEvents.length > 0) {
              const lastBall = ballEvents[0];
              
              // Find player names from the IDs
              const striker = currentInnings.battingTeam.players.find(
                (p: any) => p.id === lastBall.batsmanOnStrikeId
              );
              
              const nonStriker = currentInnings.battingTeam.players.find(
                (p: any) => p.id === lastBall.nonStrikerId
              );
              
              const bowler = currentInnings.bowlingTeam.players.find(
                (p: any) => p.id === lastBall.bowlerId
              );
              
              setCurrentBatsmen({
                striker: striker ? { id: striker.id, name: striker.name } : null,
                nonStriker: nonStriker ? { id: nonStriker.id, name: nonStriker.name } : null,
                bowler: bowler ? { id: bowler.id, name: bowler.name } : null
              });
            }
          }
        } catch (error) {
          console.error("Error fetching current players:", error);
        }
      };
      
      fetchCurrentPlayers();
    }
  }, [match]);   
  
  // Get current innings
  const innings = match.innings || [];
  const currentInnings = innings.length > 0 
    ? innings[innings.length - 1] 
    : null;
  
  // Get first innings (for target calculation)
  const firstInnings = innings.length > 1 
    ? innings[0] 
    : null;
  
  // Calculate target if applicable
  const target = firstInnings && currentInnings && 
    currentInnings.battingTeamId !== firstInnings.battingTeamId
    ? firstInnings.totalRuns + 1
    : null;
  
  // Calculate runs needed & balls remaining (only if there's a target)
  const runsNeeded = target && currentInnings
    ? target - currentInnings.totalRuns
    : null;
  
  const oversRemaining = currentInnings
    ? 5 - currentInnings.overs // Assuming T20 format
    : null;
  
  // Format time display
  const timeDisplay = (() => {
    if (match.status === "UPCOMING") {
      const matchDate = new Date(match.matchDate);
      const diffTime = matchDate.getTime() - currentTime.getTime();
      
      if (diffTime <= 0) {
        return "Starting soon";
      }
      
      // Format as days/hours/minutes remaining
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      
      if (diffDays > 0) {
        return `${diffDays}d ${diffHours}h remaining`;
      } else if (diffHours > 0) {
        return `${diffHours}h ${diffMinutes}m remaining`;
      } else {
        return `${diffMinutes}m remaining`;
      }
    }
    return null;
  })();
  
  if (!currentInnings && match.status !== "COMPLETED" && match.status !== "UPCOMING") {
    return (
      <div className="p-4 bg-gray-100 rounded-lg text-center">
        <p className="text-gray-600">Match has not started</p>
      </div>
    );
  }

  const renderCurrentBatsmen = () => {
    if (!currentBatsmen.striker || !currentBatsmen.nonStriker || !currentBatsmen.bowler) {
      return null;
    }

    return (
      <div className="mt-4 p-2 bg-gray-50 rounded-md">
        <div className="text-sm">
          <span className="font-medium">{currentBatsmen.striker.name}*</span> and <span>{currentBatsmen.nonStriker.name}</span>
        </div>
        <div className="text-sm">
          <span className="font-medium">Bowler:</span> {currentBatsmen.bowler.name}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-gray-50 border rounded-lg overflow-hidden">
      {/* Status banner */}
      <div className="px-4 py-2 bg-gray-100 border-b flex justify-between items-center">
        <Badge 
          variant="outline" 
          className={`${
            match.status === "LIVE" 
              ? "bg-green-100 text-green-800 border-green-200" 
              : match.status === "COMPLETED" 
                ? "bg-blue-100 text-blue-800 border-blue-200"
                : "bg-yellow-100 text-yellow-800 border-yellow-200"
          }`}
        >
          {match.status}
        </Badge>
        
        {match.status === "LIVE" && (
          <div className="flex items-center text-green-700 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
            Live
          </div>
        )}
        
        {timeDisplay && (
          <div className="flex items-center text-gray-600 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            {timeDisplay}
          </div>
        )}
        
        {match.status === "COMPLETED" && match.winner && (
          <div className="flex items-center text-blue-700 text-sm">
            <Trophy className="w-4 h-4 mr-1" />
            {match.winner.name} won
          </div>
        )}
      </div>
      
      {/* Scoreboard display */}
      <div className="p-4">
        {currentInnings ? (
          <div className="space-y-4">
            {/* Current batting team score */}
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{currentInnings.battingTeam.name}</h3>
                <div className="text-2xl font-bold">
                  {currentInnings.totalRuns}/{currentInnings.wickets}
                  <span className="text-sm text-gray-600 ml-2">
                    ({formatOvers(currentInnings.overs)})
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  CRR: {calculateRunRate(currentInnings.totalRuns, currentInnings.overs).toFixed(2)}
                </div>
                
                {target && (
                  <div className="text-sm text-gray-600">
                    RRR: {calculateRequiredRunRate(
                      target, 
                      currentInnings.totalRuns,
                      oversRemaining || 0
                    ).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
             {/* Current batsmen and bowler - Add this! */}
             {match.status === "LIVE" && renderCurrentBatsmen()}
             
            {/* Target info */}
            {target && (
              <div className={`p-2 rounded-md text-sm ${
                runsNeeded && runsNeeded <= 0
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-50 text-blue-800"
              }`}>
                {runsNeeded && runsNeeded <= 0
                  ? `${currentInnings.battingTeam.name} won by ${10 - currentInnings.wickets} wickets`
                  : `${currentInnings.battingTeam.name} needs ${runsNeeded} runs from ${
                      oversRemaining ? formatOvers(oversRemaining) : "0.0"
                    } overs`
                }
              </div>
            )}
            
            {/* First innings summary if available */}
            {firstInnings && firstInnings.id !== currentInnings.id && (
              <div className="mt-3 pt-3 border-t text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>{firstInnings.battingTeam.name}</span>
                  <span>
                    {firstInnings.totalRuns}/{firstInnings.wickets}
                    <span className="text-xs ml-1">
                      ({formatOvers(firstInnings.overs)})
                    </span>
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          // For upcoming matches
          <div className="text-center py-2">
            <p className="text-gray-600">
              {match.status === "UPCOMING" 
                ? "Match hasn't started yet" 
                : "No scorecard available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
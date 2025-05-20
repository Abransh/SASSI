// components/cricket/MatchCard.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Match, MatchStatus } from "@/lib/cricket/types";
import { calculateRunRate } from "@/lib/cricket/calculations";

interface MatchCardProps {
  match: Match;
  isLive?: boolean;
  isCompleted?: boolean;
}

export default function MatchCard({ match, isLive = false, isCompleted = false }: MatchCardProps) {
  // Extract data for rendering
  const { teamA, teamB, venue, matchDate, status, innings } = match;
  
  // Get latest innings for each team if available
  const teamAInnings = innings?.filter(inn => inn.battingTeamId === teamA.id)[0];
  const teamBInnings = innings?.filter(inn => inn.battingTeamId === teamB.id)[0];
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow
      ${isLive ? 'border-2 border-orange-500' : ''}`}>
      
      {/* Status Badge */}
      <div className="px-4 py-2 bg-gray-100 border-b flex justify-between items-center">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold 
          ${status === MatchStatus.LIVE ? 'bg-green-100 text-green-800' :
            status === MatchStatus.COMPLETED ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'}`}>
          {status === MatchStatus.LIVE ? 'LIVE' : 
           status === MatchStatus.COMPLETED ? 'COMPLETED' :
           format(new Date(matchDate), 'MMMM d, yyyy • h:mm a')}
        </span>
        
        {isLive && (
          <span className="flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2"></span>
            Live
          </span>
        )}
      </div>
      
      {/* Match Information */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3">{match.title}</h3>
        
        <div className="flex flex-col space-y-4">
          {/* Team A */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {teamA.logoUrl ? (
                <Image 
                  src={teamA.logoUrl} 
                  alt={teamA.name} 
                  width={36} 
                  height={36} 
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="w-9 h-9 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-xs">
                  {teamA.shortName}
                </div>
              )}
              <span className="font-medium">{teamA.name}</span>
            </div>
            
            <div className="text-right">
              {teamAInnings && (
                <div>
                  <span className="font-semibold">{teamAInnings.totalRuns}</span>
                  <span className="text-gray-600">/{teamAInnings.wickets}</span>
                  <span className="text-gray-500 text-sm ml-1">
                    ({teamAInnings.overs} ov)
                  </span>
                </div>
              )}
            </div>
          </div>
          
          {/* Team B */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {teamB.logoUrl ? (
                <Image 
                  src={teamB.logoUrl} 
                  alt={teamB.name} 
                  width={36} 
                  height={36} 
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="w-9 h-9 bg-gray-200 rounded-full mr-3 flex items-center justify-center text-xs">
                  {teamB.shortName}
                </div>
              )}
              <span className="font-medium">{teamB.name}</span>
            </div>
            
            <div className="text-right">
              {teamBInnings && (
                <div>
                  <span className="font-semibold">{teamBInnings.totalRuns}</span>
                  <span className="text-gray-600">/{teamBInnings.wickets}</span>
                  <span className="text-gray-500 text-sm ml-1">
                    ({teamBInnings.overs} ov)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Match Status/Result */}
        {status === MatchStatus.COMPLETED && match.winner && (
          <div className="mt-4 py-2 px-3 bg-blue-50 text-blue-800 rounded-md text-sm">
            {match.winner.name} won by {
              match.winner.id === teamA.id ? 
                teamAInnings.totalRuns - teamBInnings.totalRuns + " runs" : 
                10 - teamBInnings.wickets + " wickets"
            }
          </div>
        )}
        
        {status === MatchStatus.LIVE && teamAInnings && (
          <div className="mt-4 text-sm">
            <p>
              <span className="font-semibold">Required:</span> {
                teamBInnings ? 
                  `${teamAInnings.totalRuns - teamBInnings.totalRuns + 1} runs from ${
                    Math.floor((30 - (Math.floor(teamBInnings.overs) * 6 + 
                    (teamBInnings.overs % 1) * 10)) / 6)}.${
                    (120 - (Math.floor(teamBInnings.overs) * 6 + 
                    (teamBInnings.overs % 1) * 10)) % 6} overs` :
                  '1st Innings is Playing'
              }
            </p>
            <p>
              <span className="font-semibold">Run Rate:</span> {
                teamBInnings ? 
                calculateRunRate(teamBInnings.totalRuns, teamBInnings.overs).toFixed(2) :
                calculateRunRate(teamAInnings.totalRuns, teamAInnings.overs).toFixed(2)
              }
            </p>
          </div>
        )}
        
        {/* Venue */}
        <div className="mt-4 text-sm text-gray-600">
          <p>{venue}</p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 px-4 py-3 border-t">
        <Link 
          href={`/cricket/matches/${match.id}`}
          className="text-orange-600 hover:text-orange-800 font-medium text-sm"
        >
          {status === MatchStatus.LIVE ? 'Watch Live' : 
           status === MatchStatus.COMPLETED ? 'View Scorecard' :
           'View Match Details'} →
        </Link>
      </div>
    </div>
  );
}
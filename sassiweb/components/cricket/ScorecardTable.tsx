// components/cricket/ScorecardTable.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Innings } from "@/lib/cricket/types";
import { calculateStrikeRate, calculateEconomyRate } from "@/lib/cricket/calculations";
import { formatOvers } from "@/lib/cricket/utils"; // Import from utils instead of calculations

interface ScorecardTableProps {
  innings: Innings;
}

export default function ScorecardTable({ innings }: ScorecardTableProps) {
  return (
    <Tabs defaultValue="batting" className="w-full">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="batting" className="flex-1">Batting</TabsTrigger>
        <TabsTrigger value="bowling" className="flex-1">Bowling</TabsTrigger>
      </TabsList>
      
      <TabsContent value="batting">
        <BattingTable innings={innings} />
      </TabsContent>
      
      <TabsContent value="bowling">
        <BowlingTable innings={innings} />
      </TabsContent>
    </Tabs>
  );
}

function BattingTable({ innings }: ScorecardTableProps) {
  // Sort batting order (usually by order of appearance)
  const battingPerformances = [...innings.batting].sort((a, b) => {
    // This is a simple sort by ID, but you could implement a more sophisticated
    // sort based on when players came to bat
    return a.id.localeCompare(b.id);
  });
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>
          Total: {innings.totalRuns}/{innings.wickets} ({formatOvers(innings.overs)})
          {innings.extras > 0 && ` • Extras: ${innings.extras}`}
        </TableCaption>
        
        <TableHeader>
          <TableRow>
            <TableHead>Batter</TableHead>
            <TableHead className="w-[100px]">Runs</TableHead>
            <TableHead className="w-[100px]">Balls</TableHead>
            <TableHead className="w-[80px]">4s</TableHead>
            <TableHead className="w-[80px]">6s</TableHead>
            <TableHead className="w-[80px]">SR</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {battingPerformances.map((performance) => (
            <TableRow key={performance.id}>
              <TableCell className="font-medium">
                <div>
                  <div>{performance.player.name}</div>
                  {performance.isOut && performance.dismissalType && (
                    <div className="text-xs text-gray-500">
                      {formatDismissalType(performance.dismissalType)}
                      {performance.dismissalInfo && ` ${performance.dismissalInfo}`}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{performance.runs}</TableCell>
              <TableCell>{performance.ballsFaced}</TableCell>
              <TableCell>{performance.fours}</TableCell>
              <TableCell>{performance.sixes}</TableCell>
              <TableCell>
                {calculateStrikeRate(performance.runs, performance.ballsFaced).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          
          {battingPerformances.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 h-24">
                No batting data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function BowlingTable({ innings }: ScorecardTableProps) {
  // Sort bowling performances (usually by overs bowled)
  const bowlingPerformances = [...innings.bowling].sort((a, b) => {
    return b.overs - a.overs;
  });
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bowler</TableHead>
            <TableHead className="w-[80px]">O</TableHead>
            <TableHead className="w-[80px]">M</TableHead>
            <TableHead className="w-[80px]">R</TableHead>
            <TableHead className="w-[80px]">W</TableHead>
            <TableHead className="w-[80px]">Econ</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {bowlingPerformances.map((performance) => (
            <TableRow key={performance.id}>
              <TableCell className="font-medium">
                {performance.player.name}
              </TableCell>
              <TableCell>{formatOvers(performance.overs)}</TableCell>
              <TableCell>{performance.maidens}</TableCell>
              <TableCell>{performance.runs}</TableCell>
              <TableCell>{performance.wickets}</TableCell>
              <TableCell>
                {calculateEconomyRate(performance.runs, performance.overs).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          
          {bowlingPerformances.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 h-24">
                No bowling data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper function to format dismissal type for display
function formatDismissalType(type: string): string {
  const dismissalMap: Record<string, string> = {
    BOWLED: "b",
    CAUGHT: "c",
    LBW: "lbw",
    RUN_OUT: "run out",
    STUMPED: "st",
    HIT_WICKET: "hit wicket",
    RETIRED_HURT: "retired hurt",
    OBSTRUCTING_FIELD: "obstructing field",
    TIMED_OUT: "timed out",
    HANDLED_BALL: "handled ball",
  };
  
  return dismissalMap[type] || type;
}
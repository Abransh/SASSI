// components/cricket/admin/MatchControl.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import BallInputForm from "@/components/cricket/admin/BallInputForm";
import { Match, Innings } from "@/lib/cricket/types";

interface MatchControlProps {
  match: Match;
}

export default function MatchControl({ match }: MatchControlProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("scoring");
  const [isLoading, setIsLoading] = useState(false);
  const [battingTeamId, setBattingTeamId] = useState<string>("");
  const [bowlingTeamId, setBowlingTeamId] = useState<string>("");
  const [currentInnings, setCurrentInnings] = useState<Innings | null>(null);
  const [currentOver, setCurrentOver] = useState(0);
  const [currentBall, setCurrentBall] = useState(1);
  
  // Determine if match can be started (must have both teams)
  const canStartMatch = match.teamA && match.teamB;
  
  // Determine if match is in progress
  const isMatchInProgress = match.status === "LIVE";
  
  // Determine if match is completed
  const isMatchCompleted = match.status === "COMPLETED";
  
  // Set current innings if match is in progress
  useEffect(() => {
    if (match.innings && match.innings.length > 0) {
      const latestInnings = match.innings[match.innings.length - 1];
      setCurrentInnings(latestInnings);
      
      // Calculate current over and ball
      if (latestInnings.overs) {
        const wholeOvers = Math.floor(latestInnings.overs);
        const partialBalls = Math.round((latestInnings.overs - wholeOvers) * 10);
        
        setCurrentOver(wholeOvers);
        setCurrentBall(partialBalls + 1);
        if (partialBalls >= 6) {
          setCurrentOver(wholeOvers + 1);
          setCurrentBall(1);
        }
      }
    }
  }, [match.innings]);
  
  // Start a new innings
  const startInnings = async () => {
    if (!battingTeamId || !bowlingTeamId) {
      toast.error("Please select batting and bowling teams");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/cricket/matches/${match.id}/innings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          battingTeamId,
          bowlingTeamId,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to start innings");
      }
      
      const innings = await response.json();
      setCurrentInnings(innings);
      setCurrentOver(0);
      setCurrentBall(1);
      
      toast.success("Innings started successfully");
      router.refresh();
      
    } catch (error) {
      console.error("Error starting innings:", error);
      toast.error("Failed to start innings");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Complete the match
  const completeMatch = async () => {
    setIsLoading(true);
    
    try {
      // Determine winner (basic logic - team with highest score wins)
      let winnerId = null;
      
      if (match.innings && match.innings.length > 0) {
        // Get total runs by team
        const teamRuns = new Map<string, number>();
        
        for (const innings of match.innings) {
          const currentRuns = teamRuns.get(innings.battingTeamId) || 0;
          teamRuns.set(innings.battingTeamId, currentRuns + innings.totalRuns);
        }
        
        // Find team with highest runs
        let highestRuns = 0;
        
        for (const [teamId, runs] of teamRuns.entries()) {
          if (runs > highestRuns) {
            highestRuns = runs;
            winnerId = teamId;
          }
        }
      }
      
      // Update match status to COMPLETED
      const response = await fetch(`/api/cricket/matches/${match.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "COMPLETED",
          winnerId,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to complete match");
      }
      
      toast.success("Match completed successfully");
      router.refresh();
      
    } catch (error) {
      console.error("Error completing match:", error);
      toast.error("Failed to complete match");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle ball added
  const handleBallAdded = () => {
    // Update current ball and over
    const isOverComplete = currentBall >= 6;

    setCurrentBall((prev) => {
      if (prev >= 6) {
        setCurrentOver((prevOver) => {
          if (prevOver % 2 === 1) {
            // After odd-numbered overs, inform about bowler + batsmen change
            toast.info("End of over! Batsmen switched automatically. Please select a new bowler.");
          } else {
            // After even-numbered overs, only inform about bowler change
            toast.info("End of over! Please select a new bowler.");
          }
          return prevOver + 1;
        });
        return 1;
      }
      return prev + 1;
    });
    router.refresh();
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Match Control</CardTitle>
        <CardDescription>
          {isMatchInProgress 
            ? `Managing ${match.teamA.name} vs ${match.teamB.name}` 
            : "Set up and start the match"}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="scoring">Ball-by-Ball Scoring</TabsTrigger>
          <TabsTrigger value="management">Match Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scoring" className="space-y-4 p-4">
          {isMatchCompleted ? (
            <div className="p-4 bg-blue-50 text-blue-800 rounded-md">
              This match is complete. No further scoring is possible.
            </div>
          ) : !isMatchInProgress ? (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
              Please start the match first using the Match Management tab.
            </div>
          ) : !currentInnings ? (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-md">
              Please start an innings first using the Match Management tab.
            </div>
          ) : (
            <BallInputForm 
              match={match}
              currentInningsId={currentInnings.id}
              currentOver={currentOver}
              currentBall={currentBall}
              onBallAdded={handleBallAdded}
            />
          )}
        </TabsContent>
        
        <TabsContent value="management" className="space-y-4 p-4">
          {!isMatchInProgress ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Start New Match</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select which team will bat first to begin the match.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="battingTeam">Batting Team</Label>
                  <Select
                    value={battingTeamId} 
                    onValueChange={setBattingTeamId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select batting team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={match.teamA.id}>{match.teamA.name}</SelectItem>
                      <SelectItem value={match.teamB.id}>{match.teamB.name}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bowlingTeam">Bowling Team</Label>
                  <Select
                    value={bowlingTeamId} 
                    onValueChange={setBowlingTeamId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select bowling team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={match.teamA.id}>{match.teamA.name}</SelectItem>
                      <SelectItem value={match.teamB.id}>{match.teamB.name}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button
                onClick={startInnings}
                disabled={!battingTeamId || !bowlingTeamId || battingTeamId === bowlingTeamId || isLoading}
                className="w-full mt-4"
              >
                {isLoading ? "Starting..." : "Start Match"}
              </Button>
              
              {battingTeamId === bowlingTeamId && battingTeamId && (
                <p className="text-sm text-red-600">
                  Batting and bowling teams must be different
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Current Match Status</h3>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">Status:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                    {match.status}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span className="font-medium">Current Innings:</span>
                  {currentInnings ? (
                    <div className="mt-1 text-sm">
                      <div>
                        <span className="font-medium">{currentInnings.battingTeam.name}</span>
                        <span className="text-gray-600"> batting</span>
                      </div>
                      <div>
                        <span className="font-medium">{currentInnings.totalRuns}/{currentInnings.wickets}</span>
                        <span className="text-gray-600"> ({currentInnings.overs} overs)</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-gray-600">No innings in progress</div>
                  )}
                </div>
                
                {match.innings && match.innings.length === 1 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-medium">Start Second Innings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="battingTeam">Batting Team</Label>
                        <Select
                          value={battingTeamId} 
                          onValueChange={setBattingTeamId}
                          defaultValue={match.innings[0].bowlingTeamId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select batting team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={match.teamA.id}>{match.teamA.name}</SelectItem>
                            <SelectItem value={match.teamB.id}>{match.teamB.name}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bowlingTeam">Bowling Team</Label>
                        <Select
                          value={bowlingTeamId} 
                          onValueChange={setBowlingTeamId}
                          defaultValue={match.innings[0].battingTeamId}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select bowling team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={match.teamA.id}>{match.teamA.name}</SelectItem>
                            <SelectItem value={match.teamB.id}>{match.teamB.name}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <Button
                      onClick={startInnings}
                      disabled={!battingTeamId || !bowlingTeamId || battingTeamId === bowlingTeamId || isLoading}
                      className="w-full mt-2"
                    >
                      {isLoading ? "Starting..." : "Start Second Innings"}
                    </Button>
                  </div>
                )}
                
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={completeMatch}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Completing..." : "Complete Match"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
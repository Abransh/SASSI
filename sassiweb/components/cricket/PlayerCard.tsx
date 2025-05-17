// components/cricket/PlayerCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayerRole } from "@/lib/cricket/types";

interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    role: PlayerRole;
    profileImageUrl?: string;
    team?: {
      id: string;
      name: string;
      shortName: string;
    };
  };
  stats?: {
    matches: number;
    innings: number;
    totalRuns: number;
    totalWickets: number;
    highestScore: number;
    bestBowling: string;
    battingAverage: string;
    strikeRate: string;
    economyRate: string;
  };
}

export default function PlayerCard({ player, stats }: PlayerCardProps) {
  // Role color mapping
  const roleColors: Record<PlayerRole, string> = {
    BATSMAN: "bg-blue-100 text-blue-800 border-blue-200",
    BOWLER: "bg-green-100 text-green-800 border-green-200",
    ALL_ROUNDER: "bg-purple-100 text-purple-800 border-purple-200",
    WICKET_KEEPER: "bg-orange-100 text-orange-800 border-orange-200",
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{player.name}</CardTitle>
            {player.team && (
              <CardDescription>{player.team.name}</CardDescription>
            )}
          </div>
          <Badge 
            variant="outline"
            className={roleColors[player.role]}
          >
            {formatRole(player.role)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <div className="w-20 h-20 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {player.profileImageUrl ? (
              <Image
                src={player.profileImageUrl}
                alt={player.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <span className="text-2xl font-bold text-gray-400">
                {player.name.charAt(0)}
              </span>
            )}
          </div>
          
          {stats && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <div className="text-gray-600">Matches:</div>
              <div className="font-medium text-right">{stats.matches}</div>
              
              {(player.role === PlayerRole.BATSMAN || player.role === PlayerRole.ALL_ROUNDER || player.role === PlayerRole.WICKET_KEEPER) && (
                <>
                  <div className="text-gray-600">Runs:</div>
                  <div className="font-medium text-right">{stats.totalRuns}</div>
                  
                  <div className="text-gray-600">Avg:</div>
                  <div className="font-medium text-right">{stats.battingAverage}</div>
                  
                  <div className="text-gray-600">SR:</div>
                  <div className="font-medium text-right">{stats.strikeRate}</div>
                </>
              )}
              
              {(player.role === PlayerRole.BOWLER || player.role === PlayerRole.ALL_ROUNDER) && (
                <>
                  <div className="text-gray-600">Wickets:</div>
                  <div className="font-medium text-right">{stats.totalWickets}</div>
                  
                  <div className="text-gray-600">Econ:</div>
                  <div className="font-medium text-right">{stats.economyRate}</div>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Link 
          href={`/cricket/players/${player.id}`}
          className="text-sm text-orange-600 hover:text-orange-800 font-medium"
        >
          View Full Profile →
        </Link>
      </CardFooter>
    </Card>
  );
}

// Helper function to format role for display
function formatRole(role: PlayerRole): string {
  switch (role) {
    case PlayerRole.BATSMAN:
      return "Batsman";
    case PlayerRole.BOWLER:
      return "Bowler";
    case PlayerRole.ALL_ROUNDER:
      return "All-Rounder";
    case PlayerRole.WICKET_KEEPER:
      return "Wicket-Keeper";
    default:
      return String(role).replace("_", " ");
  }
}
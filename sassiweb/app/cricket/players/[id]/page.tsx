// // app/cricket/players/[id]/page.tsx
// import { Metadata } from "next";
// import { notFound } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { getPlayer } from "@/lib/cricket/api";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import MobileMenu from "@/components/MobileMenu";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { formatRole } from "@/lib/cricket/utils";

// type Props = {
//   params: Promise<{ id: string }>;
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   try {
//     const resolvedParams = await params;
//     const player = await getPlayer(resolvedParams.id);
    
//     return {
//       title: `${player.name} | SASSI Cricket`,
//       description: `View cricket statistics and profile for ${player.name}`,
//     };
//   } catch (error) {
//     return {
//       title: "Player Profile | SASSI Cricket",
//       description: "Cricket player statistics and information",
//     };
//   }
// }

// export default async function PlayerProfilePage({ params }: Props) {
//   try {
//     const resolvedParams = await params;
//     const player = await getPlayer(resolvedParams.id);
//     const { stats } = player;
    
//     // Role color
//     const getRoleColor = (role: string) => {
//       switch (role) {
//         case "BATSMAN":
//           return "bg-blue-100 text-blue-800 border-blue-200";
//         case "BOWLER":
//           return "bg-green-100 text-green-800 border-green-200";
//         case "ALL_ROUNDER":
//           return "bg-purple-100 text-purple-800 border-purple-200";
//         case "WICKET_KEEPER":
//           return "bg-orange-100 text-orange-800 border-orange-200";
//         default:
//           return "bg-gray-100 text-gray-800 border-gray-200";
//       }
//     };
    
//     return (
//       <main className="min-h-screen bg-gray-50">
//         <Header />
//         <MobileMenu />

//         <section className="pt-32 pb-20">
//           <div className="container mx-auto px-4">
//             <div className="max-w-7xl mx-auto">
//               {/* Player Header */}
//               <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
//                 <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
//                   {/* Player Image */}
//                   <div className="w-32 h-32 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
//                     {player.profileImageUrl ? (
//                       <Image
//                         src={player.profileImageUrl}
//                         alt={player.name}
//                         fill
//                         sizes="128px"
//                         className="object-cover"
//                       />
//                     ) : (
//                       <span className="text-4xl font-bold text-gray-400">
//                         {player.name.charAt(0)}
//                       </span>
//                     )}
//                   </div>
                  
//                   {/* Player Info */}
//                   <div className="text-center md:text-left flex-1">
//                     <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
//                       <h1 className="text-2xl md:text-3xl font-bold">{player.name}</h1>
//                       <Badge 
//                         variant="outline"
//                         className={getRoleColor(player.role)}
//                       >
//                         {formatRole(player.role)}
//                       </Badge>
//                     </div>
                    
//                     <p className="text-gray-600 mb-4">
//                       Team: <Link href="#" className="text-orange-600 hover:underline">{player.team.name}</Link>
//                     </p>
                    
//                     {/* Quick Stats */}
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                       <div className="bg-gray-50 p-3 rounded-md text-center">
//                         <div className="text-sm text-gray-600">Matches</div>
//                         <div className="text-xl font-bold">{stats.matches}</div>
//                       </div>
                      
//                       {(player.role === 'BATSMAN' || player.role === 'ALL_ROUNDER' || player.role === 'WICKET_KEEPER') && (
//                         <>
//                           <div className="bg-gray-50 p-3 rounded-md text-center">
//                             <div className="text-sm text-gray-600">Runs</div>
//                             <div className="text-xl font-bold">{stats.totalRuns}</div>
//                           </div>
                          
//                           <div className="bg-gray-50 p-3 rounded-md text-center">
//                             <div className="text-sm text-gray-600">Average</div>
//                             <div className="text-xl font-bold">{stats.battingAverage}</div>
//                           </div>
//                         </>
//                       )}
                      
//                       {(player.role === 'BOWLER' || player.role === 'ALL_ROUNDER') && (
//                         <>
//                           <div className="bg-gray-50 p-3 rounded-md text-center">
//                             <div className="text-sm text-gray-600"></div>
//                             {/* app/cricket/players/[id]/page.tsx (continued) */}
//                             <div className="text-sm text-gray-600">Wickets</div>
//                             <div className="text-xl font-bold">{stats.totalWickets}</div>
//                           </div>
                          
//                           <div className="bg-gray-50 p-3 rounded-md text-center">
//                             <div className="text-sm text-gray-600">Economy</div>
//                             <div className="text-xl font-bold">{stats.economyRate}</div>
//                           </div>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Detailed Stats */}
//               <div className="bg-white rounded-lg shadow-md overflow-hidden">
//                 <Tabs defaultValue="batting" className="w-full">
//                   <TabsList className="w-full border-b rounded-none p-0">
//                     <TabsTrigger 
//                       value="batting" 
//                       className="flex-1 rounded-none"
//                       disabled={player.role === 'BOWLER'}
//                     >
//                       Batting Stats
//                     </TabsTrigger>
//                     <TabsTrigger 
//                       value="bowling" 
//                       className="flex-1 rounded-none"
//                       disabled={player.role === 'BATSMAN' || player.role === 'WICKET_KEEPER'}
//                     >
//                       Bowling Stats
//                     </TabsTrigger>
//                     <TabsTrigger value="matches" className="flex-1 rounded-none">
//                       Match History
//                     </TabsTrigger>
//                   </TabsList>
                  
//                   <TabsContent value="batting" className="p-6">
//                     {player.batting.length > 0 ? (
//                       <>
//                         {/* Batting Summary */}
//                         <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Matches</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.innings}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Runs</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.totalRuns}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Average</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.battingAverage}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Strike Rate</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.strikeRate}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Highest Score</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.highestScore}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">4s</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.totalFours}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">6s</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.totalSixes}</p>
//                             </CardContent>
//                           </Card>
//                         </div>
                        
//                         {/* Batting Innings Table */}
//                         <div className="rounded-md border overflow-hidden">
//                           <Table>
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Match</TableHead>
//                                 <TableHead>Against</TableHead>
//                                 <TableHead className="text-right">Runs</TableHead>
//                                 <TableHead className="text-right">Balls</TableHead>
//                                 <TableHead className="text-right">4s</TableHead>
//                                 <TableHead className="text-right">6s</TableHead>
//                                 <TableHead className="text-right">SR</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {player.batting.map((innings: any) => {
//                                 const match = innings.innings.match;
//                                 const opponent = innings.innings.bowlingTeam;
//                                 const strikeRate = innings.ballsFaced > 0 
//                                   ? ((innings.runs / innings.ballsFaced) * 100).toFixed(2) 
//                                   : "0.00";
                                
//                                 return (
//                                   <TableRow key={innings.id}>
//                                     <TableCell>
//                                       <Link 
//                                         href={`/cricket/matches/${match.id}`}
//                                         className="text-orange-600 hover:underline"
//                                       >
//                                         {match.title}
//                                       </Link>
//                                     </TableCell>
//                                     <TableCell>{opponent && opponent.name ? opponent.name: 'unknown'}</TableCell>
//                                     <TableCell className="text-right font-medium">
//                                       {innings.runs}
//                                       {innings.isOut ? "" : "*"}
//                                     </TableCell>
//                                     <TableCell className="text-right">{innings.ballsFaced}</TableCell>
//                                     <TableCell className="text-right">{innings.fours}</TableCell>
//                                     <TableCell className="text-right">{innings.sixes}</TableCell>
//                                     <TableCell className="text-right">{strikeRate}</TableCell>
//                                   </TableRow>
//                                 );
//                               })}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-center py-8">
//                         <p className="text-gray-500">No batting stats available</p>
//                       </div>
//                     )}
//                   </TabsContent>
                  
//                   <TabsContent value="bowling" className="p-6">
//                     {player.bowling.length > 0 ? (
//                       <>
//                         {/* Bowling Summary */}
//                         <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Matches</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{player.bowling.length}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Wickets</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.totalWickets}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Economy</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.economyRate}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Average</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.bowlingAverage}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Best Bowling</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.bestBowling}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Maidens</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">{stats.totalMaidens}</p>
//                             </CardContent>
//                           </Card>
                          
//                           <Card>
//                             <CardHeader className="pb-2">
//                               <CardTitle className="text-xl">Dot Balls</CardTitle>
//                             </CardHeader>
//                             <CardContent>
//                               <p className="text-3xl font-bold">-</p>
//                             </CardContent>
//                           </Card>
//                         </div>
                        
//                         {/* Bowling Innings Table */}
//                         <div className="rounded-md border overflow-hidden">
//                           <Table>
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Match</TableHead>
//                                 <TableHead>Against</TableHead>
//                                 <TableHead className="text-right">Overs</TableHead>
//                                 <TableHead className="text-right">Maidens</TableHead>
//                                 <TableHead className="text-right">Runs</TableHead>
//                                 <TableHead className="text-right">Wickets</TableHead>
//                                 <TableHead className="text-right">Economy</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {player.bowling.map((innings: any) => {
//                                 const match = innings.innings.match;
//                                 const opponent = innings.innings.battingTeam;
//                                 const economy = innings.overs > 0 
//                                   ? (innings.runs / innings.overs).toFixed(2) 
//                                   : "0.00";
                                
//                                 return (
//                                   <TableRow key={innings.id}>
//                                     <TableCell>
//                                       <Link 
//                                         href={`/cricket/matches/${match.id}`}
//                                         className="text-orange-600 hover:underline"
//                                       >
//                                         {match.title}
//                                       </Link>
//                                     </TableCell>
//                                     <TableCell>{opponent.name}</TableCell>
//                                     <TableCell className="text-right">{innings.overs.toFixed(1)}</TableCell>
//                                     <TableCell className="text-right">{innings.maidens}</TableCell>
//                                     <TableCell className="text-right">{innings.runs}</TableCell>
//                                     <TableCell className="text-right font-medium">{innings.wickets}</TableCell>
//                                     <TableCell className="text-right">{economy}</TableCell>
//                                   </TableRow>
//                                 );
//                               })}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-center py-8">
//                         <p className="text-gray-500">No bowling stats available</p>
//                       </div>
//                     )}
//                   </TabsContent>
                  
//                   <TabsContent value="matches" className="p-6">
//                     {stats.matches > 0 ? (
//                       <div className="rounded-md border overflow-hidden">
//                         <Table>
//                           <TableHeader>
//                             <TableRow>
//                               <TableHead>Match</TableHead>
//                               <TableHead>Date</TableHead>
//                               <TableHead>Teams</TableHead>
//                               <TableHead>Result</TableHead>
//                             </TableRow>
//                           </TableHeader>
//                           <TableBody>
//                             {/* We'd need to refactor the API to include matches here */}
//                             <TableRow>
//                               <TableCell colSpan={4} className="text-center py-8">
//                                 <p className="text-gray-500">Match history not available</p>
//                               </TableCell>
//                             </TableRow>
//                           </TableBody>
//                         </Table>
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <p className="text-gray-500">No matches available</p>
//                       </div>
//                     )}
//                   </TabsContent>
//                 </Tabs>
//               </div>
//             </div>
//           </div>
//         </section>

//         <Footer />
//       </main>
//     );
//   } catch (error) {
//     console.error("Error in PlayerProfilePage:", error);
//     notFound();
//   }
// }



// app/cricket/players/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPlayer } from "@/lib/cricket/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileMenu from "@/components/MobileMenu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRole } from "@/lib/cricket/utils";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
   const player = await getPlayer(resolvedParams.id);
    
    if (!player) {
      return {
        title: "Player Not Found | SASSI Cricket",
        description: "The requested player could not be found",
      };
    }
    
    return {
      title: `${player.name || 'Unknown Player'} | SASSI Cricket`,
      description: `View cricket statistics and profile for ${player.name || 'this player'}`,
    };
  } catch (error) {
    console.error("Error generating metadata for player:", error);
    return {
      title: "Player Profile | SASSI Cricket",
      description: "Cricket player statistics and information",
    };
  }
}

export default async function PlayerProfilePage({ params }: Props) {
  try {
    const resolvedParams = await params;
    const player = await getPlayer(resolvedParams.id);
        
    
    if (!player) {
      notFound();
    }
    
    const { stats } = player;
    
    // Safe access to team information
    const teamName = player.team?.name || "No Team";
    const teamId = player.team?.id || "";
    
    // Role color mapping with safety check
    const getRoleColor = (role: string) => {
      switch (role) {
        case "BATSMAN":
          return "bg-blue-100 text-blue-800 border-blue-200";
        case "BOWLER":
          return "bg-green-100 text-green-800 border-green-200";
        case "ALL_ROUNDER":
          return "bg-purple-100 text-purple-800 border-purple-200";
        case "WICKET_KEEPER":
          return "bg-orange-100 text-orange-800 border-orange-200";
        default:
          return "bg-gray-100 text-gray-800 border-gray-200";
      }
    };
    
    // Safe batting data with null checks
    const safeBattingData = (player.batting || []).filter((batting : any) => 
      batting && batting.innings && batting.innings.match
    );
    
    // Safe bowling data with null checks
    const safeBowlingData = (player.bowling || []).filter((bowling : any) => 
      bowling && bowling.innings && bowling.innings.match
    );
    
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <MobileMenu />

        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Player Header */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Player Image */}
                  <div className="w-32 h-32 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {player.profileImageUrl ? (
                      <Image
                        src={player.profileImageUrl}
                        alt={player.name || "Player"}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-4xl font-bold text-gray-400">
                        {(player.name || "?").charAt(0)}
                      </span>
                    )}
                  </div>
                  
                  {/* Player Info */}
                  <div className="text-center md:text-left flex-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                      <h1 className="text-2xl md:text-3xl font-bold">
                        {player.name || "Unknown Player"}
                      </h1>
                      <Badge 
                        variant="outline"
                        className={getRoleColor(player.role || "")}
                      >
                        {formatRole(player.role || "")}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-4">
                      Team: {teamId ? (
                        <Link href="#" className="text-orange-600 hover:underline">
                          {teamName}
                        </Link>
                      ) : (
                        <span>{teamName}</span>
                      )}
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="bg-gray-50 p-3 rounded-md text-center">
                        <div className="text-sm text-gray-600">Matches</div>
                        <div className="text-xl font-bold">{stats?.matches || 0}</div>
                      </div>
                      
                      {(player.role === 'BATSMAN' || player.role === 'ALL_ROUNDER' || player.role === 'WICKET_KEEPER') && (
                        <>
                          <div className="bg-gray-50 p-3 rounded-md text-center">
                            <div className="text-sm text-gray-600">Runs</div>
                            <div className="text-xl font-bold">{stats?.totalRuns || 0}</div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md text-center">
                            <div className="text-sm text-gray-600">Runs</div>
                            <div className="text-xl font-bold">{stats?.totalRuns || 0}</div>
                          </div>
                        </>
                      )}
                      
                      {(player.role === 'BOWLER' || player.role === 'ALL_ROUNDER') && (
                        <>
                          <div className="bg-gray-50 p-3 rounded-md text-center">
                            <div className="text-sm text-gray-600">Wickets</div>
                            <div className="text-xl font-bold">{stats?.totalWickets || 0}</div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-md text-center">
                            <div className="text-sm text-gray-600">Runs</div>
                            <div className="text-xl font-bold">{stats?.totalRuns || 0}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Detailed Stats */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Tabs defaultValue="batting" className="w-full">
                  <TabsList className="w-full border-b rounded-none p-0">
                    <TabsTrigger 
                      value="batting" 
                      className="flex-1 rounded-none"
                      // disabled={player.role === 'BOWLER'}
                    >
                      Batting Stats
                    </TabsTrigger>
                    <TabsTrigger 
                      value="bowling" 
                      className="flex-1 rounded-none"
                      // disabled={player.role === 'BATSMAN' || player.role === 'WICKET_KEEPER'}
                    >
                      Bowling Stats
                    </TabsTrigger>
                    <TabsTrigger value="matches" className="flex-1 rounded-none">
                      Match History
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="batting" className="p-6">
                    {safeBattingData.length > 0 ? (
                      <>
                        {/* Batting Summary */}
                        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Matches</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.innings || 0}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Runs</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.totalRuns || 0}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Average</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.battingAverage || "0.00"}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Strike Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.strikeRate || "0.00"}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Highest Score</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.highestScore || 0}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">4s</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.totalFours || 0}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">6s</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.totalSixes || 0}</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Batting Innings Table */}
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Match</TableHead>
                                <TableHead>Against</TableHead>
                                <TableHead className="text-right">Runs</TableHead>
                                <TableHead className="text-right">Balls</TableHead>
                                <TableHead className="text-right">4s</TableHead>
                                <TableHead className="text-right">6s</TableHead>
                                <TableHead className="text-right">SR</TableHead>
                              </TableRow>
                            </TableHeader>
                            
                            <TableBody>
                              {safeBattingData.map((innings: any) => {
                                // Safe access to nested properties
                                const match = innings.innings?.match;
                                const opponent = innings.innings?.bowlingTeam;
                                
                                if (!match) return null; // Skip if match data is missing
                                
                                const strikeRate = (innings.ballsFaced || 0) > 0 
                                  ? (((innings.runs || 0) / innings.ballsFaced) * 100).toFixed(2) 
                                  : "0.00";
                                
                                return (
                                  <TableRow key={innings.id}>
                                    <TableCell>
                                      <Link 
                                        href={`/cricket/matches/${match.id}`}
                                        className="text-orange-600 hover:underline"
                                      >
                                        {match.title || "Unknown Match"}
                                      </Link>
                                    </TableCell>
                                    <TableCell>{opponent?.name || "Unknown Team"}</TableCell>
                                    <TableCell className="text-right font-medium">
                                      {innings.runs || 0}
                                      {!innings.isOut ? "*" : ""}
                                    </TableCell>
                                    <TableCell className="text-right">{innings.ballsFaced || 0}</TableCell>
                                    <TableCell className="text-right">{innings.fours || 0}</TableCell>
                                    <TableCell className="text-right">{innings.sixes || 0}</TableCell>
                                    <TableCell className="text-right">{strikeRate}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No batting stats available</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="bowling" className="p-6">
                    {safeBowlingData.length > 0 ? (
                      <>
                        {/* Bowling Summary */}
                        <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Matches</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{safeBowlingData.length}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Wickets</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.totalWickets || 0}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Economy</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.economyRate || "0.00"}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Average</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.bowlingAverage || "0.00"}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Best Bowling</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.bestBowling || "0/0"}</p>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-xl">Maidens</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-3xl font-bold">{stats?.totalMaidens || 0}</p>
                            </CardContent>
                          </Card>
                        </div>
                        
                        {/* Bowling Innings Table */}
                        <div className="rounded-md border overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Match</TableHead>
                                <TableHead>Against</TableHead>
                                <TableHead className="text-right">Overs</TableHead>
                                <TableHead className="text-right">Maidens</TableHead>
                                <TableHead className="text-right">Runs</TableHead>
                                <TableHead className="text-right">Wickets</TableHead>
                                <TableHead className="text-right">Economy</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {safeBowlingData.map((innings: any) => {
                                const match = innings.innings?.match;
                                const opponent = innings.innings?.battingTeam;
                                
                                if (!match) return null; // Skip if match data is missing
                                
                                const economy = (innings.overs || 0) > 0 
                                  ? ((innings.runs || 0) / innings.overs).toFixed(2) 
                                  : "0.00";
                                
                                return (
                                  <TableRow key={innings.id}>
                                    <TableCell>
                                      <Link 
                                        href={`/cricket/matches/${match.id}`}
                                        className="text-orange-600 hover:underline"
                                      >
                                        {match.title || "Unknown Match"}
                                      </Link>
                                    </TableCell>
                                    <TableCell>{opponent?.name || "Unknown Team"}</TableCell>
                                    <TableCell className="text-right">
                                      {(innings.overs || 0).toFixed(1)}
                                    </TableCell>
                                    <TableCell className="text-right">{innings.maidens || 0}</TableCell>
                                    <TableCell className="text-right">{innings.runs || 0}</TableCell>
                                    <TableCell className="text-right font-medium">{innings.wickets || 0}</TableCell>
                                    <TableCell className="text-right">{economy}</TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No bowling stats available</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="matches" className="p-6">
                    {(stats?.matches || 0) > 0 ? (
                      <div className="rounded-md border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Match</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Teams</TableHead>
                              <TableHead>Result</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={4} className="text-center py-8">
                                <p className="text-gray-500">Match history not available</p>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No matches available</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  } catch (error) {
    console.error("Error in PlayerProfilePage:", error);
    notFound();
  }
}
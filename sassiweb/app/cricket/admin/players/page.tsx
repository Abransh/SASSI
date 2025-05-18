// app/cricket/admin/players/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, UserPlus, RefreshCw, UserCheck } from "lucide-react";
import { toast } from "sonner";
import { PlayerRole } from "@/lib/cricket/types";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";

// Player type definition
interface Player {
  id: string;
  name: string;
  role: string;
  teamId: string;
  profileImageUrl?: string;
  team?: {
    id: string;
    name: string;
    shortName: string;
  };
}

// Team type definition
interface Team {
  id: string;
  name: string;
  shortName: string;
}

export default function AdminPlayersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    teamId: "",
    profileImageUrl: "",
  });
  
  // Check authentication
  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/signin?callbackUrl=/cricket/admin/players");
    } else {
      fetchPlayers();
      fetchTeams();
    }
  }, [session, status, router]);
  
  // Fetch players
  const fetchPlayers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cricket/players");
      if (!response.ok) {
        throw new Error("Failed to fetch players");
      }
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Error fetching players:", error);
      toast.error("Failed to load players");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch teams
  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/cricket/teams");
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch teams: ${response.status}`, errorText);
        throw new Error(`Failed to fetch teams: ${response.status}`);
      }
      const data = await response.json();
      console.log("Teams fetched:", data); // Debug log
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to load teams");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle adding a new player
  const handleAddPlayer = async () => {
    try {
      // Validate form data
      if (!formData.name || !formData.role || !formData.teamId) {
        toast.error("Name, role, and team are required");
        return;
      }
      
      const response = await fetch("/api/cricket/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add player");
      }
      const newPlayer = await response.json();
    toast.success("Player added successfully");
    setIsAddDialogOpen(false);
    resetForm();
    
    // Update players list without full refetch
    setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
  } catch (error) {
    console.error("Error adding player:", error);
    toast.error(error instanceof Error ? error.message : "Failed to add player");
  }
};
  
  // Handle updating a player
  const handleUpdatePlayer = async () => {
    if (!currentPlayer) return;
    
    try {
      const response = await fetch(`/api/cricket/players/${currentPlayer.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update player");
      }
      
      toast.success("Player updated successfully");
      setIsEditDialogOpen(false);
      resetForm();
      fetchPlayers();
    } catch (error) {
      console.error("Error updating player:", error);
      toast.error("Failed to update player");
    }
  };
  
  // Handle deleting a player
  const handleDeletePlayer = async () => {
    if (!currentPlayer) return;
    
    try {
      const response = await fetch(`/api/cricket/players/${currentPlayer.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete player");
      }
      
      toast.success("Player deleted successfully");
      setIsDeleteDialogOpen(false);
      fetchPlayers();
    } catch (error) {
      console.error("Error deleting player:", error);
      toast.error("Failed to delete player");
    }
  };
  
  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      teamId: "",
      profileImageUrl: "",
    });
  };
  
  // Open edit dialog with player data
  const openEditDialog = (player: Player) => {
    setCurrentPlayer(player);
    setFormData({
      name: player.name,
      role: player.role,
      teamId: player.teamId,
      profileImageUrl: player.profileImageUrl || "",
    });
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (player: Player) => {
    setCurrentPlayer(player);
    setIsDeleteDialogOpen(true);
  };
  
  // Filter players based on search query
  const filteredPlayers = players.filter(player => 
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (player.team?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group players by team
  const playersByTeam = filteredPlayers.reduce((acc, player) => {
    const teamId = player.teamId;
    if (!acc[teamId]) {
      acc[teamId] = [];
    }
    acc[teamId].push(player);
    return acc;
  }, {} as Record<string, Player[]>);
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <MobileMenu />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Manage Cricket Players</h1>
                <p className="text-gray-600">
                  Add, edit, and delete players for cricket matches
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => fetchPlayers()}
                  variant="outline"
                  size="icon"
                  title="Refresh"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Player
                </Button>
              </div>
            </div>
            
            {/* Search and filter */}
            <div className="mb-6">
              <Input
                placeholder="Search players or teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            {/* Players display */}
            <Tabs defaultValue="list" className="bg-white rounded-lg shadow-md overflow-hidden">
              <TabsList className="p-0 bg-gray-100 border-b">
                <TabsTrigger value="list" className="py-3 px-6">List View</TabsTrigger>
                <TabsTrigger value="team" className="py-3 px-6">Team View</TabsTrigger>
              </TabsList>
              
              {/* List View */}
              <TabsContent value="list" className="p-6">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : filteredPlayers.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No players found</p>
                    <Button 
                      variant="link" 
                      onClick={() => setIsAddDialogOpen(true)}
                      className="mt-2"
                    >
                      Add your first player
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Player</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Team</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPlayers.map((player) => (
                          <TableRow key={player.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                  {player.profileImageUrl ? (
                                    <Image
                                      src={player.profileImageUrl}
                                      alt={player.name}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <span className="text-lg font-bold text-gray-400">
                                      {player.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <div className="font-medium">{player.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {formatRole(player.role)}
                              </div>
                            </TableCell>
                            <TableCell>
                              {player.team?.name || "No Team"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditDialog(player)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => openDeleteDialog(player)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
              
              {/* Team View */}
              <TabsContent value="team" className="p-6">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
                  </div>
                ) : Object.keys(playersByTeam).length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No players found</p>
                    <Button 
                      variant="link" 
                      onClick={() => setIsAddDialogOpen(true)}
                      className="mt-2"
                    >
                      Add your first player
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {teams.map((team) => {
                      const teamPlayers = playersByTeam[team.id] || [];
                      if (teamPlayers.length === 0) return null;
                      
                      return (
                        <Card key={team.id}>
                          <CardHeader>
                            <CardTitle>{team.name}</CardTitle>
                            <CardDescription>
                              {teamPlayers.length} player{teamPlayers.length !== 1 ? 's' : ''}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {teamPlayers.map((player) => (
                                <div 
                                  key={player.id} 
                                  className="flex items-center justify-between p-3 border rounded-md"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                      {player.profileImageUrl ? (
                                        <Image
                                          src={player.profileImageUrl}
                                          alt={player.name}
                                          fill
                                          className="object-cover"
                                        />
                                      ) : (
                                        <span className="text-lg font-bold text-gray-400">
                                          {player.name.charAt(0)}
                                        </span>
                                      )}
                                    </div>
                                    <div>
                                      <div className="font-medium">{player.name}</div>
                                      <div className="text-xs text-gray-500">
                                        {formatRole(player.role)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => openEditDialog(player)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-red-500 hover:text-red-700"
                                      onClick={() => openDeleteDialog(player)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Add Player Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Player</DialogTitle>
            <DialogDescription>
              Enter the details of the new cricket player.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Player Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Player Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PlayerRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {formatRole(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="team">Team</Label>
              <Select 
                value={formData.teamId} 
                onValueChange={(value) => setFormData({ ...formData, teamId: value })}
              >
                <SelectTrigger id="team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profileImageUrl">Profile Image URL (Optional)</Label>
              <Input
                id="profileImageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.profileImageUrl}
                onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPlayer}>
              <UserCheck className="mr-2 h-4 w-4" />
              Add Player
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Player Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Player</DialogTitle>
            <DialogDescription>
              Update the details of the selected player.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Player Name</Label>
              <Input
                id="edit-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Player Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(PlayerRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {formatRole(role)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-team">Team</Label>
              <Select 
                value={formData.teamId} 
                onValueChange={(value) => setFormData({ ...formData, teamId: value })}
              >
                <SelectTrigger id="edit-team">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-profileImageUrl">Profile Image URL (Optional)</Label>
              <Input
                id="edit-profileImageUrl"
                placeholder="https://example.com/image.jpg"
                value={formData.profileImageUrl}
                onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePlayer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Player Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the player
              {currentPlayer && <strong> {currentPlayer.name}</strong>} and remove their
              data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePlayer}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

// Helper function to format role for display
function formatRole(role: string): string {
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
      return role.replace("_", " ");
  }
}
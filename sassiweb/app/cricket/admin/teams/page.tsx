// app/cricket/admin/teams/page.tsx
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pencil, 
  Trash2, 
  RefreshCw, 
  PlusCircle, 
  Users, 
  Check, 
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";
import Footer from "@/components/Footer";

// Team type definition
interface Team {
  id: string;
  name: string;
  shortName: string;
  logoUrl?: string;
  playerCount?: number;
  createdAt: string;
  updatedAt: string;
  players?: Player[];
}

// Player type definition for team players
interface Player {
  id: string;
  name: string;
  role: string;
  profileImageUrl?: string;
}

export default function AdminTeamsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // States
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    logoUrl: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    shortName: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // Check authentication
  useEffect(() => {
    if (status === "loading") return;
    
    if (!session || session.user.role !== "ADMIN") {
      router.push("/auth/signin?callbackUrl=/cricket/admin/teams");
    } else {
      fetchTeams();
    }
  }, [session, status, router]);
  
  // Fetch teams
  const fetchTeams = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cricket/teams");
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Error fetching teams:", error);
      toast.error("Failed to load teams");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Validate form data
  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: "",
      shortName: "",
    };
    
    if (!formData.name.trim()) {
      errors.name = "Team name is required";
      isValid = false;
    }
    
    if (!formData.shortName.trim()) {
      errors.shortName = "Short name is required";
      isValid = false;
    } else if (formData.shortName.length > 5) {
      errors.shortName = "Short name must be 5 characters or less";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Handle adding a new team
  const handleAddTeam = async () => {
    if (!validateForm()) return;
    
    setSubmitLoading(true);
    try {
      const response = await fetch("/api/cricket/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add team");
      }
      
      toast.success("Team added successfully");
      setIsAddDialogOpen(false);
      resetForm();
      fetchTeams();
    } catch (error) {
      console.error("Error adding team:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add team");
    } finally {
      setSubmitLoading(false);
    }
  };
  
  // Handle updating a team
  const handleUpdateTeam = async () => {
    if (!currentTeam || !validateForm()) return;
    
    setSubmitLoading(true);
    try {
      const response = await fetch(`/api/cricket/teams/${currentTeam.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update team");
      }
      
      toast.success("Team updated successfully");
      setIsEditDialogOpen(false);
      resetForm();
      fetchTeams();
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update team");
    } finally {
      setSubmitLoading(false);
    }
  };
  
  // Handle deleting a team
  const handleDeleteTeam = async () => {
    if (!currentTeam) return;
    
    setSubmitLoading(true);
    try {
      const response = await fetch(`/api/cricket/teams/${currentTeam.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete team");
      }
      
      toast.success("Team deleted successfully");
      setIsDeleteDialogOpen(false);
      fetchTeams();
    } catch (error) {
      console.error("Error deleting team:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete team");
    } finally {
      setSubmitLoading(false);
    }
  };
  
  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      shortName: "",
      logoUrl: "",
    });
    setFormErrors({
      name: "",
      shortName: "",
    });
  };
  
  // Open edit dialog with team data
  const openEditDialog = (team: Team) => {
    setCurrentTeam(team);
    setFormData({
      name: team.name,
      shortName: team.shortName,
      logoUrl: team.logoUrl || "",
    });
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (team: Team) => {
    setCurrentTeam(team);
    setIsDeleteDialogOpen(true);
  };
  
  // Navigate to manage team players
  const navigateToManagePlayers = () => {
    router.push("/cricket/admin/players");
  };
  
  // Filter teams based on search query
  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
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
                <h1 className="text-3xl font-bold mb-2">Manage Cricket Teams</h1>
                <p className="text-gray-600">
                  Add, edit, and delete teams for cricket matches
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => fetchTeams()}
                  variant="outline"
                  size="icon"
                  title="Refresh"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
                
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Team
                </Button>
                
                <Button onClick={navigateToManagePlayers} variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Players
                </Button>
              </div>
            </div>
            
            {/* Search */}
            <div className="mb-6">
              <Input
                placeholder="Search teams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            {/* Teams display */}
            <Tabs defaultValue="grid" className="bg-white rounded-lg shadow-md overflow-hidden">
              <TabsList className="p-0 bg-gray-100 border-b">
                <TabsTrigger value="grid" className="py-3 px-6">Grid View</TabsTrigger>
                <TabsTrigger value="list" className="py-3 px-6">List View</TabsTrigger>
              </TabsList>
              
              {/* Grid View */}
              <TabsContent value="grid" className="p-6">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                  </div>
                ) : filteredTeams.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No teams found</p>
                    <Button 
                      variant="link" 
                      onClick={() => setIsAddDialogOpen(true)}
                      className="mt-2"
                    >
                      Add your first team
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team) => (
                      <Card key={team.id} className="flex flex-col">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                {team.logoUrl ? (
                                  <Image
                                    src={team.logoUrl}
                                    alt={team.name}
                                    fill
                                    className="object-cover"
                                  />
                                ) : (
                                  <span className="text-lg font-bold text-gray-400">
                                    {team.shortName}
                                  </span>
                                )}
                              </div>
                              <div>
                                <CardTitle>{team.name}</CardTitle>
                                <CardDescription className="mt-1">
                                  {team.shortName}
                                </CardDescription>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4" />
                              <span>
                                {team.playerCount || team.players?.length || 0} player{(team.playerCount || team.players?.length || 0) !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t mt-auto pt-4 flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => openEditDialog(team)}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => openDeleteDialog(team)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* List View */}
              <TabsContent value="list" className="p-6">
                {isLoading ? (
                  <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                  </div>
                ) : filteredTeams.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No teams found</p>
                    <Button 
                      variant="link" 
                      onClick={() => setIsAddDialogOpen(true)}
                      className="mt-2"
                    >
                      Add your first team
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Team</TableHead>
                          <TableHead>Short Name</TableHead>
                          <TableHead>Players</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTeams.map((team) => (
                          <TableRow key={team.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 relative rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                  {team.logoUrl ? (
                                    <Image
                                      src={team.logoUrl}
                                      alt={team.name}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <span className="text-lg font-bold text-gray-400">
                                      {team.shortName}
                                    </span>
                                  )}
                                </div>
                                <div className="font-medium">{team.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {team.shortName}
                              </div>
                            </TableCell>
                            <TableCell>
                              {team.playerCount || team.players?.length || 0}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openEditDialog(team)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => openDeleteDialog(team)}
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
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Add Team Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Team</DialogTitle>
            <DialogDescription>
              Enter the details of the new cricket team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                placeholder="Mumbai Indians"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="shortName">Short Name</Label>
              <Input
                id="shortName"
                placeholder="MI"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                maxLength={5}
              />
              {formErrors.shortName && (
                <p className="text-sm text-red-500">{formErrors.shortName}</p>
              )}
              <p className="text-xs text-gray-500">
                Maximum 5 characters, used for abbreviations and logo
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logoUrl">Logo URL (Optional)</Label>
              <Input
                id="logoUrl"
                placeholder="https://example.com/logo.jpg"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTeam} disabled={submitLoading}>
              {submitLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              Add Team
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Team Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              Update the details of the selected team.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Team Name</Label>
              <Input
                id="edit-name"
                placeholder="Mumbai Indians"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {formErrors.name && (
                <p className="text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-shortName">Short Name</Label>
              <Input
                id="edit-shortName"
                placeholder="MI"
                value={formData.shortName}
                onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                maxLength={5}
              />
              {formErrors.shortName && (
                <p className="text-sm text-red-500">{formErrors.shortName}</p>
              )}
              <p className="text-xs text-gray-500">
                Maximum 5 characters, used for abbreviations and logo
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-logoUrl">Logo URL (Optional)</Label>
              <Input
                id="edit-logoUrl"
                placeholder="https://example.com/logo.jpg"
                value={formData.logoUrl}
                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTeam} disabled={submitLoading}>
              {submitLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Team Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team
              {currentTeam && <strong> {currentTeam.name}</strong>} and remove it
              from the system.
              {currentTeam && (currentTeam.playerCount || 0) > 0 && (
                <div className="mt-2 text-red-500 font-medium">
                  Warning: This team has {currentTeam.playerCount} player{(currentTeam.playerCount || 0) !== 1 ? 's' : ''} associated with it.
                  Deleting this team may affect player records.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTeam}
              className="bg-red-600 hover:bg-red-700"
              disabled={submitLoading}
            >
              {submitLoading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
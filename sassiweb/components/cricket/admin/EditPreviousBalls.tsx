
// components/cricket/admin/EditPreviousBalls.tsx - Fixed with debug logs
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
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
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DismissalType, ExtrasType, Match, BallEvent, PlayerRole } from "@/lib/cricket/types";

// Add this interface at the top level
interface BallEventWithPlayers extends BallEvent {
  batsmanOnStrike: { id: string; name: string; role: PlayerRole; teamId: string };
  nonStriker: { id: string; name: string; role: PlayerRole; teamId: string };
  bowler: { id: string; name: string; role: PlayerRole; teamId: string };
}
import useSWR from "swr";




const editBallFormSchema = z.object({
  batsmanOnStrikeId: z.string().min(1, "Batsman on strike is required"),
  nonStrikerId: z.string().min(1, "Non-striker is required"),
  bowlerId: z.string().min(1, "Bowler is required"),
  runs: z.number().min(0).max(6),
  isExtra: z.boolean(),
  extras: z.number().min(0).max(5).optional(),
  extrasType: z.nativeEnum(ExtrasType).optional(),
  isWicket: z.boolean(),
  wicketType: z.nativeEnum(DismissalType).optional(),
  comment: z.string().max(150).optional(),
});

interface EditPreviousBallsProps {
  match: Match;
  currentInningsId: string;
  onBallUpdated: () => void;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function EditPreviousBalls({ 
  match, 
  currentInningsId,
  onBallUpdated
}: EditPreviousBallsProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBall, setSelectedBall] = useState<BallEventWithPlayers | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add debug logging
  console.log("EditPreviousBalls component loaded");
  console.log("Match ID:", match.id);
  console.log("Current Innings ID:", currentInningsId);

  // Fetch ball events for current innings
  const apiUrl = `/api/cricket/matches/${match.id}/ball?inningsId=${currentInningsId}&limit=50`;
  console.log("API URL:", apiUrl);

  const { data: ballEvents, error, isLoading, mutate } = useSWR(
    apiUrl,
    fetcher,
    { 
      refreshInterval: 5000,
      onError: (error) => {
        console.error("SWR Error:", error);
      },
      onSuccess: (data) => {
        console.log("Ball events fetched successfully:", data);
      }
    }
  );

  // Get current innings data
  const currentInnings = match.innings.find(inn => inn.id === currentInningsId);
  
  // Initialize form
  const form = useForm<z.infer<typeof editBallFormSchema>>({
    resolver: zodResolver(editBallFormSchema),
    defaultValues: {
      batsmanOnStrikeId: "",
      nonStrikerId: "",
      bowlerId: "",
      runs: 0,
      isExtra: false,
      extras: 0,
      isWicket: false,
    },
  });

  // Form watch values
  const isExtra = form.watch("isExtra");
  const isWicket = form.watch("isWicket");

  // Open edit dialog
  const openEditDialog = (ball: BallEventWithPlayers) => {
    console.log("Opening edit dialog for ball:", ball);
    setSelectedBall(ball);
    
    // Populate form with current ball data
    const formValues = {
      batsmanOnStrikeId: ball.batsmanOnStrikeId,
      nonStrikerId: ball.nonStrikerId,
      bowlerId: ball.bowlerId,
      runs: ball.runs,
      isExtra: !!ball.extrasType,
      extras: ball.extras || 0,
      extrasType: ball.extrasType,
      isWicket: ball.isWicket,
      wicketType: ball.wicketType,
      comment: ball.comment || "",
    };
    
    console.log("Setting form values:", formValues);
    form.reset(formValues);
    
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (ball: BallEventWithPlayers) => {
    console.log("Opening delete dialog for ball:", ball);
    setSelectedBall(ball);
    setIsDeleteDialogOpen(true);
  };

  // Handle edit submission
  async function onEditSubmit(values: z.infer<typeof editBallFormSchema>) {
    console.log("Form submitted with values:", values);
    
    if (!selectedBall) {
      console.error("No selected ball");
      toast.error("No ball selected");
      return;
    }

    console.log("Selected ball:", selectedBall);
    setIsSubmitting(true);
    
    try {
      const updateData = {
        batsmanOnStrikeId: values.batsmanOnStrikeId,
        nonStrikerId: values.nonStrikerId,
        bowlerId: values.bowlerId,
        runs: values.runs,
        extras: values.isExtra ? (values.extras || 0) : 0,
        extrasType: values.isExtra ? values.extrasType : null,
        isWicket: values.isWicket,
        wicketType: values.isWicket ? values.wicketType : null,
        comment: values.comment,
      };

      console.log("Update data:", updateData);

      const url = `/api/cricket/matches/${match.id}/ball/${selectedBall.id}`;
      console.log("Update URL:", url);

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const responseData = await response.text();
      console.log("Response data:", responseData);

      if (!response.ok) {
        let errorMessage = "Failed to update ball event";
        try {
          const errorData = JSON.parse(responseData);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error("Failed to parse error response:", e);
        }
        throw new Error(errorMessage);
      }

      const result = JSON.parse(responseData);
      console.log("Update successful:", result);

      toast.success("Ball event updated successfully");
      setIsEditDialogOpen(false);
      
      // Refresh data
      await mutate();
      onBallUpdated();
      
    } catch (error) {
      console.error("Error updating ball event:", error);
      toast.error(`Failed to update ball event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Handle delete
  const handleDelete = async () => {
    if (!selectedBall) {
      console.error("No selected ball for deletion");
      return;
    }

    console.log("Deleting ball:", selectedBall);
    setIsSubmitting(true);
    
    try {
      const url = `/api/cricket/matches/${match.id}/ball/${selectedBall.id}`;
      console.log("Delete URL:", url);

      const response = await fetch(url, {
        method: "DELETE",
      });

      console.log("Delete response status:", response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Delete error response:", errorData);
        throw new Error("Failed to delete ball event");
      }

      const result = await response.json();
      console.log("Delete successful:", result);

      toast.success("Ball event deleted successfully");
      setIsDeleteDialogOpen(false);
      
      // Refresh data
      await mutate();
      onBallUpdated();
      
    } catch (error) {
      console.error("Error deleting ball event:", error);
      toast.error("Failed to delete ball event");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get event display text
  const getEventDisplay = (ball: BallEventWithPlayers) => {
    if (ball.isWicket) {
      return <Badge variant="destructive">WICKET</Badge>;
    }
    if (ball.extrasType) {
      const extrasMap = {
        WIDE: "WD",
        NO_BALL: "NB", 
        BYE: "B",
        LEG_BYE: "LB"
      };
      return <Badge variant="secondary">{extrasMap[ball.extrasType] || ball.extrasType}</Badge>;
    }
    if (ball.runs === 4) {
      return <Badge className="bg-blue-600">4</Badge>;
    }
    if (ball.runs === 6) {
      return <Badge className="bg-purple-600">6</Badge>;
    }
    return <Badge variant="outline">{ball.runs}</Badge>;
  };

  if (!currentInnings) {
    console.error("No current innings found");
    return (
      <div className="p-4 text-center text-gray-500">
        No current innings found
      </div>
    );
  }

  const battingPlayers = currentInnings.battingTeam?.players || [];
  const bowlingPlayers = currentInnings.bowlingTeam?.players || [];

  console.log("Batting players:", battingPlayers);
  console.log("Bowling players:", bowlingPlayers);

  if (error) {
    console.error("Error loading ball events:", error);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">Previous Balls</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            console.log("Refreshing data...");
            mutate();
          }}
          disabled={isLoading}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          Error loading ball events: {error.message || "Unknown error"}
        </div>
      )}

      {ballEvents && ballEvents.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Over.Ball</TableHead>
                <TableHead>Batsman</TableHead>
                <TableHead>Bowler</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Runs</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ballEvents.slice(0, 20).map((ball: BallEventWithPlayers) => (
                <TableRow key={ball.id}>
                  <TableCell className="font-medium">
                    {ball.over}.{ball.ballInOver}
                  </TableCell>
                  <TableCell>{ball.batsmanOnStrike?.name || "Unknown"}</TableCell>
                  <TableCell>{ball.bowler?.name || "Unknown"}</TableCell>
                  <TableCell>{getEventDisplay(ball)}</TableCell>
                  <TableCell>
                    {ball.runs}
                    {ball.extras > 0 && ` + ${ball.extras} extras`}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {ball.comment || "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          console.log("Edit button clicked for ball:", ball);
                          openEditDialog(ball);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          console.log("Delete button clicked for ball:", ball);
                          openDeleteDialog(ball);
                        }}
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
      ) : (
        !isLoading && (
          <div className="text-center py-8 text-gray-500">
            No ball events found for this innings
          </div>
        )
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Ball Event</DialogTitle>
            <DialogDescription>
              Modify the details of over {selectedBall?.over}.{selectedBall?.ballInOver}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onEditSubmit)} className="space-y-4">
              {/* Debug info */}
              <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                Debug: Ball ID: {selectedBall?.id}, Match ID: {match.id}
              </div>

              {/* Players selection */}
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="batsmanOnStrikeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Batsman on Strike</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select batsman" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {battingPlayers.map((player: any) => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nonStrikerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Non-Striker</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select non-striker" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {battingPlayers.map((player: any) => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="bowlerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bowler</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select bowler" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bowlingPlayers.map((player: any) => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Runs */}
              <div>
                <FormLabel>Runs</FormLabel>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[0, 1, 2, 3, 4, 6].map((run) => (
                    <Button
                      key={run}
                      type="button"
                      variant={form.getValues("runs") === run ? "default" : "outline"}
                      className="w-10 h-10 p-0"
                      onClick={() => {
                        console.log(`Setting runs to: ${run}`);
                        form.setValue("runs", run);
                      }}
                    >
                      {run}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Extras */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="isExtra"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              console.log("Extras checkbox changed:", checked);
                              field.onChange(checked);
                            }}
                          />
                        </FormControl>
                        <FormLabel>Extras</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  {isExtra && (
                    <div className="space-y-2 mt-2">
                      <FormField
                        control={form.control}
                        name="extrasType"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select extra type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(ExtrasType).map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type.replace("_", " ")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="extras"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Extras"
                                {...field}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value) || 0;
                                  console.log("Extras value changed:", value);
                                  field.onChange(value);
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>

                {/* Wicket */}
                <div>
                  <FormField
                    control={form.control}
                    name="isWicket"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              console.log("Wicket checkbox changed:", checked);
                              field.onChange(checked);
                            }}
                          />
                        </FormControl>
                        <FormLabel>Wicket</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  {isWicket && (
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="wicketType"
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select dismissal type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Object.values(DismissalType).map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type.replace("_", " ")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Comment */}
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentary</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add commentary for this ball"
                        {...field}
                        onChange={(e) => {
                          console.log("Comment changed:", e.target.value);
                          field.onChange(e.target.value);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    console.log("Cancel button clicked");
                    setIsEditDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  onClick={() => {
                    console.log("Update button clicked");
                    console.log("Form values:", form.getValues());
                    console.log("Form errors:", form.formState.errors);
                  }}
                >
                  {isSubmitting ? "Updating..." : "Update Ball"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Ball Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this ball event from over {selectedBall?.over}.{selectedBall?.ballInOver}? 
              This action cannot be undone and will recalculate all match statistics.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
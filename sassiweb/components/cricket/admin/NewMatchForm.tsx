// components/cricket/admin/NewMatchForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Validation schema
const matchFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  venue: z.string().min(1, "Venue is required"),
  matchDate: z.date(),
  teamAId: z.string().min(1, "Team A is required"),
  teamBId: z.string().min(1, "Team B is required"),
  eventId: z.string().optional(),
});

interface NewMatchFormProps {
  teams: Array<{ id: string; name: string }>;
}

export default function NewMatchForm({ teams }: NewMatchFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  
  // Initialize form
  const form = useForm<z.infer<typeof matchFormSchema>>({
    resolver: zodResolver(matchFormSchema),
    defaultValues: {
      title: "",
      description: "",
      venue: "",
      matchDate: new Date(),
      teamAId: "",
      teamBId: "",
      eventId: "",
    },
  });
  
  // Submit handler
  async function onSubmit(values: z.infer<typeof matchFormSchema>) {
    // Check if teams are different
    if (values.teamAId === values.teamBId) {
      toast.error("Team A and Team B must be different");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/cricket/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create match');
      }
      
      const match = await response.json();
      
      toast.success('Match created successfully');
      
      // Redirect to admin page with the new match
      router.push(`/cricket/admin?matchId=${match.id}`);
      
    } catch (error) {
      console.error('Error creating match:', error);
      toast.error('Failed to create match');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="teams">Teams & Event</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6 pt-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Match Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter match title" {...field} />
                  </FormControl>
                  <FormDescription>
                    A descriptive title for the match, e.g., "SASSI Cup Final 2025"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter match description" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Additional details about the match or tournament
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter match venue" {...field} />
                  </FormControl>
                  <FormDescription>
                    Location where the match will be held
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="matchDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Match Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    The date when the match will be played
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button 
                type="button" 
                onClick={() => setActiveTab("teams")}
              >
                Next
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="teams" className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="teamAId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team A</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Team A" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      First team participating in the match
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="teamBId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team B</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Team B" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={team.id}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Second team participating in the match
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link to SASSI Event (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event ID" {...field} />
                  </FormControl>
                  <FormDescription>
                    Connect this match to an existing SASSI event
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setActiveTab("basic")}
              >
                Back
              </Button>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Match"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
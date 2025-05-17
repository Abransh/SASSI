// components/cricket/admin/BallInputForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { DismissalType, ExtrasType, Match, BallEvent } from "@/lib/cricket/types";

const ballFormSchema = z.object({
  inningsId: z.string(),
  batsmanOnStrikeId: z.string(),
  nonStrikerId: z.string(),
  bowlerId: z.string(),
  runs: z.number().min(0).max(6),
  isExtra: z.boolean(),
  extras: z.number().min(0).max(5).optional(),
  extrasType: z.enum(["WIDE", "NO_BALL", "BYE", "LEG_BYE"]).optional(),
  isWicket: z.boolean(),
  wicketType: z.enum([
    "BOWLED", "CAUGHT", "LBW", "RUN_OUT", "STUMPED", 
    "HIT_WICKET", "RETIRED_HURT", "OBSTRUCTING_FIELD", 
    "TIMED_OUT", "HANDLED_BALL"
  ]).optional(),
  comment: z.string().max(150).optional(),
});

interface BallInputFormProps {
  match: Match;
  currentInningsId: string;
  currentOver: number;
  currentBall: number;
  onBallAdded: () => void;
}

export default function BallInputForm({ 
  match, 
  currentInningsId, 
  currentOver, 
  currentBall,
  onBallAdded
}: BallInputFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form before any conditional returns
  const form = useForm<z.infer<typeof ballFormSchema>>({
    resolver: zodResolver(ballFormSchema),
    defaultValues: {
      inningsId: currentInningsId,
      batsmanOnStrikeId: "",
      nonStrikerId: "",
      bowlerId: "",
      runs: 0,
      isExtra: false,
      extras: 0,
      isWicket: false,
    },
  });
  
  // Get current innings data
  const currentInnings = match.innings.find(inn => inn.id === currentInningsId);
  if (!currentInnings) {
    return <div>Invalid innings ID</div>;
  }
  
  // Get teams
  const battingTeam = currentInnings.battingTeam;
  const bowlingTeam = currentInnings.bowlingTeam;
  
  // Form watch values
  const isExtra = form.watch("isExtra");
  const extrasType = form.watch("extrasType");
  const isWicket = form.watch("isWicket");
  const wicketType = form.watch("wicketType");
  
  // Submit form handler
  async function onSubmit(values: z.infer<typeof ballFormSchema>) {
    try {
      setIsSubmitting(true);
      
      // Format the ball event data
      const ballEventData: Partial<BallEvent> = {
        matchId: match.id,
        inningsId: currentInningsId,
        over: currentOver,
        ballInOver: currentBall,
        batsmanOnStrikeId: values.batsmanOnStrikeId,
        nonStrikerId: values.nonStrikerId,
        bowlerId: values.bowlerId,
        runs: values.runs,
        extras: values.isExtra ? (values.extras || 0) : 0,
        extrasType: values.isExtra ? values.extrasType : undefined,
        isWicket: values.isWicket,
        wicketType: values.isWicket ? values.wicketType : undefined,
        comment: values.comment,
      };
      
      // Submit ball event
      const response = await fetch(`/api/cricket/matches/${match.id}/ball`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ballEventData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to add ball event");
      }
      
      // Success
      toast.success("Ball event added successfully");
      form.reset({
        inningsId: currentInningsId,
        batsmanOnStrikeId: values.batsmanOnStrikeId,
        nonStrikerId: values.nonStrikerId,
        bowlerId: values.bowlerId,
        runs: 0,
        isExtra: false,
        extras: 0,
        isWicket: false,
      });
      
      // Notify parent component
      onBallAdded();
      
    } catch (error) {
      console.error("Error adding ball event:", error);
      toast.error("Failed to add ball event");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-bold mb-4">
        Over {currentOver}.{currentBall} - Add Ball Details
      </h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Batsmen and Bowler Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="batsmanOnStrikeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batsman on Strike</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select batsman" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {battingTeam.players.map((player) => (
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select non-striker" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {battingTeam.players.map((player) => (
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
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select bowler" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bowlingTeam.players.map((player) => (
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
          
          {/* Runs and Extras */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Runs */}
            <div>
              <h4 className="font-medium mb-2">Runs</h4>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 6].map((run) => (
                  <Button
                    key={run}
                    type="button"
                    variant={form.getValues("runs") === run ? "default" : "outline"}
                    className={`w-10 h-10 p-0 ${
                      form.getValues("runs") === run ? "bg-orange-600" : ""
                    }`}
                    onClick={() => form.setValue("runs", run)}
                  >
                    {run}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Extras */}
            <div>
              <div className="flex items-center mb-2">
                <FormField
                  control={form.control}
                  name="isExtra"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-medium cursor-pointer">
                        Extras
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              
              {isExtra && (
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="extrasType"
                    render={({ field }) => (
                      <FormItem>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
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
                        <FormMessage />
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
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Wicket */}
          <div>
            <div className="flex items-center mb-2">
              <FormField
                control={form.control}
                name="isWicket"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-medium cursor-pointer">
                      Wicket
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            
            {isWicket && (
              <FormField
                control={form.control}
                name="wicketType"
                render={({ field }) => (
                  <FormItem>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          
          {/* Comment */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commentary (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Add commentary for this ball"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Submit */}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Add Ball"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
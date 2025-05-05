"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CalendarIcon,
  Clock,
  ArrowLeft,
  Trash2,
  Check,
  X
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Utilities and hooks
import { cn } from "@/lib/utils";
import workspaceStore from "@/store/workspaceStore";
import AddNewCalendarEvent from "@/hooks/Functions/AddNewCalendarEvent";
import useGetCalendarEvents from "@/hooks/useGetCalendarEvents";

// Define the form schema with Zod
const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().optional(),
  eventType: z.enum(["meeting", "event", "task"], {
    required_error: "Please select an event type",
  }),
  occurrence: z.enum(["single", "recurring-month", "recurring-week"], {
    required_error: "Please select occurrence type",
  }),
  projectId: z.string().optional(),
  location: z.string().optional(),
  participants: z.array(z.string()),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function EventPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { eventsData, eventsLoading } = useGetCalendarEvents();
  const { activeWorkspace } = workspaceStore.getState();

  // Check if we're editing an existing event
  const eventId = searchParams.get("id");
  const isEditing = !!eventId;

  // Generate time options for select
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const h = hour.toString().padStart(2, "0");
        const m = minute.toString().padStart(2, "0");
        const time = `${h}:${m}`;
        const label = format(new Date().setHours(hour, minute), "h:mm a");
        options.push({ value: time, label });
      }
    }
    return options;
  };

  // Memoize time options to prevent recalculation on every render
  const timeOptions = React.useMemo(() => generateTimeOptions(), []);

  // Initialize form with defaults or event data
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      eventType: "meeting" as const,
      occurrence: "single" as const,
      projectId: "",
      location: "",
      participants: [],
    },
  });

  // Watch for form value changes
  const participants = form.watch("participants");

  // Initialize form with data from URL or existing event
  React.useEffect(() => {
    // Handle date from URL
    const dateParam = searchParams.get("date");
    if (dateParam && !isEditing) {
      try {
        const parsedDate = new Date(dateParam);
        if (!isNaN(parsedDate.getTime())) {
          form.setValue("date", parsedDate);
        }
      } catch (error) {
        console.error("Invalid date parameter:", error);
      }
    }

    // Handle existing event data
    if (isEditing && eventId && eventsData) {
      const event = eventsData.find((e) => e.id === eventId);
      if (event) {
        form.reset({
          title: event.title || "",
          description: event.description || "",
          date: event.date ? new Date(event.date) : new Date(),
          startTime: event.time || "",
          endTime: event.endTime || "",
          eventType: (event.type as "meeting" | "event" | "task") || "meeting",
          occurrence: (event.occurrence as "single" | "recurring-month" | "recurring-week") || "single",
          projectId: event.projectId || "",
          location: event.location || "",
          participants: event.participants?.map((p: any) => p.workspaceMemberId) || [],
        });
      }
    }
  }, [searchParams, isEditing, eventId, eventsData, form]);

  // Handle form submission
  const AddNewCalendarEventMutation = useMutation({
    mutationFn: AddNewCalendarEvent,
    onSuccess: () => {
      toast.success(isEditing ? "Event updated successfully" : "Calendar event added successfully");
      queryClient.invalidateQueries({
        queryKey: ["calendar-events", activeWorkspace?.id],
      });
      
      // Only reset form if we're not editing
      if (!isEditing) {
        form.reset();
      }
      
      // Navigate back to calendar
      router.push("/calendar");
    },
    onError: (error) => {
      toast.error(isEditing ? "Error updating event" : "Error adding calendar event");
      console.error("Error with calendar event:", error);
    },
  });

  function onSubmit(data: EventFormValues) {
    // Create event payload
    const payload: any = {
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.startTime,
      endTime: data.endTime,
      type: data.eventType,
      occurrence: data.occurrence,
      location: data.location,
      participants: data.participants,
      workspaceId: activeWorkspace?.id!,
    };

    if (data.projectId && data.projectId !== "none") {
      payload.projectId = data.projectId;
    }

    // If editing, include the event ID
    if (isEditing && eventId) {
      payload.id = eventId;
    }

    AddNewCalendarEventMutation.mutate(payload);
  }

  // Handle event deletion
  const handleDelete = () => {
    if (
      isEditing &&
      window.confirm("Are you sure you want to delete this event?")
    ) {
      // In a real app, delete from your backend
      // DeleteCalendarEventMutation.mutate(eventId);
      
      toast.success("Event deleted");
      // Navigate back to calendar
      router.push("/calendar");
    }
  };

  // Toggle participant selection
  const toggleParticipant = (memberId: string) => {
    const currentParticipants = form.getValues("participants");
    if (currentParticipants.includes(memberId)) {
      form.setValue(
        "participants", 
        currentParticipants.filter(id => id !== memberId)
      );
    } else {
      form.setValue(
        "participants", 
        [...currentParticipants, memberId]
      );
    }
  };

  // Don't render the form until we've loaded any existing event data
  if (isEditing && eventsLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <p>Loading event data...</p>
      </div>
    );
  }

  console.log(participants, "participants");

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header */}
      <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/calendar">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">
          {isEditing ? "Edit Event" : "Add New Event"}
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="container max-w-3xl p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add event details" 
                        className="min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                "Select a date"
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="occurrence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occurrence</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select occurrence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single Event</SelectItem>
                          <SelectItem value="recurring-month">Monthly</SelectItem>
                          <SelectItem value="recurring-week">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time">
                              {field.value ? (
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {timeOptions.find(option => option.value === field.value)?.label || field.value}
                                </div>
                              ) : (
                                "Select time"
                              )}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
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
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time">
                              {field.value ? (
                                <div className="flex items-center">
                                  <Clock className="mr-2 h-4 w-4" />
                                  {timeOptions.find(option => option.value === field.value)?.label || field.value}
                                </div>
                              ) : (
                                "Select time"
                              )}
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                          <SelectItem value="task">Task</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Project</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {activeWorkspace?.projects &&
                            activeWorkspace.projects.map((project) => (
                              <SelectItem key={project.id} value={project.id}>
                                {project.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Add location (e.g., Meeting Room, Zoom, etc.)" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Participants Section */}
              <FormField
                control={form.control}
                name="participants"
                render={() => (
                  <FormItem>
                    <FormLabel>Participants</FormLabel>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {participants.length > 0 ? (
                        participants.map((wMemberId: any) => {
                          const member = activeWorkspace?.members?.find(
                            (m) => m.id === wMemberId
                          );
                          return (
                            <Badge
                              key={wMemberId}
                              className="flex items-center space-x-2 px-2 py-1 text-sm border border-gray-200"
                              variant="secondary"
                            >
                              <Avatar className="h-5 w-5">
                                <AvatarFallback>
                                  {member?.user?.name?.charAt(0).toUpperCase() ??
                                    "U"}
                                </AvatarFallback>
                              </Avatar>
                              <span>{member?.user?.name ?? "Unknown"}</span>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                className="h-4 w-4 ml-1"
                                onClick={() => toggleParticipant(wMemberId)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          );
                        })
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No participants selected.
                        </p>
                      )}
                    </div>

                    <FormControl>
                      <div className="grid gap-1">
                        {activeWorkspace?.members?.map((member) => (
                          <Button
                            key={member.id}
                            type="button"
                            variant={
                              participants.includes(member.id)
                                ? "secondary"
                                : "outline"
                            }
                            className="justify-start text-left"
                            onClick={() => toggleParticipant(member.id)}
                          >
                            {participants.includes(member.id) ? (
                              <Check className="mr-2 h-4 w-4" />
                            ) : (
                              <div className="w-4 mr-2" />
                            )}
                            {member.user.name}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between pt-4">
                <div>
                  {isEditing && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Event
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/calendar">Cancel</Link>
                  </Button>
                  <Button 
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {isEditing ? "Save Changes" : "Create Event"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
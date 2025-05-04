"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
import { CalendarIcon, Clock, ArrowLeft, Trash2, Check, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import workspaceStore from "@/store/workspaceStore";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddNewCalendarEvent from "@/hooks/Functions/AddNewCalendarEvent";
import useGetCalendarEvents from "@/hooks/useGetCalendarEvents";

export default function EventPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { eventsData, eventsLoading, errorLoadingEvents } =
    useGetCalendarEvents();
  const { activeWorkspace } = workspaceStore.getState();

  // Check if we're editing an existing event
  const eventId = searchParams.get("id");
  const isEditing = !!eventId;

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState<"meeting" | "event" | "task">(
    "meeting"
  );
  const [occurrence, setOccurrence] = useState<
    "single" | "recurring-month" | "recurring-week"
  >("single");
  const [projectId, setProjectId] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  console.log(window, "window", isEditing, eventId, eventsData);
  // Load event data if editing
useEffect(() => {
  if (!isEditing || !eventsData || eventsLoading) return;

  const event = eventsData.find((e) => e.id === eventId);
  if (!event) return;

  console.log(event, 'event inside useEffect');

  setTitle(event.title ?? '');
  setDescription(event.description ?? '');
  setDate(event.date ? new Date(event.date) : new Date());
  setStartTime(event.time ?? '');        // only set if event is valid
  setEndTime(event.endTime ?? '');
  setEventType(event.type ?? 'meeting');
  setProjectId(event.projectId ?? '');
  setLocation(event.location ?? '');
  setParticipants(
    event.participants?.map((p: any) => p.workspaceMemberId) ?? []
  );
}, [isEditing, eventsData, eventsLoading]);


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

  const timeOptions = generateTimeOptions();

  const AddNewCalendarEventMutation = useMutation({
    mutationFn: AddNewCalendarEvent,
    onSuccess: () => {
      toast.success("Calendar event added successfully");
      queryClient.invalidateQueries({
        queryKey: ["calendar-events", activeWorkspace?.id],
      });
      // Reset form and close dialog
      console.log("running automatically");
      setTitle("");
      setDescription("");
      setDate(undefined);
      setStartTime("");
      setEndTime("");
      setEventType("meeting");
      setProjectId("");
      setLocation("");
      setParticipants([]);
      setOccurrence("single");
    },
    onError: (error) => {
      console.error("Error adding calendar event:", error);
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) return;

    // Create event object
    let payload: any = {
      title,
      description,
      date,
      time: startTime,
      endTime,
      type: eventType,
      location,
      participants,
      occurrence,
      workspaceId: activeWorkspace?.id!,
    };

    if (projectId) {
      payload.projectId = projectId!;
    }

    // In a real app, save to your backend
    console.log("Saving event:", payload);
    AddNewCalendarEventMutation.mutate(payload);

    // Navigate back to calendar
    router.push("/calendar");
  };

  // Handle event deletion
  const handleDelete = () => {
    if (
      isEditing &&
      window.confirm("Are you sure you want to delete this event?")
    ) {
      // In a real app, delete from your backend
      console.log("Deleting event:", eventId);

      // Navigate back to calendar
      router.push("/calendar");
    }
  };

  // Toggle participant selection
  const toggleParticipant = (memberId: string) => {
    if (participants.includes(memberId)) {
      setParticipants(participants.filter((id) => id !== memberId));
    } else {
      setParticipants([...participants, memberId]);
    }
  };
  // console.log(title, "title")
  // console.log(description, "description")
  // console.log(date, "date")
  // console.log(startTime, "startTime")
  // console.log(endTime, "endTime")
  // console.log(eventType, "eventType")
  // console.log(projectId, "projectId")
  // console.log(location, "location")
  // console.log(participants, "participants")
  // console.log(occurrence, "occurrence")
  // console.log(activeWorkspace?.id, "activeWorkspace?.id")


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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add event details"
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="event-occurrence">Occurrence</Label>
                  <Select
                    value={occurrence}
                    onValueChange={(value) =>
                      setOccurrence(
                        value as "single" | "recurring-month" | "recurring-week"
                      )
                    }
                  >
                    <SelectTrigger id="event-occurrence" className="w-full">
                      <SelectValue placeholder="Select occurrence" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single Event</SelectItem>
                      <SelectItem value="recurring-month">Monthly</SelectItem>
                      <SelectItem value="recurring-week">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="event-start">Start Time</Label>
                  <Select
                    value={startTime}
                    onValueChange={(value) => {
                      console.log(value, "value change in ui");
                      setStartTime(value);
                    }}
                  >
                    <SelectTrigger id="event-start" className="w-full">
                      <SelectValue placeholder="Select time">
                        {timeOptions && startTime ? (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {
                              timeOptions.filter(
                                (option) => option.value === startTime
                              )?.[0]?.label
                            }
                          </div>
                        ) : (
                          "Select time"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="event-end">End Time</Label>
                  <Select
                    value={endTime}
                    onValueChange={(value) => {
                      console.log(value, "value change in ui");
                      setEndTime(value);
                    }}
                  >
                    <SelectTrigger id="event-end" className="w-full">
                      <SelectValue placeholder="Select time">
                        {timeOptions && endTime ? (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            {
                              timeOptions.filter(
                                (option) => option.value === endTime
                              )?.[0]?.label
                            }
                          </div>
                        ) : (
                          "Select time"
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="event-type">Event Type</Label>
                  <Select
                    defaultValue={eventType}
                    onValueChange={(value) =>
                      setEventType(value as "meeting" | "event" | "task")
                    }
                  >
                    <SelectTrigger id="event-type" className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="task">Task</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="event-project">Related Project</Label>
                  <Select
                    value={projectId}
                    onValueChange={(value) => {
                      console.log(value, "value change in ui");
                      setProjectId(value);
                    }}
                  >
                    <SelectTrigger id="event-project" className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {activeWorkspace?.projects &&
                        activeWorkspace?.projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="event-location">Location</Label>
                <Input
                  id="event-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add location (e.g., Meeting Room, Zoom, etc.)"
                />
              </div>

              {/* Participants Section */}
              <div className="grid gap-2">
                <Label>Participants</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {participants.length > 0 ? (
                    participants.map((memberId) => {
                      const member =
                        activeWorkspace?.members &&
                        activeWorkspace?.members.find((m) => m.id === memberId);
                      if (!member) return null;
                      return (
                        <Badge
                          key={member.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {member.user.name}
                          <button
                            type="button"
                            onClick={() => toggleParticipant(member.id)}
                            className="ml-1 rounded-full p-0.5 hover:bg-muted"
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">
                              Remove {member.user.name}
                            </span>
                          </button>
                        </Badge>
                      );
                    })
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No participants selected
                    </div>
                  )}
                </div>

                <div className="mt-2 max-h-[200px] overflow-y-auto rounded-md border p-2">
                  {activeWorkspace?.members &&
                    activeWorkspace?.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center space-x-2 py-2"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                            participants.includes(member.id)
                              ? "bg-primary border-primary"
                              : "border-input"
                          }`}
                          onClick={() => toggleParticipant(member.id)}
                        >
                          {participants.includes(member.id) && (
                            <Check className="h-3 w-3 text-primary-foreground" />
                          )}
                        </div>
                        <div
                          className="flex flex-1 cursor-pointer items-center gap-2 text-sm"
                          onClick={() => toggleParticipant(member.id)}
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-[10px]">
                              USR
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-1 justify-between">
                            <span>{member.user.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

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
                <Button type="submit">
                  {isEditing ? "Save Changes" : "Create Event"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

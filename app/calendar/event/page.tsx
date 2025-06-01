"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  Check,
  ChevronsUpDown,
  Divide,
  Repeat,
  Trash2,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

// UI Components
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";

// Utilities and hooks
import { useAuth } from "@/app/providers/AuthProvider";
import DatePicker from "@/components/date-picker";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import AddNewCalendarEvent, { CalendarEventPayload } from "@/hooks/Functions/AddNewCalendarEvent";
import CancelCalendarEvent from "@/hooks/Functions/CancelCalendarEvent";
import DeleteCalendarEvent from "@/hooks/Functions/DeleteCalendarEvent";
import EditCalendarEvent from "@/hooks/Functions/EditCalendarEvent";
import useGetCalendarEvents from "@/hooks/useGetCalendarEvents";
import { cn } from "@/lib/utils";
import workspaceStore from "@/store/workspaceStore";
import { useStore } from "zustand";
import { EventFormConstrains, EventFormValues } from "./_components/EventFormConstrains";
import LoadingEvent from "./_components/loading-event";
import { OccurenceDialog } from "./_components/occurence-dialog";
import AddNewCalendarEventSeries, { CalendarEventSeriesPayload } from "@/hooks/Functions/AddNewCalendarEventSeries";
import { getMonth } from "date-fns";

export default function EventPage() {
  const { form } = EventFormConstrains();
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDate = new Date();
  const currentMonth = getMonth(currentDate);
  const currentYear = currentDate.getFullYear();
  const { eventsData, eventsLoading } = useGetCalendarEvents(currentMonth, currentYear);
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);
  const [eventStatus, setEventStatus] = useState("active");

  // Occurence States
   const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
      const [endDateOpen, setEndDateOpen] = React.useState(false);
      const [repeatEvery, setRepeatEvery] = React.useState<number>(2);
      const [repeatFor, setRepeatFor] = React.useState<"days" | "weeks" | "months" | "years">("days");
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekday = weekdays[form.getValues("date")?.getDay()];
const [selectedDays, setSelectedDays] = React.useState<string[]>([weekday]);
const [seriesTitle, setSeriesTitle] = React.useState<string>("");
const [seriesDescription, setSeriesDescription] = React.useState<string>("");

const [allOccurences, setAllOccurences] = React.useState<{ dateObj: Date; date: number; day: string; month: number; year: number; monthDesc: string }[]>([]);

const date = form.watch("date");
React.useEffect(() => {
    if(date){
        setSelectedDays([weekdays[date?.getDay()]])
    }
}, [date])



  // Check if we're editing an existing event
  const eventId = searchParams.get("id");
  const isEditing = !!eventId;


  const timeOptions = [
    { value: "00:00", label: "12:00 AM" },
    { value: "00:30", label: "12:30 AM" },
    { value: "01:00", label: "1:00 AM" },
    { value: "01:30", label: "1:30 AM" },
    { value: "02:00", label: "2:00 AM" },
    { value: "02:30", label: "2:30 AM" },
    { value: "03:00", label: "3:00 AM" },
    { value: "03:30", label: "3:30 AM" },
    { value: "04:00", label: "4:00 AM" },
    { value: "04:30", label: "4:30 AM" },
    { value: "05:00", label: "5:00 AM" },
    { value: "05:30", label: "5:30 AM" },
    { value: "06:00", label: "6:00 AM" },
    { value: "06:30", label: "6:30 AM" },
    { value: "07:00", label: "7:00 AM" },
    { value: "07:30", label: "7:30 AM" },
    { value: "08:00", label: "8:00 AM" },
    { value: "08:30", label: "8:30 AM" },
    { value: "09:00", label: "9:00 AM" },
    { value: "09:30", label: "9:30 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "10:30", label: "10:30 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "11:30", label: "11:30 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "12:30", label: "12:30 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "13:30", label: "1:30 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "14:30", label: "2:30 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "15:30", label: "3:30 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "16:30", label: "4:30 PM" },
    { value: "17:00", label: "5:00 PM" },
    { value: "17:30", label: "5:30 PM" },
    { value: "18:00", label: "6:00 PM" },
    { value: "18:30", label: "6:30 PM" },
    { value: "19:00", label: "7:00 PM" },
    { value: "19:30", label: "7:30 PM" },
    { value: "20:00", label: "8:00 PM" },
    { value: "20:30", label: "8:30 PM" },
    { value: "21:00", label: "9:00 PM" },
    { value: "21:30", label: "9:30 PM" },
    { value: "22:00", label: "10:00 PM" },
    { value: "22:30", label: "10:30 PM" },
    { value: "23:00", label: "11:00 PM" },
    { value: "23:30", label: "11:30 PM" },
  ];

  // Watch for form value changes
  const participants = form.watch("participants");

  const formInitialized = React.useRef(false);

  React.useEffect(() => {
    // Handle date from URL for new events
    const dateParam = searchParams.get("date");
    if (dateParam && !isEditing && !formInitialized.current) {
      try {
        const parsedDate = new Date(dateParam);
        if (!isNaN(parsedDate.getTime())) {
          form.setValue("date", parsedDate);
        }
      } catch (error) {
        console.error("Invalid date parameter:", error);
      }
    }

    // Only load event data once when editing an existing event
    if (isEditing && eventId && eventsData && !formInitialized.current) {
      const event = eventsData.find((e) => e.id === eventId);
      if (event) {
        console.log(event, "form reset ran ");
        // Set form initialized flag to true to prevent reloading
        // formInitialized.current = true;

        form.setValue("title", event.title || "");
        form.setValue("description", event.description || "");
        form.setValue("date", event.date ? new Date(event.date) : new Date());
        form.setValue("startTime", event.time || "");
        form.setValue("endTime", event.endTime || "");
        form.setValue(
          "eventType",
          (event.type as "meeting" | "event") || "meeting"
        );
        form.setValue(
          "occurrence",
          (event.occurrence as "single" | "recurring") || "single"
        );
        form.setValue("projectId", event.projectId || "");
        form.setValue("location", event.location || "");
        form.setValue(
          "participants",
          event.participants?.map((p: any) => p.workspaceMemberId) || []
        );
        form.setValue("status", event.status || "active");
        setEventStatus(event.status || "active");
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isEditing, eventId, eventsData]); // Dependencies remain the same

  // console.log(form.getValues(), "form.getValues()");
  // Handle form submission
  const AddNewCalendarEventMutation = useMutation({
    mutationFn: AddNewCalendarEvent,
    onSuccess: () => {
      toast.success("Calendar event added successfully");
      queryClient.invalidateQueries({
        queryKey: ["calendar-events", activeWorkspace?.id],
      });

      // Only reset form if we're not editing
      // if (!isEditing) {
      form.reset();
      setAllOccurences([]);
      // }

      // Navigate back to calendar
      router.push("/calendar");
    },
    onError: (error) => {
      toast.error("Error adding calendar event");
      console.error("Error with calendar event:", error);
    },
  });

  // Add event series mutation 
  const AddNewCalendarEventSeriesMutation = useMutation({
    mutationFn: AddNewCalendarEventSeries,
    onSuccess: () => {
      toast.success("Calendar event series added successfully");
      queryClient.invalidateQueries({
        queryKey: ["calendar-events", activeWorkspace?.id],
      });

      // Only reset form if we're not editing
      // if (!isEditing) {
      form.reset();
      setAllOccurences([]);
      // }

      // Navigate back to calendar
      router.push("/calendar");
    },
    onError: (error) => {
      toast.error("Error adding calendar event series");
      console.error("Error with calendar event series:", error);
    },
  });

  // Edit event mutation
  const EditCalendarEventMutation = useMutation({
    mutationFn: EditCalendarEvent,
    onSuccess: () => {
      toast.success("Event updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["calendar-events", activeWorkspace?.id],
      });

      // Only reset form if we're not editing
      if (!isEditing) {
        form.reset();
        setAllOccurences([]);
      }

      // Navigate back to calendar
      router.push("/calendar");
    },
    onError: (error) => {
      toast.error("Error updating event");
      console.error("Error with calendar event:", error);
    },
  });

  const DeleteCalendarEventMutation = useMutation({
    mutationFn: DeleteCalendarEvent,
    onSuccess: () => {
      toast.success("Event deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["calendar-events", activeWorkspace?.id],
      });

      // Only reset form if we're not editing
      if (!isEditing) {
        form.reset();
        setAllOccurences([]);
      }

      // Navigate back to calendar
      router.push("/calendar");
    },
    onError: (error) => {
      toast.error("Error deleting event");
      console.error("Error with calendar event:", error);
    },
  });

  function EditEvent(payload: any) {
    EditCalendarEventMutation.mutate({
      ...payload,
      id: eventId!,
    });
  }

  function AddEvent(payload: any) {
    AddNewCalendarEventMutation.mutate(payload);
  }

  function AddEventSeries(payload: any) {
    AddNewCalendarEventSeriesMutation.mutate(payload);
  }

  function onSubmit(data: EventFormValues) {
    console.log(data, "data");

    const createdById = session?.memberships.find((m: any) => m.workspaceId === activeWorkspace?.id)?.id!;
    // Create event payload
    const payload: CalendarEventPayload = {
      title: data.title,
      description: data.description || "",
      date: data.date,
      time: data.startTime,
      endTime: data.endTime!,
      type: data.eventType,
      location: data.location!,
      participants: data.participants,
      workspaceId: activeWorkspace?.id!,
      status: data.status,
      createdById: createdById,
      occurrence: data.occurrence,
    };

    const newOccurences = allOccurences.map((occurence) => {
      return {
        title: data.title,
        description: data.description || "",
        date: occurence.dateObj,
        time: data.startTime,
        endTime: data.endTime!,
        type: data.eventType,
        location: data.location!,
        workspaceId: activeWorkspace?.id!,
        status: data.status,
        createdById: createdById,
        occurrence: data.occurrence,
      }
    })

    const eventSeriesPayload: CalendarEventSeriesPayload = {
      occurrence: newOccurences,
      participants: data.participants,
      seriesTitle,
      seriesDescription
    }
    if (data.projectId && data.projectId !== "none") {
      payload.projectId = data.projectId;
    }

    // If editing, include the event ID
    if (isEditing && eventId) {
      payload.id = eventId;
    }

    if (isEditing) {
      EditEvent(payload);
    } else {
      if (data.occurrence === "recurring") {
        AddEventSeries(eventSeriesPayload);
        // console.log(eventSeriesPayload, "eventSeriesPayload");
      } else {
        AddEvent(payload);
      }
    }
  }

  // Handle event deletion
  const handleDelete = () => {
    if (
      isEditing &&
      window.confirm("Are you sure you want to delete this event?")
    ) {
      // In a real app, delete from your backend
      DeleteCalendarEventMutation.mutate(eventId!);

      toast.success("Event deleted");
      // Navigate back to calendar
      router.push("/calendar");
    }
  };

  const CancelCalendarEventMutation = useMutation({
    mutationFn: CancelCalendarEvent,
    onSuccess: () => {
      toast.success("Event cancelled");
      queryClient.invalidateQueries({
        queryKey: ["calendar-events", activeWorkspace?.id],
      });

      // Only reset form if we're not editing
      if (!isEditing) {
        form.reset();
        setAllOccurences([]);
      }

      // Navigate back to calendar
      router.push("/calendar");
    },
    onError: (error) => {
      toast.error("Error cancelling event");
      console.error("Error with calendar event:", error);
    },
  });

  // Handle event cancellation
  const handleCancel = () => {
    if (
      isEditing &&
      window.confirm("Are you sure you want to cancel this event?")
    ) {
      // In a real app, delete from your backend
      CancelCalendarEventMutation.mutate({ eventId: eventId! });
    }
  };

  // Toggle participant selection
  const toggleParticipant = (memberId: string) => {
    const currentParticipants = [...form.getValues("participants")];

    if (currentParticipants.includes(memberId)) {
      // Remove participant
      form.setValue(
        "participants",
        currentParticipants.filter((id) => id !== memberId),
        { shouldDirty: true, shouldTouch: false }
      );
    } else {
      // Add participant
      form.setValue("participants", [...currentParticipants, memberId], {
        shouldDirty: true,
        shouldTouch: false,
      });
    }
  };

  console.log(allOccurences , " all event occurences ")

  // Don't render the form until we've loaded any existing event data
  if (isEditing && eventsLoading) {
    return <LoadingEvent />
  }

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
          {isEditing && eventStatus !== "cancelled" ? "Edit Event" : isEditing && eventStatus === "cancelled" ? "View Event" : "Add New Event"}
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
                disabled={eventStatus === "cancelled"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Title {eventStatus === "cancelled" && <Badge className="bg-red-100 text-red-800">Cancelled</Badge>}</FormLabel>
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
                disabled={eventStatus === "cancelled"}
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

              <div className="flex gap-4 flex-wrap">
                <FormField
                  control={form.control}
                  name="date"

                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <DatePicker
                        Date={field.value}
                        setDate={field.onChange}
                        label="Date"
                        disabled={eventStatus === "cancelled"}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <Select
                        key={field.value}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        disabled={eventStatus === "cancelled"}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
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
                        key={field.value}
                        disabled={eventStatus === "cancelled"}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
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
                  name="occurrence"
                  render={({ field }) => (

                    <FormItem>
                      <FormLabel>Occurrence</FormLabel>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={field.value}
                          readOnly
                        />
                        <OccurenceDialog
                          date={date}
                          setDate={(date) => {
                            form.setValue("date", date || new Date());
                          }}
                          endDate={endDate}
                          setEndDate={setEndDate}
                          endDateOpen={endDateOpen}
                          setEndDateOpen={setEndDateOpen}
                          repeatEvery={repeatEvery}
                          repeatFor={repeatFor}
                          setRepeatEvery={setRepeatEvery}
                          setRepeatFor={setRepeatFor}
                          selectedDays={selectedDays}
                          setSelectedDays={setSelectedDays}
                          setAllOccurences={(occurences) => {
                            setAllOccurences(occurences);
                            form.setValue("occurrence", "recurring");
                          }}
                          seriesTitle={seriesTitle}
                          setSeriesTitle={setSeriesTitle}
                          seriesDescription={seriesDescription}
                          setSeriesDescription={setSeriesDescription}
                          trigger={
                            <Button
                              variant="ghost"
                              type="button"
                            >
                              <Repeat /> Make Recurring
                            </Button>
                          }
                        /></div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Type</FormLabel>
                      <Select
                        key={field.value}
                        value={field.value}
                        disabled={eventStatus === "cancelled"}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* // Project ID Select Component */}
                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Project</FormLabel>
                      <Select
                        key={field.value}
                        value={field.value}
                        disabled={eventStatus === "cancelled"}
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
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
                disabled={eventStatus === "cancelled"}
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

                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Participants</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild disabled={eventStatus === "cancelled"}>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value?.length && "text-muted-foreground"
                            )}
                          >
                            {field.value?.length > 0
                              ? `${field.value.length} participant${field.value.length > 1 ? "s" : ""
                              } selected`
                              : "Select participants"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0" align="start">
                        <Command>
                          <CommandInput placeholder="Search participants..." />
                          <CommandEmpty>No participants found.</CommandEmpty>
                          <CommandGroup className="max-h-64 overflow-auto">
                            {activeWorkspace?.members?.map((member) => (
                              <CommandItem
                                key={member.id}
                                value={member.user.name}
                                onSelect={() => {
                                  toggleParticipant(member.id);
                                }}
                              >
                                <div className="flex items-center gap-2 w-full">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>
                                      {member?.user?.name
                                        ?.charAt(0)
                                        .toUpperCase() ?? "U"}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{member.user.name}</span>
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      participants.includes(member.id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/* Selected participants display */}
                    {participants.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {participants.map((memberId) => {
                          const member = activeWorkspace?.members?.find(
                            (m) => m.id === memberId
                          );
                          return (
                            <Badge
                              key={memberId}
                              className="flex items-center gap-1 px-2 py-1 text-sm"
                              variant="secondary"
                            >
                              <Avatar className="h-4 w-4 mr-1">
                                <AvatarFallback className="text-xs">
                                  {member?.user?.name
                                    ?.charAt(0)
                                    .toUpperCase() ?? "U"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="max-w-[150px] truncate">
                                {member?.user?.name ?? "Unknown"}
                              </span>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                disabled={eventStatus === "cancelled"}
                                className="h-4 w-4 p-0 ml-1 hover:bg-destructive/10"
                                onClick={() => toggleParticipant(memberId)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </Badge>
                          );
                        })}
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />

              {eventStatus === "cancelled" ? null : <div className="flex justify-between pt-4">
                <div className="flex gap-2">
                  {isEditing && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={handleDelete}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Event
                    </Button>
                  )}
                  {isEditing && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                    >
                      <Trash2 className="h-4 w-4" />
                      Cancel Event
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/calendar">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={form.formState.isSubmitting || participants.length === 0}>
                    {isEditing ? "Save Changes" : "Create Event"}
                  </Button>
                </div>
              </div>}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

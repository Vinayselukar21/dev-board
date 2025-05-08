"use client";

import type React from "react";

import { CalendarEvent, Project } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useGetCalendarEvents from "@/hooks/useGetCalendarEvents";
import workspaceStore from "@/store/workspaceStore";
import { format } from "date-fns";
import {
  Clock,
  Folder,
  MapPin,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "zustand";

interface EventDetailsDialogProps {
  event: CalendarEvent | null;
  onEdit: (event: CalendarEvent) => void;
  trigger: React.ReactNode;
}

export function EventDetailsDialog({
  event,
  onEdit,
  trigger,
}: EventDetailsDialogProps) {
  const activeWorkspace = useStore(workspaceStore, (state) => state.activeWorkspace);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventType, setEventType] = useState<"meeting" | "event">(
    "meeting"
  );
  const [status, setStatus] = useState<"active" | "cancelled">("active");
  const [projectId, setProjectId] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const { eventsData, eventsLoading } = useGetCalendarEvents();
  // Initialize form with event data when event changes
  useEffect(() => {
    const selectedEvent: CalendarEvent | undefined = eventsData.find(
      (e: CalendarEvent) => e.id === event?.id
    );
    if (selectedEvent) {
      setTitle(selectedEvent.title || "");
      setDescription(selectedEvent.description || "");
      setDate(selectedEvent.date);
      setStartTime(selectedEvent.time || "");
      setEndTime(selectedEvent.endTime || "");
      setEventType(selectedEvent.type);
      setStatus(selectedEvent.status);
      setProjectId(selectedEvent.projectId || "");
      setLocation(selectedEvent.location || "lala");
      setParticipants(
        selectedEvent.participants?.map((p: any) => p.workspaceMemberId) || []
      );
    }
  }, [event]);

  // Get event type badge color
  const getEventTypeColor = (type: "meeting" | "event" ) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800";
      case "event":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!event) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">View Event</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
       {eventsLoading ? (
         <div>Loading...</div>
       ) : (
        <>
        <DialogHeader>
           <div className="flex items-center justify-between">
             <DialogTitle>{title}</DialogTitle>
             <div className="flex items-center gap-2 mr-5">
               <Badge
                 className={
                   status === "active"
                     ? "bg-green-100 text-green-800"
                     : "bg-red-100 text-red-800"
                 }
               >
                 {status}
               </Badge>
               <Badge className={getEventTypeColor(eventType)}>
                 {eventType}
               </Badge>
             </div>
           </div>
           <DialogDescription>
             {date && format(date, "EEEE, MMMM d, yyyy")}
           </DialogDescription>
         </DialogHeader>
         <div className="space-y-4">
           {description && (
             <div className="rounded-md bg-muted/80 p-3">
               <p className="whitespace-pre-line text-sm">{description}</p>
             </div>
           )}
 
           {startTime && (
             <div className="flex items-center gap-2">
               <Clock className="h-4 w-4 text-muted-foreground" />
               <span>
                 {startTime}
                 {endTime && ` - ${endTime}`}
               </span>
             </div>
           )}
 
           {location && (
             <div className="flex items-center gap-2">
               <MapPin className="h-4 w-4 text-muted-foreground" />
               <span>{location}</span>
             </div>
           )}
 
           {projectId && (
             <div className="flex items-center gap-2">
               <Folder className="h-4 w-4 text-muted-foreground" />
               <span>
                 {
                   activeWorkspace?.projects?.find(
                     (p: Project) => p.id === projectId
                   )?.name
                 }
               </span>
             </div>
           )}
 
           <div className="flex items-center gap-2 flex-wrap">
             {participants.length > 0 &&
               activeWorkspace?.members?.map((m: any) => (
                 <div
                   className="flex items-center gap-2 w-fit bg-muted/80 p-2 rounded-md text-sm"
                   key={m.id}
                 >
                   <User className="h-4 w-4 text-muted-foreground" />
                   <span>{m.user.name}</span>
                 </div>
               ))}
           </div>
         </div>
         <DialogFooter>
           <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
             {status !== "cancelled" ? "Edit" : "View"}
           </Button>
         </DialogFooter></>
       )}
      </DialogContent>
    </Dialog>
  );
}

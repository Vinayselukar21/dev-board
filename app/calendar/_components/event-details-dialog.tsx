"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
// import { useWorkspace } from "@/contexts/workspace-context"
import { Badge } from "@/components/ui/badge"
import { CalendarEvent } from "@/app/types"
import workspaceStore from "@/store/workspaceStore"

interface EventDetailsDialogProps {
  event: CalendarEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
  onEdit: (event: CalendarEvent) => void
}

export function EventDetailsDialog({ event, open, onOpenChange, onSave, onDelete, onEdit }: EventDetailsDialogProps) {
  const { activeWorkspace } = workspaceStore.getState()
  const [isEditing, setIsEditing] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [eventType, setEventType] = useState<"meeting" | "event" | "task">("meeting")
  const [projectId, setProjectId] = useState("")
  const [location, setLocation] = useState("")

  // Initialize form with event data when event changes
  useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDescription(event.description || "")
      setDate(event.date)
      setStartTime(event.time || "")
      setEndTime(event.endTime || "")
      setEventType(event.type)
      setProjectId(event.projectId || "")
      setLocation(event.location || "")
      setIsEditing(false)
    }
  }, [event])

  // Generate time options for select
  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const h = hour.toString().padStart(2, "0")
        const m = minute.toString().padStart(2, "0")
        const time = `${h}:${m}`
        const label = format(new Date().setHours(hour, minute), "h:mm a")
        options.push({ value: time, label })
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!event || !date) return

    const updatedEvent: CalendarEvent = {
      ...event,
      title,
      description,
      date,
      time: startTime,
      endTime,
      type: eventType,
      projectId,
      location,
    }

    onSave(updatedEvent)
    setIsEditing(false)
  }

  // Handle event deletion
  const handleDelete = () => {
    if (event && window.confirm("Are you sure you want to delete this event?")) {
      onDelete(event.id || "")
      onOpenChange(false)
    }
  }

  // Get event type badge color
  const getEventTypeColor = (type: "meeting" | "event" | "task") => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800"
      case "event":
        return "bg-red-100 text-red-800"
      case "task":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!event) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>{event.title}</DialogTitle>
                <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
              </div>
              <DialogDescription>{date && format(event.date, "EEEE, MMMM d, yyyy")}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {event.time}
                    {event.endTime && ` - ${event.endTime}`}
                  </span>
                </div>
              )}

              {event.location && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{event.location}</span>
                </div>
              )}

              {event.project && (
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
                    <path d="M2 13h10" />
                    <path d="m9 16 3-3-3-3" />
                  </svg>
                  {/* <span>{currentWorkspace.projects.find((p) => p.id === event.project)?.name || event.project}</span> */}
                </div>
              )}

              {event.description && (
                <div className="mt-4 rounded-md bg-muted/50 p-3">
                  <p className="whitespace-pre-line text-sm">{event.description}</p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <Button variant="outline" onClick={() => onEdit(event)}>
                Edit
              </Button>
            </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

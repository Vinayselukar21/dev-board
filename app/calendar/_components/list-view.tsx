"use client"

import { format, isSameDay } from "date-fns"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Link from "next/link"
import { CalendarEvent } from "@/app/types"

interface ListViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export function ListView({ currentDate, events, onEventClick }: ListViewProps) {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // Group events by date
  const eventsByDate: Record<string, CalendarEvent[]> = {}

  sortedEvents.forEach((event) => {
    const dateKey = format(event.date, "yyyy-MM-dd")
    if (!eventsByDate[dateKey]) {
      eventsByDate[dateKey] = []
    }
    eventsByDate[dateKey].push(event)
  })

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

  return (
    <div className="rounded-lg border bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/50 p-4">
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
        <Link href={`/calendar/event?date=${encodeURIComponent(currentDate.toISOString())}`}>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Events list */}
      <div className="divide-y">
        {Object.keys(eventsByDate).length > 0 ? (
          Object.keys(eventsByDate).map((dateKey) => {
            const date = new Date(dateKey)
            const isToday = isSameDay(date, new Date())

            return (
              <div key={dateKey} className="p-4">
                <div className="mb-2 flex items-center">
                  <h4 className="font-medium">{isToday ? "Today" : format(date, "EEEE, MMMM d, yyyy")}</h4>
                  {isToday && <Badge className="ml-2 bg-primary/20 text-primary">Today</Badge>}
                </div>

                <div className="space-y-3">
                  {eventsByDate[dateKey].map((event) => (
                    <div
                      key={event.id}
                      className="flex cursor-pointer items-start gap-3 rounded-md border p-3 hover:bg-muted/50"
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md border bg-muted text-center">
                        <span className="text-xs font-medium">{format(event.date, "MMM")}</span>
                        <span className="text-sm font-bold">{format(event.date, "d")}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium">{event.title}</h5>
                          <Badge className={getEventTypeColor(event.type)}>{event.type}</Badge>
                        </div>

                        <div className="mt-1 text-sm text-muted-foreground">
                          {event.time && (
                            <span className="mr-3">
                              {event.time}
                              {event.endTime && ` - ${event.endTime}`}
                            </span>
                          )}
                          {event.location && <span>{event.location}</span>}
                        </div>

                        {event.description && <p className="mt-2 text-sm line-clamp-2">{event.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <p>No events scheduled</p>
          </div>
        )}
      </div>
    </div>
  )
}

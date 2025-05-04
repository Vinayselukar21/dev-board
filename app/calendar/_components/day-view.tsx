"use client"

import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { CalendarEvent } from "@/app/types"

interface DayViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
}

export function DayView({ currentDate, events, onEventClick }: DayViewProps) {
  // Hours to display (6am to 9pm)
  const hours = Array.from({ length: 16 }, (_, i) => i + 6)

  // Get events for the current day
  const dayEvents = events.filter(
    (event) => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === currentDate.getDate() &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear();
    }
  )

  // Get hour from time string (e.g., "09:30" -> 9)
  const getHourFromTimeString = (timeString?: string) => {
    if (!timeString) return 8 // Default to 8am if no time
    const [hours] = timeString.split(":").map(Number)
    return hours
  }

  // Get minute from time string (e.g., "09:30" -> 30)
  const getMinuteFromTimeString = (timeString?: string) => {
    if (!timeString) return 0
    const parts = timeString.split(":")
    return parts.length > 1 ? Number(parts[1]) : 0
  }

  return (
    <div className="rounded-lg border bg-background">
      {/* Day header */}
      <div className="flex items-center justify-between border-b bg-muted/50 p-4">
        <div>
          <h3 className="text-lg font-semibold">{format(currentDate, "EEEE")}</h3>
          <p className="text-sm text-muted-foreground">{format(currentDate, "MMMM d, yyyy")}</p>
        </div>
        <Link href={`/calendar/event?date=${currentDate.toISOString()}`}>
          <Button size="sm">
            <Plus className="mr-1 h-4 w-4" />
            Add Event
          </Button>
        </Link>
      </div>

      {/* Time grid */}
      <div className="relative">
        {hours.map((hour) => {
          const hourEvents = dayEvents.filter((event) => {
            const eventHour = getHourFromTimeString(event.time)
            return eventHour === hour
          })

          return (
            <div key={hour} className="flex border-b">
              {/* Time column */}
              <div className="w-20 border-r p-2 text-xs text-muted-foreground">
                {hour === 12 ? "12 PM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>

              {/* Events column */}
              <div className="relative flex-1 min-h-[80px] p-1">
                {hourEvents.map((event, index) => {
                  const minuteOffset = (getMinuteFromTimeString(event.time) / 60) * 100

                  return (
                    <div
                      key={event.id}
                      className={`absolute left-2 right-2 rounded-sm px-3 py-2 text-sm ${
                        event.type === "meeting"
                          ? "bg-blue-100 text-blue-800"
                          : event.type === "event"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                      style={{
                        top: `${minuteOffset}%`,
                        zIndex: index + 1,
                      }}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="font-medium">{event.title}</div>
                      {event.time && (
                        <div className="text-xs">
                          {event.time}
                          {event.endTime && ` - ${event.endTime}`}
                        </div>
                      )}
                      {event.location && <div className="text-xs">{event.location}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

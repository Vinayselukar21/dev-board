"use client"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { CalendarEvent } from "@/app/types"
import { EventDetailsDialog } from "./event-details-dialog"

interface MonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onDateClick: (date: Date) => void 
  }

export function MonthView({ currentDate, events, onEventClick, onDateClick }: MonthViewProps) {
  // Helper functions for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  // Get days for current month view
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
  const firstDayOfMonth = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth())

  // Create calendar days array
  const days = []

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return events.filter(
      (event) => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day &&
          eventDate.getMonth() === currentDate.getMonth() &&
          eventDate.getFullYear() === currentDate.getFullYear();
      }
    )
  }

  // Handle day click
  const handleDayClick = (day: number | null) => {
    if (day) {
      const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      onDateClick(clickedDate)
    }
  }

  return (
    <div className="rounded-lg border bg-background">
      {/* Day names */}
      <div className="grid grid-cols-7 border-b bg-muted/50">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 auto-rows-fr">
        {days.map((day, index) => {
          // Get events for this day
          const dayEvents = day ? getEventsForDay(day) : []

          // Check if this is today
          const isToday =
            day &&
            new Date().getDate() === day &&
            new Date().getMonth() === currentDate.getMonth() &&
            new Date().getFullYear() === currentDate.getFullYear()

          return (
            <div
              key={index}
              className={`min-h-[120px] border-b border-r p-1 cursor-pointer ${day ? "" : "bg-muted/20"} ${
                isToday ? "bg-primary/5" : ""
              }`}
            
            >
              {day && (
                <>
                  <div className="flex justify-between p-1">
                    <Button variant="ghost" size="icon"
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                        isToday ? "bg-primary text-primary-foreground" : ""
                      }`}
                        onClick={() => handleDayClick(day)}
                    >
                      {day}
                    </Button>
                    <Link
                      href={`/calendar/event?date=${encodeURIComponent(
                        new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString(),
                      )}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-1 space-y-1 z-50">
                    {dayEvents.slice(0, 3).map((event) => (
                       <EventDetailsDialog
                       key={event.id}
                       event={event}
                       onEdit={() => {
                         onEventClick(event);
                       }}
                       trigger={
                       <div
                        key={event.id}
                        className={`rounded-sm px-1.5 py-0.5 text-xs ${
                          event.type === "meeting"
                            ? "bg-blue-100 text-blue-800"
                            : event.type === "event"
                              ? "bg-purple-100 text-purple-800"
                              : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          // onEventClick(event)
                        }}
                      >
                       <span className={event.status === "cancelled" ? "line-through" : ""}> {event.time && `${event.time} · `}
                       {event.title}</span>
                       {event.status === "cancelled" && (
                          <span className="ml-1 text-xs text-muted-foreground">(Cancelled)</span>
                        )}
                      </div>
                      }
                    />
                      
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="px-1.5 py-0.5 text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

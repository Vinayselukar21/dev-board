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
  open: boolean
  setOpen: (open: boolean) => void
}

export function MonthView({ currentDate, events, onEventClick, onDateClick, open, setOpen }: MonthViewProps) {
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
              onClick={() => handleDayClick(day)}
            >
              {day && (
                <>
                  <div className="flex justify-between p-1">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                        isToday ? "bg-primary text-primary-foreground" : ""
                      }`}
                    >
                      {day}
                    </span>
                    <Link
                      href={`/calendar/event?date=${new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day,
                      ).toISOString()}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={`rounded-sm px-1.5 py-0.5 text-xs ${
                          event.type === "meeting"
                            ? "bg-blue-100 text-blue-800"
                            : event.type === "event"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpen(true)
                        }}
                      >
                        {event.time && `${event.time} · `}
                        {event.title}
                        <EventDetailsDialog
                          key={event.id}
                          event={event}
                          open={open}
                          onOpenChange={() => setOpen(!open)}
                          onSave={() => {}}
                          onDelete={() => {}}
                          onEdit={() => {onEventClick(event)}}
                          
                        />
                      </div>
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

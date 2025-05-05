"use client";

import { format, addDays, startOfWeek } from "date-fns";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { CalendarEvent } from "@/app/types";
import { EventDetailsDialog } from "./event-details-dialog";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  onDateClick: (date: Date) => void;
}

export function WeekView({
  currentDate,
  events,
  onEventClick,
  onDateClick,
}: WeekViewProps) {
  // Get the start of the week (Sunday)
  const weekStart = startOfWeek(currentDate);

  // Create array of days for the week
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Hours to display (6am to 9pm)
  const hours = Array.from({ length: 16 }, (_, i) => i + 6);

  // Get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Get hour from time string (e.g., "09:30" -> 9)
  const getHourFromTimeString = (timeString?: string) => {
    if (!timeString) return 8; // Default to 8am if no time
    const [hours] = timeString.split(":").map(Number);
    return hours;
  };

  return (
    <div className="rounded-lg border bg-background">
      {/* Day headers */}
      <div className="grid grid-cols-8 border-b bg-muted/50">
        <div className="p-3 text-center text-sm font-medium border-r">Time</div>
        {weekDays.map((day, index) => {
          // Check if this is today
          const isToday =
            new Date().getDate() === day.getDate() &&
            new Date().getMonth() === day.getMonth() &&
            new Date().getFullYear() === day.getFullYear();

          return (
            <div
              key={index}
              className={`p-3 text-center ${isToday ? "bg-primary/5" : ""}`}
              onClick={() => onDateClick(day)}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs text-muted-foreground">
                  {format(day, "EEE")}
                </span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm mt-1 ${
                    isToday ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
              </div>
              <Link
                href={`/calendar/event?date=${encodeURIComponent(
                  day.toISOString()
                )}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Button variant="ghost" size="sm" className="mt-1 h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="relative">
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b">
            {/* Time column */}
            <div className="border-r p-2 text-xs text-muted-foreground">
              {hour === 12
                ? "12 PM"
                : hour > 12
                ? `${hour - 12} PM`
                : `${hour} AM`}
            </div>

            {/* Day columns */}
            {weekDays.map((day, dayIndex) => {
              const dayEvents = getEventsForDay(day).filter((event) => {
                const eventHour = getHourFromTimeString(event.time);
                return eventHour === hour;
              });

              return (
                <div
                  key={dayIndex}
                  className="relative min-h-[60px] p-1 border-r"
                  onClick={() => onDateClick(day)}
                >
                  {dayEvents.map((event) => (
                    <EventDetailsDialog
                      key={event.id}
                      event={event}
                      onEdit={() => {
                        onEventClick(event);
                      }}
                      trigger={
                        <div
                          key={event.id}
                          className={`absolute left-1 right-1 rounded-sm px-2 py-1 text-xs cursor-pointer ${
                            event.type === "meeting"
                              ? "bg-blue-100 text-blue-800"
                              : event.type === "event"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                          style={{ top: "4px" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // onEventClick(event)
                          }}
                        >
                          <div className="font-medium">{event.title}</div>
                          {event.time && (
                            <div>
                              {event.time}
                              {event.endTime && ` - ${event.endTime}`}
                            </div>
                          )}
                        </div>
                      }
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

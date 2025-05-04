"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, ArrowRight, ChevronDown, Plus, Search } from "lucide-react";
import { useState } from "react";
import { AddEventDialog } from "./_components/add-event-dialog";

// Calendar event type
interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  time?: string;
  project?: string;
  type: "meeting" | "deadline" | "reminder";
}

export default function Page() {
  // Current date state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample events data
  const events: CalendarEvent[] = [
    {
      id: "1",
      title: "Team Standup",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      time: "9:00 AM",
      project: "Website Redesign",
      type: "meeting",
    },
    {
      id: "2",
      title: "Client Meeting",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      time: "2:00 PM",
      project: "Social Media Campaign",
      type: "meeting",
    },
    {
      id: "3",
      title: "Wireframes Due",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      project: "Website Redesign",
      type: "deadline",
    },
    {
      id: "4",
      title: "Content Review",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
      time: "11:00 AM",
      project: "Content Calendar",
      type: "meeting",
    },
    {
      id: "5",
      title: "Project Deadline",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      project: "Email Newsletter",
      type: "deadline",
    },
    {
      id: "6",
      title: "Quarterly Planning",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      time: "10:00 AM",
      type: "meeting",
    },
  ];

  // Helper functions for calendar
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Get days for current month view
  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  const firstDayOfMonth = getFirstDayOfMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  // Create calendar days array
  const days = [];

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // Navigation functions
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  // Format month and year
  const monthYearString = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <h1 className="text-lg font-semibold">Calendar</h1>
          <div className="ml-auto flex items-center gap-2">
            <form className="hidden sm:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search events..."
                  className="w-60 rounded-lg border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </form>
            <AddEventDialog
              trigger={
                <Button size="sm" className="h-8 gap-1" variant="default">
                  <Plus className="h-4 w-4" />
                  Add Event
                </Button>
              }
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="flex flex-col gap-6">
            {/* Calendar Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{monthYearString}</h2>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={goToToday}>
                  Today
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      View <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div className="grid gap-1">
                      <Button
                        variant="ghost"
                        className="justify-start"
                        size="sm"
                      >
                        Month
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        size="sm"
                      >
                        Week
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        size="sm"
                      >
                        Day
                      </Button>
                      <Button
                        variant="ghost"
                        className="justify-start"
                        size="sm"
                      >
                        List
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="rounded-lg border bg-background">
              {/* Day names */}
              <div className="grid grid-cols-7 border-b bg-muted/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-3 text-center text-sm font-medium"
                    >
                      {day}
                    </div>
                  )
                )}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 auto-rows-fr">
                {days.map((day, index) => {
                  // Get events for this day
                  const dayEvents = day ? getEventsForDay(day) : [];

                  // Check if this is today
                  const isToday =
                    day &&
                    new Date().getDate() === day &&
                    new Date().getMonth() === currentDate.getMonth() &&
                    new Date().getFullYear() === currentDate.getFullYear();

                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] border-b border-r p-1 ${
                        day ? "" : "bg-muted/20"
                      } ${isToday ? "bg-primary/5" : ""}`}
                    >
                      {day && (
                        <>
                          <div className="flex justify-between p-1">
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                                isToday
                                  ? "bg-primary text-primary-foreground"
                                  : ""
                              }`}
                            >
                              {day}
                            </span>
                            {dayEvents.length > 0 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                          <div className="mt-1 space-y-1">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                className={`rounded-sm px-1.5 py-0.5 text-xs ${
                                  event.type === "meeting"
                                    ? "bg-blue-100 text-blue-800"
                                    : event.type === "deadline"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {event.time && `${event.time} · `}
                                {event.title}
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="px-1.5 py-0.5 text-xs text-muted-foreground">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Events */}
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-medium">Upcoming Events</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {events
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .slice(0, 5)
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md border bg-muted text-center">
                        <span className="text-xs font-medium">
                          {event.date.toLocaleString("default", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-sm font-bold">
                          {event.date.getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{event.title}</h4>
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              event.type === "meeting"
                                ? "bg-blue-100 text-blue-800"
                                : event.type === "deadline"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {event.type}
                          </span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {event.time && `${event.time} · `}
                          {event.project && `${event.project}`}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

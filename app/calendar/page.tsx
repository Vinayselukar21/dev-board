"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  FolderKanban,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react"
import { WeekView } from "./_components/week-view"
import { MonthView } from "./_components/month-view"
import { DayView } from "./_components/day-view"
import { ListView } from "./_components/list-view"
import { CalendarEvent } from "../types"
import useGetCalendarEvents from "@/hooks/useGetCalendarEvents"
import LoadingCalendar from "./_components/loading-calendar"

// Calendar view type
type CalendarViewType = "month" | "week" | "day" | "list"

export default function CalendarPage() {
  const router = useRouter()

  // Current date state
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [viewType, setViewType] = useState<CalendarViewType>("month")

const { eventsData, eventsLoading, errorLoadingEvents } = useGetCalendarEvents();
console.log(eventsData, eventsLoading, errorLoadingEvents, "eventsData")


  // Navigation functions
  const prevPeriod = () => {
    const newDate = new Date(currentDate)

    switch (viewType) {
      case "month":
        newDate.setMonth(newDate.getMonth() - 1)
        break
      case "week":
        newDate.setDate(newDate.getDate() - 7)
        break
      case "day":
        newDate.setDate(newDate.getDate() - 1)
        break
      default:
        newDate.setMonth(newDate.getMonth() - 1)
    }

    setCurrentDate(newDate)
    setSelectedDate(null)
  }

  const nextPeriod = () => {
    const newDate = new Date(currentDate)

    switch (viewType) {
      case "month":
        newDate.setMonth(newDate.getMonth() + 1)
        break
      case "week":
        newDate.setDate(newDate.getDate() + 7)
        break
      case "day":
        newDate.setDate(newDate.getDate() + 1)
        break
      default:
        newDate.setMonth(newDate.getMonth() + 1)
    }

    setCurrentDate(newDate)
    setSelectedDate(null)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(null)
  }

  // Handle event click
  const handleEventClick = (event: CalendarEvent) => {
    // Navigate to edit page instead of showing dialog
    router.push(`/calendar/event?id=${event.id}`)
  }

  // Handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    if (viewType === "month") {
      setCurrentDate(date)
      setViewType("day")
    }
  }

  // Format period string based on view type
  const getPeriodString = () => {
    switch (viewType) {
      case "month":
        return currentDate.toLocaleString("default", { month: "long", year: "numeric" })
      case "week":
        const weekStart = new Date(currentDate)
        weekStart.setDate(currentDate.getDate() - currentDate.getDay())
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)

        if (weekStart.getMonth() === weekEnd.getMonth()) {
          return `${weekStart.toLocaleString("default", { month: "long" })} ${weekStart.getDate()} - ${weekEnd.getDate()}, ${weekStart.getFullYear()}`
        } else if (weekStart.getFullYear() === weekEnd.getFullYear()) {
          return `${weekStart.toLocaleString("default", { month: "short" })} ${weekStart.getDate()} - ${weekEnd.toLocaleString("default", { month: "short" })} ${weekEnd.getDate()}, ${weekStart.getFullYear()}`
        } else {
          return `${weekStart.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" })} - ${weekEnd.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" })}`
        }
      case "day":
        return currentDate.toLocaleString("default", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      default:
        return currentDate.toLocaleString("default", { month: "long", year: "numeric" })
    }
  }

  if(eventsLoading){
    return <LoadingCalendar/>
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex flex-col sm:flex-row">
        {/* Main Content */}
        <main className="flex flex-1 flex-col">
          {/* Content */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="flex flex-col gap-6">
              {/* Calendar Controls */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{getPeriodString()}</h2>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" onClick={prevPeriod}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={nextPeriod}>
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
                        {viewType === "month"
                          ? "Month"
                          : viewType === "week"
                            ? "Week"
                            : viewType === "day"
                              ? "Day"
                              : "List"}
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <div className="grid gap-1">
                        <Button
                          variant={viewType === "month" ? "default" : "ghost"}
                          className="justify-start"
                          size="sm"
                          onClick={() => setViewType("month")}
                        >
                          Month
                        </Button>
                        <Button
                          variant={viewType === "week" ? "default" : "ghost"}
                          className="justify-start"
                          size="sm"
                          onClick={() => setViewType("week")}
                        >
                          Week
                        </Button>
                        <Button
                          variant={viewType === "day" ? "default" : "ghost"}
                          className="justify-start"
                          size="sm"
                          onClick={() => setViewType("day")}
                        >
                          Day
                        </Button>
                        <Button
                          variant={viewType === "list" ? "default" : "ghost"}
                          className="justify-start"
                          size="sm"
                          onClick={() => setViewType("list")}
                        >
                          List
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Calendar View */}
              {viewType === "month" && (
                <MonthView
                  currentDate={currentDate}
                  events={eventsData}
                  onEventClick={handleEventClick}
                  onDateClick={handleDateClick}
                />
              )}

              {viewType === "week" && (
                <WeekView
                  currentDate={currentDate}
                  events={eventsData}
                  onEventClick={handleEventClick}
                  onDateClick={handleDateClick}
                />
              )}

              {viewType === "day" && (
                <DayView currentDate={selectedDate || currentDate} events={eventsData} onEventClick={handleEventClick} />
              )}

              {viewType === "list" && (
                <ListView currentDate={currentDate} events={eventsData} onEventClick={handleEventClick} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

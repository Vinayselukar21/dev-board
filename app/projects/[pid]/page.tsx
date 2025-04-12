"use client";

import type React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CalendarDays,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AddTaskDialog } from "./_components/add-task-dialog";
import useGetProjectTasks from "@/hooks/useGetProjectTasks";
import { Priority } from "@/app/types";

// Define types for our Kanban board

type Status = "todo" | "in-progress" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  dueDate?: string;
}

interface Column {
  id: Status;
  title: string;
  tasks: Task[];
}

export default function ProjectPage() {
  const params = useParams();
  // Sample data for the Kanban board
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "todo",
      title: "To Do",
      tasks: [
        {
          id: "task-1",
          title: "Research competitors",
          description: "Analyze top 5 competitors' websites and features",
          priority: "medium",
          assignee: {
            name: "Alex Kim",
            initials: "AK",
          },
          dueDate: "2023-06-15",
        },
        {
          id: "task-2",
          title: "Create wireframes",
          description:
            "Design initial wireframes for homepage and product pages",
          priority: "high",
          assignee: {
            name: "Sarah Johnson",
            initials: "SJ",
          },
          dueDate: "2023-06-18",
        },
        {
          id: "task-3",
          title: "SEO audit",
          description: "Perform SEO analysis of current website",
          priority: "low",
          dueDate: "2023-06-20",
        },
      ],
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        {
          id: "task-4",
          title: "User interviews",
          description: "Conduct interviews with 5 key users",
          priority: "high",
          assignee: {
            name: "Michael Chen",
            initials: "MC",
          },
          dueDate: "2023-06-14",
        },
        {
          id: "task-5",
          title: "Content inventory",
          description: "Catalog all existing website content",
          priority: "medium",
          assignee: {
            name: "Alex Kim",
            initials: "AK",
          },
          dueDate: "2023-06-16",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [
        {
          id: "task-6",
          title: "Project kickoff",
          description: "Initial meeting with stakeholders",
          priority: "high",
          assignee: {
            name: "Sarah Johnson",
            initials: "SJ",
          },
          dueDate: "2023-06-10",
        },
        {
          id: "task-7",
          title: "Requirements gathering",
          description: "Document all project requirements",
          priority: "medium",
          assignee: {
            name: "Michael Chen",
            initials: "MC",
          },
          dueDate: "2023-06-12",
        },
        {
          id: "task-8",
          title: "Budget approval",
          description: "Get final budget sign-off from finance",
          priority: "high",
          assignee: {
            name: "Alex Kim",
            initials: "AK",
          },
          dueDate: "2023-06-08",
        },
      ],
    },
  ]);

  const { taskData, tasksLoading, errorLoadingTasks } = useGetProjectTasks(params.pid as string);
console.log(taskData)
  // Get project name from URL parameter
  // const projectName = params.id
  //   .split("-")
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(" ")

  // Function to handle drag start
  const handleDragStart = (
    e: React.DragEvent,
    taskId: string,
    sourceColumnId: Status
  ) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
  };

  // Function to handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Function to handle drop
  const handleDrop = (e: React.DragEvent, targetColumnId: Status) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId") as Status;

    if (sourceColumnId === targetColumnId) return;

    // Create a new state
    const newColumns = [...columns];

    // Find the source column
    const sourceColumnIndex = newColumns.findIndex(
      (col) => col.id === sourceColumnId
    );

    // Find the task in the source column
    const taskIndex = newColumns[sourceColumnIndex].tasks.findIndex(
      (task) => task.id === taskId
    );
    const task = newColumns[sourceColumnIndex].tasks[taskIndex];

    // Remove the task from the source column
    newColumns[sourceColumnIndex].tasks.splice(taskIndex, 1);

    // Find the target column
    const targetColumnIndex = newColumns.findIndex(
      (col) => col.id === targetColumnId
    );

    // Add the task to the target column
    newColumns[targetColumnIndex].tasks.push(task);

    // Update the state
    setColumns(newColumns);
  };

  // Function to get priority badge color
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Main Content */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          {/* <h1 className="text-lg font-semibold">{projectName}</h1> */}
          <div className="ml-auto flex items-center gap-2">
            <form className="hidden sm:flex">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tasks..."
                  className="w-60 rounded-lg bg-background pl-8"
                />
              </div>
            </form>
            <AddTaskDialog projectId={params.pid as string} />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="flex flex-col gap-6">
            {/* Project Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                {/* <h2 className="text-2xl font-bold">{projectName}</h2> */}
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Project Settings
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="text-sm text-muted-foreground">
                  Created on June 5, 2023
                </div>
              </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {taskData.map((column) => (
                <div
                  key={column.id}
                  className="flex flex-col rounded-lg border bg-muted/30"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column.id as Status)}
                >
                  <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-3">
                    <h3 className="font-medium">{column.name}</h3>
                    <Badge variant="outline">{column.tasks?.length}</Badge>
                  </div>
                  <div className="flex flex-col gap-2 p-2">
                    {column.tasks?.map((task) => (
                      <Card
                        key={task.id}
                        className="cursor-grab bg-background p-0"
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id, column.id as Status)}
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-sm">
                            </CardTitle>
                              {task.title}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <CardDescription className="text-xs">
                            {task.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-3 pt-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="outline"
                                className={getPriorityColor(task.priority as Priority)}
                              >
                                {task.priority}
                              </Badge>
                              {task.dueDate && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <CalendarDays className="h-3 w-3" />
                                  {new Date(task.dueDate).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </div>
                              )}
                            </div>
                            {/* {task.assignee && (
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-[10px]">
                                  {task.assignee.initials}
                                </AvatarFallback>
                              </Avatar>
                            )} */}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

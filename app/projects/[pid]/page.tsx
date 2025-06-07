"use client";

import type React from "react";

import { TaskStage } from "@/app/types";
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
import ChangeTaskStage from "@/hooks/Functions/ChangeTaskStage";
import DeleteTask from "@/hooks/Functions/DeleteTask";
import useGetProjectTasks from "@/hooks/useGetProjectTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowLeft,
  CalendarDays,
  MoreHorizontal,
  Plus,
  Search
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddTaskDialog } from "./_components/add-task-dialog";
import LoadingTasks from "./_components/loading-tasks";

// Define types for our Kanban board

type Status = "todo" | "in-progress" | "done";

export default function ProjectPage() {
  const queryClient = useQueryClient();
  const params = useParams();
  // Sample data for the Kanban board
  const [columns, setColumns] = useState<TaskStage[]>([]);

  const { projectTaskData, tasksLoading } =
    useGetProjectTasks(params.pid as string);

  const taskStages = projectTaskData && projectTaskData?.taskStages?.map((stage) => ({
    id: stage.id,
    title: stage.name,
  })) || [];

  const projectMembers = projectTaskData && projectTaskData?.members?.map((member) => ({
    id: member.id,
    name: member.member.user.name as string,
  })) || [];

  useEffect(() => {
    const taskColumns = projectTaskData?.taskStages ? projectTaskData?.taskStages : [];
    if (taskColumns) {
      setColumns(taskColumns);
    }
  }, [projectTaskData?.taskStages]);

  const ChangeTaskStageMutation = useMutation({
    mutationFn: ChangeTaskStage,
    onSuccess: (response) => {
      // Invalidate and refetch
      toast.success(response.message);

      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["projectTasks"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const DeleteTaskMutation = useMutation({
    mutationFn: DeleteTask,
    onSuccess: (response) => {
      // Invalidate and refetch
      toast.success(response.message);

      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["projectTasks"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
    const newColumns: Array<TaskStage> = columns ? [...columns] : [];

    // Find the source column
    const sourceColumnIndex = newColumns.findIndex(
      (col) => col.id === sourceColumnId
    );
    if (newColumns !== undefined && sourceColumnIndex !== -1 && newColumns[sourceColumnIndex]?.tasks !== undefined) {
      // Find the task in the source column
      const taskIndex = newColumns[sourceColumnIndex]?.tasks.findIndex(
        (task) => task.id === taskId
      );
      const task = newColumns[sourceColumnIndex]?.tasks[taskIndex];

      // Remove the task from the source column
      newColumns[sourceColumnIndex]?.tasks.splice(taskIndex, 1);

      // Find the target column
      const targetColumnIndex = newColumns.findIndex(
        (col) => col.id === targetColumnId
      );

      if (newColumns[targetColumnIndex].tasks !== undefined) {
        // Add the task to the target column
        newColumns[targetColumnIndex].tasks.push(task);
        // Update the state
        setColumns(newColumns);
        // Update the task stage
        ChangeTaskStageMutation.mutate({
          taskId,
          stageId: targetColumnId,
        });
      }
    }
  };
  // Function to get priority badge color
  const getPriorityColor = (priority: "low" | "medium" | "high") => {
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
  if (tasksLoading) {
    return <LoadingTasks />
  }
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
            <AddTaskDialog
              type="add"
              projectId={params.pid as string}
              taskStages={taskStages}
              defaultStatus={taskStages?.[0]?.id as string}
              trigger={<Button size="sm" className="h-8 gap-1">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>}
              // project members
              projectMembers={projectMembers}
            />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="flex flex-col gap-6">
            {/* Project Info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{projectTaskData?.name}</h2>
              </div>
              <div className="flex items-center gap-4">
                {/* <div className="flex -space-x-2">
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-background">
                    <AvatarFallback>MC</AvatarFallback>
                  </Avatar>
                </div> */}
                <Separator orientation="vertical" className="h-6" />
                <div className="text-sm text-muted-foreground">
                  Created on {projectTaskData?.createdAt && format(new Date(projectTaskData?.createdAt), "dd MMM yyyy")}
                </div>
              </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {columns?.map((column) => (
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
                        onDragStart={(e) =>
                          handleDragStart(e, task.id, column.id as Status)
                        }
                      >
                        <CardHeader className="p-3 pb-0">
                          <div className="flex items-start justify-between">
                            <AddTaskDialog
                              type="edit"
                              projectId={params.pid as string}
                              taskStages={taskStages}
                              defaultStatus={task.status}
                              trigger={
                                <CardTitle className="text-sm cursor-pointer hover:underline">
                                  {task.title}
                                </CardTitle>
                              }
                              taskData={task}
                              // project members
                              projectMembers={projectMembers}
                            />
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
                                <DropdownMenuItem onClick={() => DeleteTaskMutation.mutate(task.id)}>Delete</DropdownMenuItem>
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
                                className={getPriorityColor(
                                  task.priority as "low" | "medium" | "high"
                                )}
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

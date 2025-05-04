"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AddNewTask from "@/hooks/Functions/AddNewTask";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";

interface AddTaskDialogProps {
  trigger?: React.ReactNode;
  projectId?: string;
  taskStages?: { id: string; title: string }[];
  defaultStatus: string;
  projectMembers?: { id: string; name: string }[];
}

export function AddTaskDialog({
  trigger,
  projectId,
  taskStages = [],
  defaultStatus,
  projectMembers,
}: AddTaskDialogProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date());
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [stage, setStage] = useState<string>(defaultStatus);

  const AddNewTaskMutation = useMutation({
    mutationFn: AddNewTask,
    onSuccess: () => {
      // Invalidate and refetch
  toast.success("Task has been created");
      // Handle task creation logic here
      setOpen(false);
      // Reset form
      setDueDate(undefined);
      setAssignee("");
      setPriority("medium");
      setStage(defaultStatus);
      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["projectTasks"] });
    },
    onError: (error) => {
      toast.error("Failed to create project");
      console.error("Error creating project:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const title = formData.get("task-title") as string;
    const description = formData.get("task-description") as string;

    const payload = {
      title,
      description,
      dueDate: dueDate?.toISOString() || "",
      assignee,
      priority,
      status: "",
      projectId: projectId as string,
      stageId: stage,
      createdById: session?.id,
    };

    AddNewTaskMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                name="task-title"
                placeholder="Enter task title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                name="task-description"
                placeholder="Describe the task and its requirements"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select
                  value={priority}
                  onValueChange={(value) =>
                    setPriority(value as "low" | "medium" | "high")
                  }
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="task-status">Status</Label>
                <Select
                  value={stage}
                  onValueChange={(value) => setStage(value)}
                >
                  <SelectTrigger id="task-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {taskStages && taskStages?.map((stage) => (
                      <SelectItem key={stage?.id} value={stage?.id}>
                        {stage.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="task-assignee">Assignee</Label>
                <Select value={assignee} onValueChange={setAssignee}>
                  <SelectTrigger id="task-assignee">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                    {projectMembers && projectMembers?.map((member) => (
                      <SelectItem key={member?.id} value={member?.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{member.name}</AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            {projectId && (
              <div className="grid gap-2">
                <Label htmlFor="task-project">Project</Label>
                <Input id="task-project" value={projectId} disabled />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

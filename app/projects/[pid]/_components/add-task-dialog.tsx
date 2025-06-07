"use client";

import type React from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { Task } from "@/app/types";
import DatePicker from "@/components/date-picker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import AddNewTask from "@/hooks/Functions/AddNewTask";
import EditTask from "@/hooks/Functions/EditTask";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from   "@radix-ui/react-popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface AddTaskDialogProps {
  trigger: React.ReactNode;
  type: "add" | "edit";
  taskData?: Task;
  projectId?: string;
  taskStages?: { id: string; title: string }[];
  defaultStatus: string;
  projectMembers?: { id: string; name: string }[];
}

export function AddTaskDialog({
  trigger,
  type,
  taskData,
  projectId,
  taskStages = [],
  defaultStatus,
  projectMembers,
}: AddTaskDialogProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [dueDate, setDueDate] = useState<Date | undefined>(taskData?.dueDate ? new Date(taskData?.dueDate) : new Date());
  const [priority, setPriority] = useState<"low" | "medium" | "high">(taskData?.priority || "medium");
  const [stage, setStage] = useState<string>(taskData?.stageId || defaultStatus);
  const [title, setTitle] = useState(taskData?.title || "");
  const [description, setDescription] = useState(taskData?.description || "");

  const [assignees, setAssignees] = useState(taskData?.assignees?.map((assignee) => assignee.id) || []);

  useEffect(() => {
    if (taskData?.assignees) {
      setAssignees(taskData.assignees.map((assignee) => assignee.id));
    }
  }, [taskData?.assignees]);

  const AddNewTaskMutation = useMutation({
    mutationFn: AddNewTask,
    onSuccess: (response) => {
      // Invalidate and refetch
      toast.success(response.message);
      // Handle task creation logic here
      setOpen(false);
      // Reset form
      setDueDate(undefined);
      setAssignees([]);
      setPriority("medium");
      setStage(defaultStatus);
      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["projectTasks"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const EditTaskMutation = useMutation({
    mutationFn: EditTask,
    onSuccess: (response) => {
      // Invalidate and refetch
      toast.success(response.message);
      // Handle task creation logic here
      setOpen(false);
      // Reset form
      setDueDate(undefined);
      setAssignees([]);
      setPriority("medium");
      setStage(defaultStatus);
      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["projectTasks"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dueDate: dueDate?.toISOString() || "",
      assignees,
      priority,
      status: "",
      projectId: projectId as string,
      stageId: stage,
      createdById: session?.id,
    };

    console.log(payload, "payload");
    AddNewTaskMutation.mutate(payload);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      dueDate: dueDate?.toISOString() || "",
      assignees,
      priority,
      status: "",
      projectId: projectId as string,
      stageId: stage,
      taskId: taskData && taskData.id!,
    };

    EditTaskMutation.mutate(payload);
  };

  // Toggle participant selection
  const toggleParticipant = (memberId: string) => {
    const currentParticipants = [...assignees];

    if (currentParticipants.includes(memberId)) {
      // Remove participant
      setAssignees(
        currentParticipants.filter((id) => id !== memberId)
      );
    } else {
      // Add participant
      setAssignees([...currentParticipants, memberId]);
    }
  };

  console.log(taskData, "taskData")
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={type === "add" ? handleSubmit : handleEdit}>
          <DialogHeader>
            <DialogTitle>{type === "add" ? "Add New Task" : "Edit Task"}</DialogTitle>
            <DialogDescription>
              {type === "add" ? "Create a new task for your project." : "Edit the task details."}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                name="task-description"
                placeholder="Describe the task and its requirements"
                className="min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              {projectId && (
                <div className="grid gap-2">
                  <Label htmlFor="task-project">Project</Label>
                  <Input id="task-project" value={projectId} disabled />
                </div>
              )}
              <div className="grid gap-2">
                <DatePicker
                  Date={dueDate}
                  setDate={setDueDate}
                  label="Due Date"
                />
              </div>
            </div>
            <div className="grid gap-2">
            <Label htmlFor="task-assignees">Assignees</Label>
            <div className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      // !field.value?.length && "text-muted-foreground"
                    )}
                  >
                    {assignees?.length > 0
                      ? `${assignees.length} assignee${assignees.length > 1 ? "s" : ""
                      } selected`
                      : "Select assignees"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search participants..." />
                  <CommandEmpty>No participants found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {projectMembers?.map((member) => (
                      <CommandItem
                        key={member.id}
                        value={member.name}
                        onSelect={() => {
                          toggleParticipant(member.id);
                        }}
                      >
                        <div className="flex items-center gap-2 w-full">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {member?.name
                                ?.charAt(0)
                                .toUpperCase() ?? "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              assignees.includes(member.id)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Selected participants display */}
            {assignees && assignees?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {assignees?.map((assignee) => {
                  const member = projectMembers?.find((member) => member.id === assignee);
                  return (
                    <Badge
                      key={assignee}
                      className="flex items-center gap-1 px-2 py-1 text-sm"
                      variant="secondary"
                    >
                      <Avatar className="h-4 w-4 mr-1">
                        <AvatarFallback className="text-xs">
                          {member?.name
                            ?.charAt(0)
                            .toUpperCase() ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                      <span className="max-w-[150px] truncate">
                        {member?.name ?? "Unknown"}
                      </span>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-4 w-4 p-0 ml-1 hover:bg-destructive/10"
                      onClick={() => toggleParticipant(assignee)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  );
                })}
              </div>
            )}
            </div>
          </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">{type === "add" ? "Create Task" : "Update Task"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

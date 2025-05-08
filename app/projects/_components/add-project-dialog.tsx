"use client";

import type React from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
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
import AddNewProject from "@/hooks/Functions/AddNewProject";
import useGetWorkspaceMembers from "@/hooks/useGetWorkspaceMembers";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddProjectDialogProps {
  trigger?: React.ReactNode;
}

export function AddProjectDialog({ trigger }: AddProjectDialogProps) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date()); // task
  const [category, setCategory] = useState<string>("");

  // Get workspace members
  const { memberData, membersLoading, errorLoadingMembers } =
    useGetWorkspaceMembers();

  // Add new project

  // If memberData is undefined or not properly structured, fallback to empty array
  const members = Array.isArray(memberData) ? memberData : [];

  const toggleMember = (memberId: string) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  // Close popover when date is selected
  // useEffect(() => {
  //   if (dueDate && popoverOpen) {
  //     setPopoverOpen(false);
  //   }
  // }, [dueDate]);

  const AddNewProjectMutation = useMutation({
    mutationFn: AddNewProject,
    onSuccess: () => {
      // Invalidate and refetch
      toast.success("Project has been created");
      // Reset and close
      setSelectedMembers([]);
      setDueDate(undefined);
      setCategory("");
      setOpen(false);
      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error("Failed to create project");
      console.error("Error creating project:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const projectName = formData.get("project-name") as string;
    const projectDescription = formData.get("project-description") as string;

    const payload = {
      name: projectName,
      description: projectDescription,
      status: "active",
      deadline: dueDate?.toISOString(),
      createdById: session.id,
      members: selectedMembers,
    };

    AddNewProjectMutation.mutate(payload);
  };

  const handleCancel = () => {
    setSelectedMembers([]);
    setDueDate(undefined);
    setCategory("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="h-8 gap-1">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                name="project-name"
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                name="project-description"
                placeholder="Describe the project and its goals"
                className="min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="project-category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="project-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="research">Research</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
            <div className="grid gap-2">
              <Label>Team Members</Label>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.length > 0 ? (
                  selectedMembers.map((memberId) => {
                    const member = members.find((m) => m.id === memberId);
                    if (!member) return null;

                    // Check if member has expected structure
                    const name = member.user?.name || "Unknown";

                    return (
                      <Badge
                        key={member.id}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {name}
                        <button
                          type="button"
                          onClick={() => toggleMember(member.id)}
                          className="ml-1 rounded-full p-0.5 hover:bg-muted"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {name}</span>
                        </button>
                      </Badge>
                    );
                  })
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No team members selected
                  </div>
                )}
              </div>
              <div className="mt-2 max-h-[150px] overflow-y-auto rounded-md border p-2">
                {membersLoading ? (
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    Loading members...
                  </div>
                ) : members.length > 0 ? (
                  members.map((member) => {
                    // Check if member has expected structure
                    const name = member.user?.name || "Unknown";
                    const role = member.role || "Team Member";

                    return (
                      <div
                        key={member.id}
                        className="flex items-center space-x-2 py-2"
                      >
                        <Checkbox
                          id={`member-${member.id}`}
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => toggleMember(member.id)}
                        />
                        <Label
                          htmlFor={`member-${member.id}`}
                          className="flex flex-1 cursor-pointer items-center gap-2 text-sm font-normal"
                        >
                          <div className="flex flex-1 justify-between">
                            <span>{name}</span>
                            <span className="text-xs text-muted-foreground">
                              {role}
                            </span>
                          </div>
                        </Label>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-2 text-center text-sm text-muted-foreground">
                    {errorLoadingMembers
                      ? "Error loading members"
                      : "No members available"}
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Create Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

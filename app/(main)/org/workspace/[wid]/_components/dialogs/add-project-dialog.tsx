"use client";

import type React from "react";

import { useAuth } from "@/app/providers/AuthProvider";
import { Workspace } from "@/app/types";
import DatePicker from "@/components/date-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddProjectDialogProps {
  trigger?: React.ReactNode;
  workspaceData: Workspace;
}

export function AddProjectDialog({ trigger, workspaceData }: AddProjectDialogProps) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [dueDate, setDueDate] = useState<Date | undefined>(new Date()); // task
  const [category, setCategory] = useState<string>("");

  // Add new project

  // If memberData is undefined or not properly structured, fallback to empty array
  const members = Array.isArray(workspaceData?.members) ? workspaceData?.members : [];

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
    onSuccess: (response) => {
      // Invalidate and refetch
      toast.success(response.message);
      // Reset and close
      setSelectedMembers([]);
      setDueDate(undefined);
      setCategory("");
      setOpen(false);
      // Invalidate projects
      queryClient.invalidateQueries({ queryKey: ["workspace-by-id", workspaceData.id] });
    },
    onError: (error: {response: {data: {message: string}}}) => {
      toast.error(error?.response?.data?.message );
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
        {trigger}
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
                <DatePicker
                  Date={dueDate}
                  setDate={setDueDate}
                  label="Due Date"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Team Members</Label>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.length > 0 ? (
                  selectedMembers.map((memberId) => {
                    const member = members?.find((m) => m.id === memberId);
                    if (!member) return null;

                    // Check if member has expected structure
                    const name = member?.user?.name || "Unknown";

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
                {members.length > 0 ? (
                  members.map((member) => {
                    // Check if member has expected structure
                    const name = member.user?.name || "Unknown";
                    const role = member.role.name || "Team Member";

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
                    No members available
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
